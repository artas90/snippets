#!/bin/sh

update_variables() {
  local file="/tmp/k8sp-variables.html"
  local conf=""

  for var in `env | grep K8SP_`
  do
    local name=$(echo "$var" | sed -e 's/=.*//')
    local value=$(echo "$var" | sed -e 's/^[^=]*=//')
    conf="$conf \"$name\": \"$value\","
  done

  conf="<script>window.k8spVariables = { $conf };</script>"

  echo "* Update $file *"
  echo $conf | tee $file
}

update_variables
nginx -g 'daemon off;'
