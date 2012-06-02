
compile-tests:
	@coffee \
		--compile \
		--bare \
		./test/*.coffee

test-run:
	@./node_modules/.bin/mocha \
		--require expect.js \
		--reporter dot

test: compile-tests test-run


.PHONY: test
