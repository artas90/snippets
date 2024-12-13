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
  creds_file = './var/01__creds.json'
  try:
    creds = json.load(open(creds_file))
    username = creds['username']
    password = creds['password']
    email = creds['email']
  except Exception:
    username = input('gitlab username: ')
    password = input('gitlab password: ')
    email = input('email: ')
    creds = { 'username': username, 'password': password, 'email': email }
    write_file(creds_file, json.dumps(creds, indent=2))
  return username, password, email

def write_docker_config(docker_config):
  write_file('./var/02__dockerconfig.json', docker_config)

def write_registry_credentials(docker_config):
  registry_credentials = dedent(f'''\
    apiVersion: v1
    kind: Secret
    metadata:
      name: registry-credentials
      namespace: default
    type: kubernetes.io/dockerconfigjson
    data:
      .dockerconfigjson: { b64encode(docker_config) }
  ''')
  write_file('./var/03__registrycredentials.yml', registry_credentials)

def get_gitlab_regitry():
  username, password, email = get_creds()
  return dumps({
    "auths": {
      "https://registry.gitlab.com": {
        "username": username,
        "password": password,
        "email": email,
        "auth": b64encode(f'{username}:{password}')
      }
    }
  })

def main():
  docker_config = get_gitlab_regitry()
  write_docker_config(docker_config)
  write_registry_credentials(docker_config)

main()
