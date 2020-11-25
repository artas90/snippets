#!/usr/bin/env bash

_ff_username="USER"
_ff_profile_name="XXXXXXXX.default"

function _ff_backup() {
  local username="$1"
  local profile_name="$2"

  local profile_dir="/home/$username/.mozilla/firefox/$profile_name"
  local bakdate=$(date +'%Y-%m-%d_%H-%M-%S')
  local backup_dir="/home/$username/moz-ff-backup/$bakdate"

  local important_files=(
    "places.sqlite"
    "key3.db"
    "logins.json"
    "permissions.sqlite"
    "search.json"
    "persdict.dat"
    "formhistory.sqlite"
    "cookies.sqlite"
    "cert8.db"
    "mimeTypes.rdf"
    "prefs.js"
    "stylish.sqlite"
    "gm_scripts/"
    "bookmarkbackups/"
    "sessions/"
    "searchplugins/"
  )

  mkdir -p $backup_dir

  local f
  for f in "${important_files[@]}"; do
    echo "cp $profile_dir/$f $backup_dir"
    cp -r "$profile_dir/$f" "$backup_dir"
  done

  cd "/home/$username/moz-ff-backup"
  echo "tar -czf ff-backup-$bakdate.tgz $bakdate"
  tar -czf "ff-backup-$bakdate.tgz" "$bakdate"
}

_ff_backup $_ff_username $_ff_profile_name
unset  _ff_backup _ff_username _ff_profile_name
