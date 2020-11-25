CREATE DATABASE dbname;

GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY 'userpass';

SELECT user FROM mysql.user GROUP BY user;

DELETE FROM mysql.user WHERE user = 'username';
