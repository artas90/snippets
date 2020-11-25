import os
import sys
import time
import sqlite3
import argparse
from textwrap import dedent
from datetime import datetime, timedelta


def die(*messages):
  print(messages)
  sys.exit()


def t(template, *args, **kwargs):
  return dedent(template).strip('\n')


def get_history(profile_dir, reports_dir, days=1):
  now = datetime.now()
  now_str = now.strftime('%Y-%m-%d_%H-%M-%S')
  db_file = os.path.abspath(os.path.join(profile_dir, 'places.sqlite'))
  report_file = os.path.abspath(os.path.join(reports_dir, now_str + '.html'))

  if not os.path.exists(db_file):
    die('File places.sqlite was not found in profile dir')

  if not os.path.exists(reports_dir):
    die('Reports dir was not found')

  conn = sqlite3.connect(db_file)

  last_date = now - timedelta(days=days)
  last_date = time.mktime(last_date.timetuple()) * 10**6

  cursor = conn.execute("""
    SELECT p.title, p.url, i.url AS icon, h.visit_date
    FROM   moz_historyvisits AS h
    INNER JOIN moz_places    AS p
      ON h.place_id = p.id
    INNER JOIN moz_favicons    AS i
      ON p.favicon_id = i.Id
    WHERE
      p.title IS NOT NULL
      AND
      h.visit_date >= ?
    ORDER BY p.url ASC, h.visit_date DESC;
  """, [last_date])


  with open(report_file, 'w') as f:
    style = t('''
      <style>
        body {
          width: 800px;
          margin: 0px auto;
          font-family: sans-serif;
        }

        .history-item {
          margin-bottom: 5px;
        }

        img {
          float: left;
          margin-right: 8px;
        }

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
          width: 776px;
          font-size: 16px;
        }
      </style>
    ''')

    top = t('''
      <!DOCTYPE html>
      <html>
      <head>
        <title>{}</title>
        <meta charset="UTF-8">
        {}
      </head>
      <body>
      <h3>{}</h3>
      <div class="history-item-list">
    ''').format(
      'Firefox history ' + now_str,
      style,
      now_str
    )

    f.write(top)

    for title, url, icon, visit_date in cursor:
      f.write('<div class="history-item">\n')
      f.write('  <img with="16" height="16" src="' + icon.encode('utf-8') + '"/>\n')
      f.write('  <span>' + title.encode('utf-8') + '</span>\n')
      f.write('</div>\n\n')

    bottom = t('''
      </div>
      </body>
      </html>
    ''')

    f.write(bottom)

  print('File {} was written'.format(report_file))

  conn.close()


def main():
  parser = argparse.ArgumentParser(description='Extract Firefox history for last day(s)')
  parser.add_argument('profile_dir', metavar='profile_dir', help='Path to file firefox profile')
  parser.add_argument('reports_dir', metavar='reports_dir', help='Path to dir with html reports')
  parser.add_argument('--days', metavar='D', type=int, default=1, help='Days to extract')
  args = parser.parse_args()

  get_history(args.profile_dir, args.reports_dir, args.days)


if __name__ == '__main__':
  main()
