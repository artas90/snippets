#!/usr/bin/env python

#
# = Manual encrypt/decrypt =
#
# Create archive
#     tar -cf data.tar file1.txt file2.txt
# Create key pair
#     openssl req -x509 -nodes -days 900900 -newkey rsa:2048 -keyout privatekey.pem  -out publickey.pem  -subj '/'
# Encrypt
#     openssl  smime  -encrypt  -aes256  -in  data.tar  -binary  -outform DEM  -out data.enc          publickey.pem
# Decrypt
#     openssl  smime  -decrypt           -in  data.enc  -binary  -inform DEM   -inkey privatekey.pem  -out data.tar
#

from Crypto.PublicKey import RSA
from Crypto import Random

random_generator = Random.new().read
key = RSA.generate(1024, random_generator)

data = open('/path/to/file', 'r').read()
print('original content: ' + data)

enc_data = key.publickey().encrypt(data, 32)
print('encrypted data: ' + enc_data)

dec_data = key.decrypt(enc_data)
print('decrypted data: ' + dec_data)
