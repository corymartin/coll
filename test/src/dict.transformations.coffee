
expect = require 'expect.js'

{Map, Dict} = require '../lib/coll'


describe 'Dict / Map Transformation Methods', ->
  map = dict = null

  beforeEach ->
    map = Map()
    map.set 'foo', 10
    map.set 'bar', 33

    dict = Dict {name:'Fred', age:4000}

  describe '#filter', ->
    it 'should return a new dictionary of key/vals that pass the iterator test', ->
      map.set 'zzz', 25
      x = map.filter (key, val) -> val > 20
      expect(x).to.be.a Map
      expect(x.length).to.be 2
      expect(x.some (k, v) -> v == 25 && k == 'zzz').to.be true
      expect(x.some (k, v) -> v == 33 && k == 'bar').to.be true
      expect(x).not.to.be map
      expect(map.length).to.be 3

      dict.add {stuff:1000, how:/do/}
      x = dict.filter (key, val) -> typeof val == 'number'
      expect(x).to.be.a Dict
      expect(x.length).to.be 2
      expect(x.some (k, v) -> v == 1000 && k == 'stuff').to.be true
      expect(x.some (k, v) -> v == 4000 && k == 'age').to.be true
      expect(x).not.to.be dict
      expect(dict.length).to.be 4

    it 'should pass 3 params to callback: key, val, dict', ->
      map.filter (key, val, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be map

      dict.filter (key, val, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be dict

    it 'should accept an optional context argument', ->
      obj = {foo:'bar'}
      map.filter obj, (key, val) ->
        expect(this).to.be obj

      dict.filter obj, (key, val) ->
        expect(this).to.be obj


  describe '#reject', ->
    it 'should return a new dictionary of key/vals that fail the iterator test', ->
      map.set 'zzz', 25
      x = map.reject (key, val) -> val > 20
      expect(x).to.be.a Map
      expect(x.length).to.be 1
      expect(x.keys).to.eql ['foo']
      expect(x.values).to.eql [10]
      expect(x).not.to.be map
      expect(map.length).to.be 3

      dict.add {stuff:1000, how:/do/}
      x = dict.reject (key, val) -> typeof val != 'number'
      expect(x).to.be.a Dict
      expect(x.length).to.be 2
      expect(x.keys).to.contain 'stuff'
      expect(x.keys).to.contain 'age'
      expect(x.values).to.contain 1000
      expect(x.values).to.contain 4000
      expect(x).not.to.be dict
      expect(dict.length).to.be 4

    it 'should pass 3 params to callback: key, val, dict', ->
      map.reject (key, val, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be map

      dict.reject (key, val, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be dict

    it 'should accept an optional context argument', ->
      obj = {foo:'bar'}
      map.reject obj, (key, val) ->
        expect(this).to.be obj

      dict.reject obj, (key, val) ->
        expect(this).to.be obj


  describe '#clone', ->
    it 'should return a new copy of the key/val object', ->
      copy = map.clone()
      expect(copy).to.be.a Map
      expect(copy).not.to.be map
      expect(copy.length).to.be map.length
      expect(copy.get 'foo').to.be 10
      expect(copy.get 'bar').to.be 33

      copy = dict.clone()
      expect(copy).to.be.a Dict
      expect(copy).not.to.be dict
      expect(copy.length).to.be dict.length
      expect(copy.get 'name').to.be 'Fred'
      expect(copy.get 'age').to.be 4000


  describe '#clear', ->
    it 'should remove all key/val pairs from the instance', ->
      map.clear()
      expect(map.length).to.be 0
      expect(map.keys.length).to.be 0
      expect(map.values.length).to.be 0

      dict.clear()
      expect(dict.length).to.be 0
      expect(dict.keys.length).to.be 0
      expect(dict.values.length).to.be 0

    it 'should return `this`', ->
      x = map.clear()
      expect(x).to.be map

      x = dict.clear()
      expect(x).to.be dict


  describe '#toLiteral', ->
    it 'should return an object literal of the key/val pairs', ->
      lit = map.toLiteral()
      expect(lit).to.eql {foo:10, bar:33}

      lit = dict.toLiteral()
      expect(lit).to.eql {name:'Fred', age:4000}

    it 'should accept an optional serializer function to convert keys', ->
      map = Map()
      key1 = {position:'rb', team:'vikings'}
      key2 = {position:'wr', team:'cardinals'}
      map.set key1, 'peterson'
      map.set key2, 'fitz'

      lit = map.toLiteral (key, val) -> key.team + ':' + key.position
      expect(lit).to.eql {'vikings:rb':'peterson', 'cardinals:wr':'fitz'}

      map2 = Map()
      map.set 'foo', 'bar'
      map2.toLiteral (key, val) ->
        expect(key).to.be 'foo'
        expect(val).to.be 'bar'
        key


  describe '#toArray', ->
    it 'should return an array of the key/val pairs as [key, val]', ->
      arr = map.toArray()
      expect(arr.some (pair) ->
        pair[0] == 'foo' && pair[1] == 10).to.be true
      expect(arr.some (pair) ->
        pair[0] == 'bar' && pair[1] == 33).to.be true

      arr = dict.toArray()
      expect(arr.some (pair) ->
        pair[0] == 'name' && pair[1] == 'Fred').to.be true
      expect(arr.some (pair) ->
        pair[0] == 'age' && pair[1] == 4000).to.be true

