
expect = require 'expect.js'

{list} = require '../lib/coll'


describe 'list()', ->

  describe 'list variable', ->
    it 'should be able to access items by index directly', ->
      ls = list 'asdf'
      expect(ls(0)).to.be 'a'
      expect(ls(1)).to.be 's'
      expect(ls(2)).to.be 'd'
      expect(ls(3)).to.be 'f'

    it 'should be able to set items by index directly', ->
      ls = list 'asdf'
      ls 1, 'z'
      ls 2, 'z'
      expect(ls(0)).to.be 'a'
      expect(ls(1)).to.be 'z'
      expect(ls(2)).to.be 'z'
      expect(ls(3)).to.be 'f'

