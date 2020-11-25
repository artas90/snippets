# interactive
openssl genrsa -des3 -out server-with-pass.key 1024
openssl rsa -in server-with-pass.key -out server-insecure.key
rm -f server-with-pass.key
openssl req -new -key server-insecure.key -out server-insecure.csr
openssl x509 -req -days 9999 -in server-insecure.csr -signkey server-insecure.key -out server-insecure.crt

# oneline
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/C=tk/ST=st/O=o/CN=domain.com" -keyout domain.com.key -out domain.com.crt
