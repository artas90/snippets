#!/usr/bin/env python
import sys
from subprocess import Popen, PIPE

reset = "\033[0m"
def green(text): return "\033[0;32m" + text + reset
def yellow(text): return "\033[0;33m" + text + reset
def cyan(text): return "\033[0;36m" + text + reset


def rg(params):
  proc = Popen("rg --line-number " + params, stdout=PIPE, stderr=PIPE, shell=True)
  out, err = proc.communicate()

  if err:
    sys.stderr.write(err)
    raise StopIteration

  for line in out.splitlines():
    try:
      yield line.decode('utf-8')
    except UnicodeDecodeError:
      sys.stderr.write(b'decode-error: ' + line + b'\n')
    continue


def filter(line):
  if "-core/" in line or "_other/" in line:
    return False
  return True


def format(line):
  parts = line.split(":")
  filename, linenum, match = parts[0], parts[1], ':'.join(parts[2:])

  parts = filename.split("/")
  project, filename = parts[0], parts[-1]

  return cyan(project) + '->' + yellow(filename) + ":" + green(linenum) + ':' + match


def write_line(line):
  sys.stdout.write(line + "\n")


def main():
  argv = [] + sys.argv
  params = ' '.join(argv[1:])
  results = (format(l).encode('utf-8') for l in rg(params) if filter(l))
  map(write_line, results)


main()
