
expect = require 'expect.js'

{TypedDictionary, Dictionary} = require '../lib/coll'


describe 'Dictionary Iteration Methods', ->
  d1 = d2 = null

  beforeEach ->
    d1 = TypedDictionary 'String', 'Number'
    d1.set 'foo', 10
    d1.set 'bar', 33

    d2 = Dictionary {name:'Fred', age:4000}

  describe '#forEach', ->
    it 'should iterate over each item in the collection', ->
      cnt = 0
      d1.forEach (val, key, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be d1
        ++cnt
      expect(cnt).to.be 2

      cnt = 0
      d2.forEach (val, key, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be d2
        ++cnt
      expect(cnt).to.be 2


  describe '#some', ->
    it 'should return true if at least one key/val passes the iterator test', ->
      x = d1.some (val, key, dict) -> val == 33
      expect(x).to.be true
      x = d1.some (val, key, dict) -> val == 99
      expect(x).to.be false

      x = d2.some (val, key, dict) -> val == 4000
      expect(x).to.be true
      x = d2.some (val, key, dict) -> val == 'Barney'
      expect(x).to.be false

    it 'should pass 3 vals to callback: val, key, dict', ->
      d1.some (val, key, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be d1

      d2.some (val, key, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be d2


  describe '#every', ->
    it 'should return true if every key/val passes the iterator test', ->
      x = d1.every (val, key, dict) -> val < 40
      expect(x).to.be true
      x = d1.every (val, key, dict) -> val == 10
      expect(x).to.be false

      x = d2.every (val, key, dict) -> val != undefined
      expect(x).to.be true
      x = d2.every (val, key, dict) -> val == 'Barney'
      expect(x).to.be false

    it 'should pass 3 params to callback: val, key, dict', ->
      d1.every (val, key, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be d1

      d2.every (val, key, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be d2


  describe '#filter', ->
    it 'should return a new dictionary of key/vals that pass the iterator test', ->
      d1.set 'zzz', 25
      x = d1.filter (val, key) -> val > 20
      expect(x).to.be.a TypedDictionary
      expect(x.length).to.be 2
      expect(x.some (v, k) -> v == 25 && k == 'zzz').to.be true
      expect(x.some (v, k) -> v == 33 && k == 'bar').to.be true
      expect(x).not.to.be d1
      expect(d1.length).to.be 3

      d2.extend {stuff:1000, how:/do/}
      x = d2.filter (val, key) -> typeof val == 'number'
      expect(x).to.be.a Dictionary
      expect(x.length).to.be 2
      expect(x.some (v, k) -> v == 1000 && k == 'stuff').to.be true
      expect(x.some (v, k) -> v == 4000 && k == 'age').to.be true
      expect(x).not.to.be d2
      expect(d2.length).to.be 4

    it 'should pass 3 params to callback: val, key, dict', ->
      d1.filter (val, key, dict) ->
        expect(val).to.be if key == 'foo' then 10 else 33
        expect(key).to.be if val == 10 then 'foo' else 'bar'
        expect(dict).to.be d1

      d2.filter (val, key, dict) ->
        expect(val).to.be if key == 'name' then 'Fred' else 4000
        expect(key).to.be if val == 'Fred' then 'name' else 'age'
        expect(dict).to.be d2


  describe '#map', ->
    it '''should return a new dictionary composed of the results of calling
      the iterator function on each key/value''', ->
      x = d1.map (val, key) -> ["_#{key}_", 321]
      expect(x).to.be.a TypedDictionary
      expect(x.length).to.be 2
      expect(x.every (v, k) -> (/^_.+_$/).test k).to.be true
      expect(x.every (v, k) -> v == 321).to.be true
      expect(x).not.to.be d1

      x = d2.map (val, key) -> ["=#{key}=", 321]
      expect(x).to.be.a Dictionary
      expect(x.length).to.be 2
      expect(x.every (v, k) -> (/^=.+=$/).test k).to.be true
      expect(x.every (v, k) -> v == 321).to.be true
      expect(x).not.to.be d2

      ###
      Dictionary's iterator can also return an {k:v} object
      ###

      x = d2.map (val, key) ->
        o = {}
        o["=#{key}="] = 321
        o
      expect(x).to.be.a Dictionary
      expect(x.length).to.be 2
      expect(x.every (v, k) -> (/^=.+=$/).test k).to.be true
      expect(x.every (v, k) -> v == 321).to.be true
      expect(x).not.to.be d2


  ###
  describe '#reduce', ->
    it 'should reduce the items in the list to a single value', ->
      d1.set 'zzz', 40
      d2.extend {town: 'bedrock'}

      console.log d1.toLiteral()
      x = d1.reduce 0, (a, b) -> a + b[1]
      expect(x).to.be 83
  ###








