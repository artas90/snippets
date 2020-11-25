#!/usr/bin/env python
# -*- coding: utf-8 -*-
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class Email(object):

    def __init__(self, user_name, password, smtp=None, port=None):
        self.user_name = user_name
        self.password  = password
        self.smtp = smtp or 'smtp.gmail.com'
        self.port = port or 587

    def send(self, to_user, title, text, html=None, from_user=None):
        self.to_user   = to_user
        self.from_user = from_user
        self.title     = title
        self.text      = text
        self.html      = html

        # Create message container - the correct MIME type is multipart/alternative.
        msg = MIMEMultipart('alternative')
        msg['Subject'] = self.title
        msg['From']    = self.from_user
        msg['To']      = self.to_user

        # Record the MIME types of both parts - text/plain and text/html.
        part1 = MIMEText(self.text, 'plain')
        part2 = MIMEText(self.html, 'html') if self.html else None

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
        mail.sendmail(self.from_user, self.to_user, msg.as_string())
        mail.quit()


smtp_user = 'from@gmail.com'
smtp_pass = 'pass'

from_user = '"name" <%s>' % smtp_user
to_user   = 'to@gmail.com'

text = "Hello world!"
html = "<html><body> <b>Hello</b> world! </body></html>"

email = Email(smtp_user, smtp_pass)
email.send(to_user, 'Title 1', text, html, from_user=from_user)
email.send(to_user, 'Title 2', text,       from_user=from_user)
