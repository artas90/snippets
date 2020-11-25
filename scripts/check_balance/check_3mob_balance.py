#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Usage:
    # Login to server
    ssh andrey@server.com

    # Copy content of this file to ~/scripts/check_3mob_balance.py
    mkdir ~/scripts
    mcedit ~/scripts/check_3mob_balance.py

    # Add script to cron at 4:00
    crontab
    > # m  h  dom mon dow  command
    >   0  4  *   *   *    /home/andrey/scripts/check_3mob_balance.py
"""

# -- -- -- -- -- -- --

import json
from requests import Session
from lxml.html import fromstring, tostring

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# -- -- -- -- -- -- --

login_url   = 'https://my.3mob.ua/ua/login'
login_data  = 'phone=%2B380(91)+XXX-XX-XX&password=PASS'
balance_url = 'https://my.3mob.ua/ua/finance/balance'

smtp_user = 'from@gmail.com'
smtp_pass = 'PASS'
subject   = '3mob Balance'
from_user = '"name" <%s>' % smtp_user
to_user   = 'to@gmail.com'

# -- -- -- -- -- -- --

def get_balance(login_url, login_data, balance_url):
    headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
    }

    text_result, html_result = None, None

    try:
        session = Session()

        response = session.post(login_url, data=login_data, headers=headers)
        if json.loads(response.text)["status"] != "redirect":
            return u'Login error', u'Login error'

        response = session.get(balance_url)

    except Exception, e:
        msg = u'Login error: %s' % e.message
        return msg, msg

    # - - - -

    try:
        doc = fromstring(response.text)
        tables = doc.cssselect('.profileTable')

        text_result = u'[Balance]\n\n'
        html_result = u'<h3>Balance</h3>\n<table>\n'

        for table in tables:
            for tr in table.cssselect('tr'):
                tds = tr.cssselect('td')
                cell1, cell2 = tds[0].text_content().strip(), tds[1].text_content().strip()

                if 'PUK' not in cell1:
                    text_result += u'{}\n{}\n\n'.format(cell1, cell2)
                    html_result += u'<tr> <td>{}</td> <td>{}</td> </tr>\n'.format(cell1, cell2)

        html_result += u'</table>'

    except Exception, e:
        msg = u'Parse error: %s' % e.message
        return msg, msg

    return text_result, html_result

# -- -- -- -- -- -- --

class Email(object):

    def __init__(self, user_name, password, smtp=None, port=None):
        self.user_name = user_name
        self.password  = password
        self.smtp = smtp or 'smtp.gmail.com'
        self.port = port or 587

    def send(self, to_user, subject, text, html=None, from_user=None):
        # Create message container - the correct MIME type is multipart/alternative.
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From']    = from_user
        msg['To']      = to_user

        # Record the MIME types of both parts - text/plain and text/html.
        part1 = MIMEText(text.encode('utf-8'), 'plain', 'UTF-8')
        part2 = MIMEText(html.encode('utf-8'), 'html' , 'UTF-8') if html else None

        # Attach parts into message container.
        # According to RFC 2046, the last part of a multipart message, in this case
        # the HTML message, is best and preferred.
        msg.attach(part1)
        if part2:
            msg.attach(part2)

        # Send the message via SMTP server.
        mail = smtplib.SMTP(self.smtp, self.port)
        mail.ehlo()
        mail.starttls()

        mail.login(self.user_name, self.password)
        mail.sendmail(from_user, to_user, msg.as_string())
        mail.quit()

# -- -- -- -- -- -- --

text_result, html_result = get_balance(login_url, login_data, balance_url)

email = Email(smtp_user, smtp_pass)
email.send(to_user, subject, text_result, html_result, from_user=from_user)

# -- -- -- -- -- -- --








# curl request copied from chrome dev tools
'''
curl 'https://my.3mob.ua/ua/login' 
-H 'Cookie: dancer.session=123456789012345678901234567890123456' 
-H 'Origin: https://my.3mob.ua' 
-H 'Accept-Encoding: gzip,deflate,sdch' 
-H 'Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4' 
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36' 
-H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' 
-H 'Accept: application/json, text/javascript, */*; q=0.01' 
-H 'Referer: https://my.3mob.ua/ua/' 
-H 'X-Requested-With: XMLHttpRequest' 
-H 'Connection: keep-alive' 
--data 'phone=%2B380(91)+XX-XX-XX&password=PASS' 
--compressed
'''

# curl request copied from chrome dev tools
'''
curl 'https://my.3mob.ua/ua/login' 
-H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' 
-H 'X-Requested-With: XMLHttpRequest' 
--data 'phone=%2B380(91)+XX-XX-XX&password=PASS' 
'''

# import uncurl
# print uncurl.parse( cmd.replace('\n', ' ') )
