#!/bin/sh

virtualenv ve
./ve/bin/pip install flask
mkdir flask

cp -r ve/lib/python2.7/site-packages/flask flask
cp -r ve/lib/python2.7/site-packages/jinja2 flask
cp -r ve/lib/python2.7/site-packages/werkzeug flask
cp -r ve/lib/python2.7/site-packages/markupsafe flask
cp -r ve/lib/python2.7/site-packages/_markerlib flask
cp -r ve/lib/python2.7/site-packages/itsdangerous.py flask

rm -rf flask/flask/testsuite/
rm -rf flask/jinja2/testsuite/
rm -f flask/markupsafe/_speedups.c
rm -f flask/markupsafe/_speedups.so

python -m compileall flask
find flask -name "*.py" -delete

cat make_flask.sh > flask/make_flask.sh

cd flask && zip -r ../flask.zip . && cd ..
