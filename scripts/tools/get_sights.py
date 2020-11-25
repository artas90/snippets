import csv
import urlparse
import requests
from pyquery import PyQuery
from lxml.html import tostring, HtmlElement

#
# Run 'pip install requests and pyquery' before usage
#

def pq(obj):
  if isinstance(obj, HtmlElement):
    obj = tostring(obj)
  return PyQuery(obj)


def get_text(obj):
  if isinstance(obj, HtmlElement):
    return obj.text
  elif isinstance(obj, PyQuery):
    return obj.text()


class PlacesGetter(object):

  def __init__(
    self, base_url, page_url, 
    selector_list_item, selector_list_link,
    selector_details_title, selector_details_addr
  ):
    self._base_url = base_url
    self._page_url = page_url
    self._selector_list_item = selector_list_item
    self._selector_list_link  = selector_list_link
    self._selector_details_title = selector_details_title
    self._selector_details_addr = selector_details_addr
    self._sights  = []

  def run(self, from_page, to_page, out_fname):
    for i in range(from_page, to_page+1):
      self.get_page(i)

    with open(out_fname, 'wb') as f:
      writer = csv.writer(f)

      for row in self._sights:
        writer.writerow([
          row[0].encode('utf-8'),
          row[1].encode('utf-8'),
          row[2].encode('utf-8'),
          row[3].encode('utf-8'),
        ])

  def get_page(self, idx):
    full_page_url = urlparse.urljoin(self._base_url, self._page_url.format(page=idx))

    resp = requests.get(full_page_url)
    items = pq(resp.text)(self._selector_list_item)

    for item in items:
      link_item = pq(item)(self._selector_list_link)
      link = link_item.attr('href')
      subpage_url = urlparse.urljoin(self._base_url, link)

      data = self.get_sights(subpage_url)
      self._sights.append(data)

  def get_sights(self, si_url):
    resp = requests.get(si_url)
    page = pq(resp.text)

    title = get_text(page(self._selector_details_title))
    addr =  page(self._selector_details_addr)
    addr =  get_text(addr[0]) if addr else ''

    print('Get', title.encode('utf-8'))

    # window.component['Map_PanoramaGoogle'].latitude = 47.498004;
    # window.component['Map_PanoramaGoogle'].longitude = 19.058712;

    latitude = ''
    longitude = ''

    for line in resp.text.splitlines():
      if 'latitude' in line:
        line2 = line.split('=')
        latitude = line2[1].strip().strip(';') if (len(line2) > 1) else '-' 
      if 'longitude' in line:
        line2 = line.split('=')
        longitude = line2[1].strip().strip(';') if (len(line2) > 1) else '-' 

    return title, addr, latitude, longitude


pg = PlacesGetter(
  base_url = 'http://www.rutraveller.ru',
  page_url = '/resort/864/places?_ps=100&_p={page}',
  selector_list_item = '.content-main-td-center .plc15-item',
  selector_list_link = '.plc15-item-ttl',
  selector_details_title = '.content-main-td-center .page-ttl-h1',
  selector_details_addr = '.pl-one-contact .pl-one-contact-td .black',
)

pg.run(0, 2, 'Budapest.csv')
