
compile-tests:
	@./node_modules/coffee-script/bin/coffee \
		--compile \
		--bare \
		--output ./test/ \
		./test/src/

test-run:
	@./node_modules/.bin/mocha \
		--require expect.js \
		--ui bdd \
		--reporter dot

test: compile-tests test-run


.PHONY: test
