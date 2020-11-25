#!/bin/bash

mkdir _build_httpie_result
cd _build_httpie_result

virtualenv ve
mkdir out

./ve/bin/pip install httpie

cp -R ve/lib/python2.7/site-packages/httpie out/httpie
cp -R ve/lib/python2.7/site-packages/requests out/requests
cp -R ve/lib/python2.7/site-packages/pygments out/pygments

cat out/httpie/__main__.py | sed 's/from .core/from httpie.core/' > out/__main__.py

python -m py_compile out/__main__.py           

find out -name \*.py -delete

cd out && zip -r ../_http.zip . && cd ..

echo Build executable
echo "#!/usr/bin/env python" > _hashbang && cat _hashbang _http.zip > http && chmod +x http

echo Executable is placed in ./_build_httpie_result/http
