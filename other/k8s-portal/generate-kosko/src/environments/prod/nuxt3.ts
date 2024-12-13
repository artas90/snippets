import type { Nuxt3App } from "../../types";

let app: Nuxt3App = {
  Namespace: 'prod',
  Host: 'prodhost',
  Name: 'nuxt3',
  Image: 'artas/nuxt3:v0.2',
  Replicas: 2,
};

export default app;
