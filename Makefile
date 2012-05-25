
test:
	@./node_modules/.bin/mocha \
		--require expect.js \
		--reporter dot


.PHONY: test
