# k8s-portal

### install or copy utils

- [k3d](https://github.com/rancher/k3d/releases)
- [task](https://github.com/go-task/task/releases)
- [python](https://www.python.org/)
- [k9s](https://github.com/derailed/k9s/releases)  (optional, tui)
- [octant](https://github.com/vmware-tanzu/octant/releases)  (optional, webui)
- [helm](https://github.com/helm/helm/releases) (optional)
- [werf](https://github.com/werf/werf/releases) (optional)

### init all

```bash
task cluster:create

task mariadb:install

# apply provided sql manually
task mariadb:client

# OR single build
(cd apps && task install)
# OR build and watch
(cd apps && tilt up)

# optional
task webui

# open http://127.0.0.1:7777

# enjoy :)
```
