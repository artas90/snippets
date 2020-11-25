#!/usr/bin/env python
import os
import sys
import json

site_dir = os.path.dirname(__file__)
sys.path.insert(0, os.path.abspath(os.path.join(site_dir, 'lib.zip')))

from flask import Flask, render_template
from jinja2 import Environment, FileSystemLoader
from livereload import Server, shell

# ----------------------------------------------------------

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.template_filter()
def uuid4(no_args):
    from uuid import uuid4
    return uuid4().hex


@app.route('/get_books/<path:items>')
def api(items):
    # format key:value/key:value
    data = {}
    for item in items.strip('/').split('/'):
        item = item.split(':')
        if len(item) >= 2:
            data[item[0]] = item[1]
        else:
            data[item[0]] = None

    return json.dumps(data)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def main(path):
    return render_template('index.html')


def just_render(template_name):
    env = Environment(loader=FileSystemLoader('templates'))
    env.filters['uuid4'] = uuid4
    template = env.get_template(template_name+'.html')
    return template.render()

# ----------------------------------------------------------

server = Server(app.wsgi_app)
server.watch('static/css/*.css')
server.watch('templates')

# ----------------------------------------------------------

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("-r", "--render", metavar='template_name', type=unicode, help="Just render one page")
    parser.add_argument("-f", "--filename", metavar='file_name', type=unicode, help="Render to file")
    args = parser.parse_args()

    if args.render:
        data = just_render(args.render)

        if args.filename:
            with open(args.filename, 'w') as f:
                f.write(data)
        else:
            print data

    else:
        server.serve()
