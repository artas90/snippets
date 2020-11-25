FROM ubuntu:lts

ENV RETHINKDB_VER 2.1.5-2

RUN apt-get update \
&&  apt-get install -yy curl wget build-essential m4 protobuf-compiler libprotobuf-dev libboost-dev python \
&&  mkdir -p /app/dist /pwd \
&&  cd /app \
&&  wget http://download.rethinkdb.com/dist/rethinkdb-$RETHINKDB_VER.tgz \
&&  tar xf rethinkdb-$RETHINKDB_VER.tgz \
&&  cd rethinkdb-$RETHINKDB_VER \
&&  ./configure --with-system-malloc --allow-fetch --prefix=/app/dist \
&&  make ALLOW_WARNINGS=1 \
&&  make install ALLOW_WARNINGS=1 \
&&  cd /app/dist \
&&  tar -czvf /app/rethinkdb-$RETHINKDB_VER-`uname -i`.bin.tgz * \
&&  echo "Package /app/rethinkdb-$RETHINKDB_VER-`uname -i`.bin.tgz was created."
