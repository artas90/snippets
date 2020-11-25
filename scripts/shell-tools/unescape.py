#!/usr/bin/env python
import sys

for numz, line in enumerate(sys.stdin):
    line = line.replace('\\n', '\n').replace('\\\"', '\"').replace('\\\'', '\'')
    sys.stdout.write(line)

    if not line.endswith('\n'):
        sys.stdout.write('\n')
