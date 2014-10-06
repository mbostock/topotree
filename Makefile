GENERATED_FILES = \
	topotree.js \
	topotree.min.js

all: $(GENERATED_FILES)

.PHONY: clean all test

clean:
	rm -f -- $(GENERATED_FILES)

test:
	node_modules/.bin/vows

topotree.js: $(shell node_modules/.bin/smash --ignore-missing --list src/index.js)
	rm -f $@
	node_modules/.bin/smash src/index.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	chmod a-w $@

topotree.min.js: topotree.js
	rm -f $@
	node_modules/.bin/uglifyjs $< -c -m -o $@
