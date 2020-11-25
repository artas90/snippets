#!/bin/bash

function tunnel_up()   { ssh -fN -D 49049 andrey@artas90.co.vu }

function tunnel_down() { ps -f -C ssh | grep "ssh -fN -D 49049" | awk '{print $2}' | xargs kill }

function tunnel_ff()   { (firefox --no-remote --profile parh/to/ff_profile &>/dev/null &) }


