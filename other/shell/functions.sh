#!/usr/bin/env bash

function open {
    (xdg-open "$1" &> /dev/null &)
}

# # cat ~/.s3cfg
# [default]
#   access_key = ...
#   secret_key = ...
function s3put() {
    s3cmd put --acl-public --guess-mime-type $1 s3://bucket.name
}

function syncto() {
  if [ -z "$1" ] || [ -z "$2" ] ; then
  	echo 'Usage: syncto <local-path> <ssh-alias>:<remote-path>'
  	return
  fi

  echo "Syncing $1 with $2..."
  find $1 -type f | entr rsync -vuar $1 $2
}
