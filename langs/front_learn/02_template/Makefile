
@usage_msg  = "Usage: make COMMAND"
@usage_msg += "\nCommands:"
@usage_msg += "\n    run       Serve templates in browser"
@usage_msg += "\n    render    Render in static html"

@all:
	@echo $(@usage_msg)

run:
	python run_site.py

render:
	python run_site.py --render index \
	| sed -e "s/href=\"\/static/href=\"static/g" \
	| sed -e "s/src=\"\/static/src=\"static/g" \
	> result.html
