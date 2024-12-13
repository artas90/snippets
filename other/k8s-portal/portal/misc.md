### gitlab

```
docker login registry.gitlab.com
  Username: oauth2
  Password:

docker build -t registry.gitlab.com/artas90/k8s-portal/APP .

docker push registry.gitlab.com/artas90/k8s-portal/APP
```

### helm

```
cd APP

helm uninstall APP && helm install APP .helm

helm registry login -u oauth2 registry.gitlab.com

helm chart save .helm registry.gitlab.com/artas90/k8s-portal/APP:VER

helm chart push registry.gitlab.com/artas90/k8s-portal/APP:VER
```

docker 2

```
docker build -t registry.gitlab.com/artas90/k8s-portal/app__pyapi .

docker push registry.gitlab.com/artas90/k8s-portal/app__pyapi
```

### run

```
helm uninstall pyapi && helm install pyapi .helm
```

### expose

```
kubectl port-forward deployment/portal-pyapi 8081:80 --address 0.0.0.0
```

