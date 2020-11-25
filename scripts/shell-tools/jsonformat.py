#!/usr/bin/env python
import sys
import json

try:
    data = sys.stdin.read()
    data = json.loads(data)
    data = json.dumps(data, indent=4)
    sys.stdout.write(data)
    sys.stdout.write('\n')
except Exception, e:
    sys.stderr.write('JSON Parse error')
