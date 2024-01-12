import type { MarkdownInstance } from "astro";

type SectionMarkdownFiles<T extends string> = Record<T, MarkdownInstance<any>[]>;

const sortInSection = (
  md1: MarkdownInstance<any>,
  md2: MarkdownInstance<any>
) => (md1.frontmatter.order ?? 0) - (md2.frontmatter.order ?? 0);

const docsToSections = <T extends string>(
  sections: readonly T[],
  docs: MarkdownInstance<any>[]
) =>
  docs.reduce((acc, object) => {
    const section = (object.frontmatter.section ?? "") as T;

    if (sections.includes(section) || !section) {
      (acc[section] ??= []).push(object);
    } else {
      const sectionsList = sections.join(", ");
      console.error(`Unkmown section '${section}' from [${sectionsList}]`);
    }

    return acc;
  }, {} as SectionMarkdownFiles<T>);

const filterSections = <T extends string>(
  sections: readonly T[],
  groupedDocs: SectionMarkdownFiles<T>
) =>
  sections
    .map((title: T) => ({
      title,
      items: (groupedDocs[title] ?? []).toSorted(sortInSection),
    }))
    .filter((section) => !!section.items.length);

export const sortBySections = <T extends string>(
  sections: readonly T[],
  docs: MarkdownInstance<any>[]
) => filterSections(sections, docsToSections(sections, docs));
