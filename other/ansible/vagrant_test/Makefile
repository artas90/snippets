
@usage_msg  = "Usage: make COMMAND"
@usage_msg += "\nCommands:"
@usage_msg += "\n    adhoc             Run ansible task directly"
@usage_msg += "\n    playbook          Run ansible playbook"
@usage_msg += "\n    ssh               Login to vagrant vm"
@usage_msg += "\n    vagrant_vm_setup  Make initial server setup"


@all:
	@echo $(@usage_msg)

adhoc:
	ansible local-server -i inventories/test_servers.ini -a 'uname -a'

ssh:
	ssh -p 47022 -i .vagrant/machines/default/virtualbox/private_key vagrant@127.0.0.1

vagrant_vm_setup:
	vagrant up
	ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook playbooks/initial_setup.yml -l vagrantvm -i inventories/initial_setup.ini
	ssh -p 47022 andrey@127.0.0.1
