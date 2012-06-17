
expect = require 'expect.js'

{Map, Dict} = require '../lib/coll'


describe 'Dict / Map Iteration Methods', ->
  map = dict = null

  beforeEach ->
    map = Map()
    map.set 'foo', 10
    map.set 'bar', 33

    dict = Dict {name:'Fred', age:4000}

  describe '#forEach', ->
    it 'should iterate over each item in the collection', ->
      cnt = 0
      map.forEach (val, key, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be map
        ++cnt
      expect(cnt).to.be 2

      cnt = 0
      dict.forEach (val, key, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be dict
        ++cnt
      expect(cnt).to.be 2

    it 'should accept an optional context argument', ->
      obj = {foo:'bar'}
      map.forEach obj, (val, key) ->
        expect(this).to.be obj

      dict.forEach obj, (val, key) ->
        expect(this).to.be obj


  describe '#some', ->
    it 'should return true if at least one key/val passes the iterator test', ->
      x = map.some (val, key, dict) -> val == 33
      expect(x).to.be true
      x = map.some (val, key, dict) -> val == 99
      expect(x).to.be false

      x = dict.some (val, key, dict) -> val == 4000
      expect(x).to.be true
      x = dict.some (val, key, dict) -> val == 'Barney'
      expect(x).to.be false

    it 'should pass 3 vals to callback: val, key, dict', ->
      map.some (val, key, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be map

      dict.some (val, key, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be dict

    it 'should accept an optional context argument', ->
      obj = {foo:'bar'}
      map.some obj, (val, key) ->
        expect(this).to.be obj

      dict.some obj, (val, key) ->
        expect(this).to.be obj


  describe '#every', ->
    it 'should return true if every key/val passes the iterator test', ->
      x = map.every (val, key, dict) -> val < 40
      expect(x).to.be true
      x = map.every (val, key, dict) -> val == 10
      expect(x).to.be false

      x = dict.every (val, key, dict) -> val != undefined
      expect(x).to.be true
      x = dict.every (val, key, dict) -> val == 'Barney'
      expect(x).to.be false

    it 'should pass 3 params to callback: val, key, dict', ->
      map.every (val, key, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be map

      dict.every (val, key, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be dict

    it 'should accept an optional context argument', ->
      obj = {foo:'bar'}
      map.every obj, (val, key) ->
        expect(this).to.be obj

      dict.every obj, (val, key) ->
        expect(this).to.be obj

