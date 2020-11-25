FROM ubuntu:lts

ADD rethinkdb.bin.tgz /

# Install dependencies and utils
RUN apt-get update \
&& apt-get install -yy wget mc libprotobuf8 python python-pip \
&& pip install rethinkdb

RUN mkdir /data

# Define mountable directories.
VOLUME ["/data"]

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["rethinkdb", "--bind", "all"]

# Expose ports.
#   - 8080: web UI
#   - 28015: process
#   - 29015: cluster
EXPOSE 8080
EXPOSE 28015
EXPOSE 29015
