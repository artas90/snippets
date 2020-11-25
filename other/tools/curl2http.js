#!/usr/bin/env node

const fs = require('fs');
const parse = require('parse-curl');

const STDIN_FILENO = 0;
const stdinData = fs.readFileSync(STDIN_FILENO).toString();

const request = parse(stdinData);

console.log(request.method + ' ' + request.url + ' HTTP/1.1');

Object.keys(request.header).forEach(key => {
  console.log(key + ': ' + request.header[key]);
});
