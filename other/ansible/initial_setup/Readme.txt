
Run:
$ ANSIBLE_NOCOWS=1 ansible-playbook playbook.yml -i inventory.ini -l all-servers --ask-sudo-pass
OR
$ ANSIBLE_NOCOWS=1 ansible-playbook playbook.yml -i inventory.ini -l main-server --ask-sudo-pass

