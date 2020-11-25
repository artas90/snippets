1. Pull image for your architecture and set tag for it:
$ docker pull ubuntu:14.04.3 && docker tag ubuntu:14.04.3 ubuntu:lts
OR
$ docker pull armv7/armhf-ubuntu:14.04.3 && docker tag armv7/armhf-ubuntu:14.04.3 ubuntu:lts

2. Build binary package:
$ docker build --file=build_pkg.Dockerfile --tag=rethinkdb_pkg .

3. Extract package from docker image:
$ docker run --rm -v $(pwd):/pwd rethinkdb_pkg cp /app/$(docker run --rm rethinkdb_pkg ls /app | grep bin.tgz) /pwd/pkgs

4. Remove image with package:
$ docker rmi rethinkdb_pkg

5. Copy package for your architecture:
$ cp pkgs/<package>.tgz rethinkdb.bin.tgz

6. Build runable image:
$ docker build --file=build_image.Dockerfile --tag=rethinkdb .

7. Run container:
$ docker run -d -p 8080:8080 -p 28015:28015 -p 29015:29015 -v `pwd`/data:/data --name rethinkdb rethinkdb
