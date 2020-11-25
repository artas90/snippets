#!/usr/bin/env python
import sys
if len(sys.argv) > 1:
    patterns = r"|".join(sys.argv[1:])
    patterns = r"'^((?!" + patterns + r").)*$'"
    sys.stdout.write(patterns)
