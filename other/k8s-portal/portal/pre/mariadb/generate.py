import json
import base64
from textwrap import dedent

def dumps(data): return json.dumps(data, indent=2)

def b64encode(string): return base64.b64encode(string.encode('utf-8')).decode('utf-8')

def write_file(to_file, data):
  print()
  print(f'---- {to_file} ----')
  print(data)
  with open(to_file, 'w') as f:
    f.write(data)

def get_creds():
  try:
    creds = json.load(open('./var/01__values.json'))
    rootPassword = creds['rootPassword']
    user = creds['user']
    password = creds['password']
    database = creds['database']
  except Exception:
    rootPassword = input('rootPassword: ')
    user = input('user: ')
    password = input('password: ')
    database = input('database: ')
    creds = {
      'rootPassword': rootPassword,
      'user': user,
      'password': password,
      'database': database,
    }
    write_file('./var/01__values.json', json.dumps(creds, indent=2))
  return rootPassword, user, password, database

def write_values(rootPassword, username, password, database):
  values = dedent(f'''\
    auth:
      rootPassword: "{rootPassword}"
      username: "{username}"
      password: "{password}"
      database: "{database}"
  ''')
  write_file('./var/02__values.yml', values)

def write_secret(user, password, database):
  secret = dedent(f'''\
    apiVersion: v1
    kind: Secret
    metadata:
      name: portal-mariadb-my
    data:
      user: { b64encode(user) }
      pass: { b64encode(password) }
      db: { b64encode(database) }
  ''')
  write_file('./var/03__secret.yml', secret)

def write_db_sql(user, password, database):
  secret = dedent(f'''\
    CREATE DATABASE `{database}`;

    GRANT USAGE ON *.* TO `{user}`@`%` IDENTIFIED BY '{password}';

    GRANT ALL PRIVILEGES ON `{database}`.`*` TO `{user}`@`%`;

    FLUSH PRIVILEGES;

    SHOW GRANTS FOR `{user}`;
  ''')
  write_file('./var/04__db.sql', secret)

def main():
  rootPassword, user, password, database = get_creds()
  write_values(rootPassword, user, password, database)
  write_secret(user, password, database)
  write_db_sql(user, password, database)

main()
