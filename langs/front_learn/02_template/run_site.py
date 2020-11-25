#!/usr/bin/env python
import os
import sys

site_dir = os.path.dirname(__file__)
sys.path.insert(0, os.path.abspath(os.path.join(site_dir, 'flask.zip')))
sys.path.insert(0, os.path.abspath(os.path.join(site_dir, 'livereload.zip')))

from flask import Flask, render_template
from jinja2 import Environment, FileSystemLoader
from livereload import Server, shell

# ----------------------------------------------------------

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.template_filter()
def uuid4(no_args):
    from uuid import uuid4
    return uuid4().hex

@app.route('/')
@app.route('/<template_name>/')
def main(template_name='index'):
    template_name += '.html'
    if template_name.startswith('_'):
        return 'Page not found'
    if not os.path.exists(os.path.abspath(os.path.join(site_dir, 'templates', template_name))):
        return 'Page not found'
    return render_template(template_name)

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
