import sys
import csv
import urlparse
import requests
from pyquery import PyQuery
from lxml.html import tostring, HtmlElement


#
# Run 'pip install requests and pyquery' before usage
#


BASE_URL = 'http://jrgraphix.net'


def pq(obj):
    if isinstance(obj, HtmlElement):
        obj = tostring(obj)
    return PyQuery(obj)


def get_text(obj):
    if isinstance(obj, HtmlElement):
        return obj.text
    elif isinstance(obj, PyQuery):
        return obj.text()


def get_page(url):
    resp = requests.get(url)
    page = pq(resp.text)
    return page


def get_links(page, selector):
    links = []
    items = page(selector)
    for item in items:
        link = item.get('href')
        links.append(link)
    return links


mainpage = get_page(BASE_URL + '/r/Unicode/')
links = get_links(mainpage, 'table.unicode a')


# Split columns
links1 = []
links2 = []
while links:
    links1.append(links.pop(0))
    links2.append(links.pop(0))
links = links1 + links2


filebase = 'Unicode_ranges'
filepart = 1
max_ranges_per_file = 20
counter = 1

outfile = open('{}_{:0>4}.txt'.format(filebase, filepart), 'w')

for link in links:
    range_page = get_page(BASE_URL + link)

    title = get_text(range_page('.utop h1'))
    outfile.write('\n' + title + '\n')

    symbols_items = range_page('div.u span')
    for item in symbols_items:
        t = get_text(item)
        if not t:
            continue
        t = t.encode('utf-8')
        outfile.write(t)
    
    outfile.write('\n')

    counter += 1


    if counter > 20:
        outfile.flush()
        outfile.close()
        counter = 1
        filepart += 1
        outfile = open('{}_{:0>4}.txt'.format(filebase, filepart), 'w')
