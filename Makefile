release:
	uglifyjs -o backbone-getset.min.js backbone-getset.js

test:
	open test/index.html

docs:
	docco backbone-getset.js
	open docs/backbone-getset.html

.PHONY: release test docs
