
expect = require 'expect.js'

{Map, Dictionary} = require '../lib/coll'


describe 'Dictionary / Map Mutators', ->
  map = dict = null
  key1 = /foo/
  key2 = /bar/

  beforeEach ->
    map = Map 'RegExp', 'Number'
    map.set key1, 111
    map.set key2, 222

    dict = Dictionary {a:1, b:2, c:3}

  describe '#remove', ->
    it 'should remove the key/val for the passed key', ->
      map.remove key1
      expect(map.get key1).to.be undefined

      dict.remove 'b'
      expect(dict.get 'b').to.be undefined

    it 'should `true` if the key/val was successfully removed', ->
      x = map.remove key1
      expect(x).to.be true

      x = dict.remove 'b'
      expect(x).to.be true

    it 'should `false` if the key/val was not removed', ->
      x = map.remove /zzz/
      expect(x).to.be false

      x = dict.remove 'q'
      expect(x).to.be false


  describe '#add', ->
    it 'should append one or more object literals to the dictionary', ->
      dict.add {d:4}
      dict.add {e:5}, {f:6, g:7}
      expect(dict.length).to.be 7
      expect(dict.keys).to.contain 'd'
      expect(dict.keys).to.contain 'e'
      expect(dict.keys).to.contain 'f'
      expect(dict.keys).to.contain 'g'
      expect(dict.values).to.contain 4
      expect(dict.values).to.contain 5
      expect(dict.values).to.contain 6
      expect(dict.values).to.contain 7
      expect(dict.get('d')).to.be 4
      expect(dict.get('e')).to.be 5
      expect(dict.get('f')).to.be 6
      expect(dict.get('g')).to.be 7

    it 'should return `this` for chaining', ->
      x = dict.add {foo:'boo'}
      expect(x).to.be dict



