#!/bin/sh

virtualenv ve
./ve/bin/pip install livereload
mkdir livereload

cp -r ve/lib/python2.7/site-packages/livereload livereload
cp -r ve/lib/python2.7/site-packages/backports livereload
cp -r ve/lib/python2.7/site-packages/certifi livereload
cp -r ve/lib/python2.7/site-packages/tornado livereload
cp    ve/lib/python2.7/site-packages/six.py livereload

python -m compileall livereload
find livereload -name "*.py" -delete

cat make_livereload.sh > livereload/make_livereload.sh

cd livereload && zip -r ../livereload.zip . && cd ..
