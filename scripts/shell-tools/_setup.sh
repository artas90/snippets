#!/bin/bash

_utils=("pyline" "unescape" "rxno" "jsonformat" "crg")

for u in "${_utils[@]}"; do
    echo "Copy "$u" to /usr/local/bin"
    cat `pwd`"/"$u".py" > "/usr/local/bin/"$u
    chmod +x "/usr/local/bin/"$u
done
