import { SetStoreFunction } from "solid-js/store";
import makeContext from "./make-context-2";

const getState = (props: any) => ({
  color: (props.color ?? "#66e6ac"       ) as string,
  title: (props.title ?? "Fallback Title") as string,
  items: (props.item  ?? []              ) as string[],
})
export type ThemeContextState = ReturnType<typeof getState>;

const getActions = (
  state: ThemeContextState,
  setState: SetStoreFunction<ThemeContextState>,
) => ({
  changeColor: (color: string) => {
    setState("color", color)
  },

  changeTitle: (title: string) => {
    setState("title", title)
  },
});
export type ThemeContextActions = ReturnType<typeof getActions>;


export const [ThemeProvider, useTheme] = makeContext<
  ThemeContextState,
  ThemeContextActions
>(
  getState,
  getActions,
)
