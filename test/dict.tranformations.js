// Generated by CoffeeScript 1.3.3
var Dict, Map, expect, _ref;

expect = require('expect.js');

_ref = require('../lib/coll'), Map = _ref.Map, Dict = _ref.Dict;

describe('Dict / Map Transformation Methods', function() {
  var dict, map;
  map = dict = null;
  beforeEach(function() {
    map = Map();
    map.set('foo', 10);
    map.set('bar', 33);
    return dict = Dict({
      name: 'Fred',
      age: 4000
    });
  });
  describe('#filter', function() {
    it('should return a new dictionary of key/vals that pass the iterator test', function() {
      var x;
      map.set('zzz', 25);
      x = map.filter(function(val, key) {
        return val > 20;
      });
      expect(x).to.be.a(Map);
      expect(x.length).to.be(2);
      expect(x.some(function(v, k) {
        return v === 25 && k === 'zzz';
      })).to.be(true);
      expect(x.some(function(v, k) {
        return v === 33 && k === 'bar';
      })).to.be(true);
      expect(x).not.to.be(map);
      expect(map.length).to.be(3);
      dict.add({
        stuff: 1000,
        how: /do/
      });
      x = dict.filter(function(val, key) {
        return typeof val === 'number';
      });
      expect(x).to.be.a(Dict);
      expect(x.length).to.be(2);
      expect(x.some(function(v, k) {
        return v === 1000 && k === 'stuff';
      })).to.be(true);
      expect(x.some(function(v, k) {
        return v === 4000 && k === 'age';
      })).to.be(true);
      expect(x).not.to.be(dict);
      return expect(dict.length).to.be(4);
    });
    it('should pass 3 params to callback: val, key, dict', function() {
      map.filter(function(val, key, dict) {
        expect(val).to.be(key === 'foo' ? 10 : 33);
        expect(key).to.be(val === 10 ? 'foo' : 'bar');
        return expect(dict).to.be(map);
      });
      return dict.filter(function(val, key, dict) {
        expect(val).to.be(key === 'name' ? 'Fred' : 4000);
        expect(key).to.be(val === 'Fred' ? 'name' : 'age');
        return expect(dict).to.be(dict);
      });
    });
    return it('should accept an optional context argument', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      map.filter(obj, function(val, key) {
        return expect(this).to.be(obj);
      });
      return dict.filter(obj, function(val, key) {
        return expect(this).to.be(obj);
      });
    });
  });
  describe('#clone', function() {
    return it('should return a new copy of the key/val object', function() {
      var copy;
      copy = map.clone();
      expect(copy).to.be.a(Map);
      expect(copy).not.to.be(map);
      expect(copy.length).to.be(map.length);
      expect(copy.get('foo')).to.be(10);
      expect(copy.get('bar')).to.be(33);
      copy = dict.clone();
      expect(copy).to.be.a(Dict);
      expect(copy).not.to.be(dict);
      expect(copy.length).to.be(dict.length);
      expect(copy.get('name')).to.be('Fred');
      return expect(copy.get('age')).to.be(4000);
    });
  });
  describe('#clear', function() {
    it('should remove all key/val pairs from the instance', function() {
      map.clear();
      expect(map.length).to.be(0);
      expect(map.keys.length).to.be(0);
      expect(map.values.length).to.be(0);
      dict.clear();
      expect(dict.length).to.be(0);
      expect(dict.keys.length).to.be(0);
      return expect(dict.values.length).to.be(0);
    });
    return it('should return `this`', function() {
      var x;
      x = map.clear();
      expect(x).to.be(map);
      x = dict.clear();
      return expect(x).to.be(dict);
    });
  });
  describe('#toLiteral', function() {
    it('should return an object literal of the key/val pairs', function() {
      var lit;
      lit = map.toLiteral();
      expect(lit).to.eql({
        foo: 10,
        bar: 33
      });
      lit = dict.toLiteral();
      return expect(lit).to.eql({
        name: 'Fred',
        age: 4000
      });
    });
    return it('should accept an optional serializer function to convert keys', function() {
      var key1, key2, lit, map2;
      map = Map();
      key1 = {
        position: 'rb',
        team: 'vikings'
      };
      key2 = {
        position: 'wr',
        team: 'cardinals'
      };
      map.set(key1, 'peterson');
      map.set(key2, 'fitz');
      lit = map.toLiteral(function(key, val) {
        return key.team + ':' + key.position;
      });
      expect(lit).to.eql({
        'vikings:rb': 'peterson',
        'cardinals:wr': 'fitz'
      });
      map2 = Map();
      map.set('foo', 'bar');
      return map2.toLiteral(function(key, val) {
        expect(key).to.be('foo');
        expect(val).to.be('bar');
        return key;
      });
    });
  });
  return describe('#toArray', function() {
    return it('should return an array of the key/val pairs as [key, val]', function() {
      var arr;
      arr = map.toArray();
      expect(arr.some(function(pair) {
        return pair[0] === 'foo' && pair[1] === 10;
      })).to.be(true);
      expect(arr.some(function(pair) {
        return pair[0] === 'bar' && pair[1] === 33;
      })).to.be(true);
      arr = dict.toArray();
      expect(arr.some(function(pair) {
        return pair[0] === 'name' && pair[1] === 'Fred';
      })).to.be(true);
      return expect(arr.some(function(pair) {
        return pair[0] === 'age' && pair[1] === 4000;
      })).to.be(true);
    });
  });
});
