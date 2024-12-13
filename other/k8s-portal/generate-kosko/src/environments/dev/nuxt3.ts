import type { Nuxt3App } from "../../types";

let app: Nuxt3App = {
  Namespace: 'dev',
  Host: 'localhost',
  Name: 'nuxt3',
  Image: 'artas/nuxt3:v0.2',
  Replicas: 1,
};

export default app;
