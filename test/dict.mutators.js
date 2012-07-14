// Generated by CoffeeScript 1.3.3
var Dict, Map, expect, _ref;

expect = require('expect.js');

_ref = require('../lib/coll').coll, Map = _ref.Map, Dict = _ref.Dict;

describe('Dict / Map Mutators', function() {
  var dict, key1, key2, map;
  map = dict = null;
  key1 = /foo/;
  key2 = /bar/;
  beforeEach(function() {
    map = Map('RegExp', 'Number');
    map.set(key1, 111);
    map.set(key2, 222);
    return dict = Dict({
      a: 1,
      b: 2,
      c: 3
    });
  });
  return describe('#remove', function() {
    it('should remove the key/val for the passed key', function() {
      expect(map.hasKey(key1)).to.be(true);
      map.remove(key1);
      expect(map.hasKey(key1)).to.be(false);
      expect(dict.hasKey('b')).to.be(true);
      dict.remove('b');
      return expect(dict.hasKey('b')).to.be(false);
    });
    it('should the value of the removed key/val pair', function() {
      var x;
      x = map.remove(key1);
      expect(x).to.be(111);
      x = dict.remove('b');
      return expect(x).to.be(2);
    });
    return it('should throw a `ReferenceError` if the key does not exist', function() {
      expect(function() {
        return map.remove(/zzz/);
      }).to.throwError(function(e) {
        return expect(e).to.be.a(ReferenceError);
      });
      return expect(function() {
        return dict.remove('q');
      }).to.throwError(function(e) {
        return expect(e).to.be.a(ReferenceError);
      });
    });
  });
});
