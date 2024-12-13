import yaml from 'yaml';
import { Pod } from "kubernetes-models/v1";

const pod = new Pod({
  metadata: {
    name: "nuxt3-pod"
  },
  spec: {
    containers: [{
        name: "nuxt3-cont",
        image: "artas/nuxt3:v0.2"
    }]
  }
});

function dumpConfig(items: any[]) {
  items = items.map(res => res.toJSON());

  const format = process.argv[2];
  if (format === 'yaml') return yaml.stringify(items);
  if (format === 'json') return JSON.stringify(items, null, 2);
  return '';
}

console.log(dumpConfig([
  pod
]));
