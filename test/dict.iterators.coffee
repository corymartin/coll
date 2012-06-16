
expect = require 'expect.js'

{Map, Dict} = require '../lib/coll'


describe 'Dict / Map Iteration Methods', ->
  map = dict = null

  beforeEach ->
    map = Map 'String', 'Number'
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


  describe '#filter', ->
    it 'should return a new dictionary of key/vals that pass the iterator test', ->
      map.set 'zzz', 25
      x = map.filter (val, key) -> val > 20
      expect(x).to.be.a Map
      expect(x.length).to.be 2
      expect(x.some (v, k) -> v == 25 && k == 'zzz').to.be true
      expect(x.some (v, k) -> v == 33 && k == 'bar').to.be true
      expect(x).not.to.be map
      expect(map.length).to.be 3

      dict.add {stuff:1000, how:/do/}
      x = dict.filter (val, key) -> typeof val == 'number'
      expect(x).to.be.a Dict
      expect(x.length).to.be 2
      expect(x.some (v, k) -> v == 1000 && k == 'stuff').to.be true
      expect(x.some (v, k) -> v == 4000 && k == 'age').to.be true
      expect(x).not.to.be dict
      expect(dict.length).to.be 4

    it 'should pass 3 params to callback: val, key, dict', ->
      map.filter (val, key, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be map

      dict.filter (val, key, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be dict


  describe '#map', ->
    it '''should return a new dictionary composed of the results of calling
      the iterator function on each key/value''', ->
      x = map.map (val, key) -> ["_#{key}_", 321]
      expect(x).to.be.a Map
      expect(x.length).to.be 2
      expect(x.every (v, k) -> (/^_.+_$/).test k).to.be true
      expect(x.every (v, k) -> v == 321).to.be true
      expect(x).not.to.be map

      x = dict.map (val, key) -> ["=#{key}=", 321]
      expect(x).to.be.a Dict
      expect(x.length).to.be 2
      expect(x.every (v, k) -> (/^=.+=$/).test k).to.be true
      expect(x.every (v, k) -> v == 321).to.be true
      expect(x).not.to.be dict

      ###
      Dict's iterator can also return an {k:v} object
      ###

      x = dict.map (val, key) ->
        o = {}
        o["=#{key}="] = 321
        o
      expect(x).to.be.a Dict
      expect(x.length).to.be 2
      expect(x.every (v, k) -> (/^=.+=$/).test k).to.be true
      expect(x.every (v, k) -> v == 321).to.be true
      expect(x).not.to.be dict


  ###
  describe '#reduce', ->
    it 'should reduce the items in the list to a single value', ->
      map.set 'zzz', 40
      dict.add {town: 'bedrock'}

      console.log map.toLiteral()
      x = map.reduce 0, (a, b) -> a + b[1]
      expect(x).to.be 83
  ###








