---
layout: ../../layouts/Layout.astro
title: Setup Docker or Podman on OSX
section: OS X
order: 2
---

### Podman
```sh
podman machine init --rootful --now
# OR (then)
podman machine set --rootful
# OR
podman machine init --now
podman machine ssh sudo sysctl net.ipv4.ip_unprivileged_port_start=80

podman run -d --name nginx -p 80:80 nginx:alpine

containers="$HOME/.local/share/containers"
docker context create podman --docker "host=unix://$containers/podman/machine/qemu/podman.sock"
docker context use podman
# OR
sudo podman-mac-helper install

podman machine ssh
sudo rpm-ostree install tmux htop mc git zsh
```

### Rancher Desktop
```sh
# /usr/local/bin/docker -> /Applications/Docker.app/Contents/Resources/bin/docker
# /usr/local/bin/kubectl -> /Applications/Docker.app/Contents/Resources/bin/kubectl

rancherbin="/Applications/Rancher Desktop.app/Contents/Resources/resources/darwin/bin"

rm /usr/local/bin/docker
ln -sfv "$rancherbin/nerdctl" /usr/local/bin/docker

rm /usr/local/bin/kubectl
ln -sfv '$rancherbin/kuberlr' /usr/local/bin/kubectl

limabin="/Applications/Rancher Desktop.app/Contents/Resources/resources/darwin/lima/bin" && \
ls "$limabin" | xargs -IQQQQ ln -sfv "$limabin/QQQQ" "/usr/local/bin/QQQQ"
```

### Rancher: Add Podman
```sh
rdctl shell
# OR
export LIMA_HOME="$HOME/Library/Application Support/rancher-desktop/lima"
limactl show-ssh 0
limactl shell 0

sudo apk add podman

# -- -- -- --

nvim /usr/local/bin/podman

#!/bin/sh
LIMA_HOME="$HOME/Library/Application Support/rancher-desktop/lima" limactl shell 0 sudo podman "$@"
# OR
rdctl shell sudo podman "$@"
```

### (co)lima
```sh
limactl start --name=default template://docker
limactl shell default

docker context create lima --docker "host=unix:///$HOME/.lima/default/sock/docker.sock"
docker context use lima

# -- -- -- --

colima start
```

### Podman on lima
```sh
limactl start /usr/local/share/doc/lima/examples/podman.yaml

limactl shell podman
sudo dnf install htop
 
export CONTAINER_HOST=$(limactl list podman --format "unix:///{{.Dir}}/sock/podman.sock")
# OR
podman system connection add lima-podman "unix:///{{.Dir}}/sock/podman.sock"
podman system connection default lima-podman

export DOCKER_HOST=$(limactl list podman --format "unix:///{{.Dir}}/sock/podman.sock")

podman ls
```
