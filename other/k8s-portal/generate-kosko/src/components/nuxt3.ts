import env from "@kosko/env";
import { Deployment } from "kubernetes-models/apps/v1";
import { Service } from "kubernetes-models/v1";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1";

import type { Nuxt3App } from "../types";

const APP: Nuxt3App = env.component("nuxt3");
const POD_LABELS = {
  pod: APP.Name
};

const deployment = new Deployment({
  metadata: {
    name: APP.Name + '-depl'
  },
  spec: {
    replicas: APP.Replicas,
    selector: {
      matchLabels: { ...POD_LABELS }
    },
    template: {
      metadata: {
        labels: { ...POD_LABELS }
      },
      spec: {
        containers: [{
          name: APP.Name + '-cont',
          image: APP.Image
        }]
      }
    }
  }
});

const service = new Service({
  metadata: {
    name: APP.Name + '-svc'
  },
  spec: {
    type: 'ClusterIP',
    ports: [
      {
        port: 80,
        targetPort: 80,
        protocol: 'TCP',
        name: 'http',
      }
    ],
    selector: { ...POD_LABELS }
  }
});

const ingress = new Ingress({
  metadata: {
    name: APP.Name + '-ingr'
  },
  spec: {
    rules: [
      {
        host: APP.Host,
        http: {
          paths: [
            {
              path: '/',
              pathType: 'Prefix',
              backend: {
                service: {
                  name: service.metadata!.name as string,
                  port: {
                    number: 80
                  }
                }
              }
            }
          ]
        }
      }
    ]
  }
});

const resources = [deployment, service, ingress];
resources.forEach(it => {
  it.metadata!.namespace = APP.Namespace;
});

export default resources;
