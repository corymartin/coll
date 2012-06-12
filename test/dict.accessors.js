// Generated by CoffeeScript 1.3.3
var Dictionary, TypedDictionary, expect, _ref;

expect = require('expect.js');

_ref = require('../lib/coll'), TypedDictionary = _ref.TypedDictionary, Dictionary = _ref.Dictionary;

describe('Dictionary Accessor Methods', function() {
  var d1, d2;
  d1 = d2 = null;
  beforeEach(function() {
    d1 = TypedDictionary();
    d1.set('foo', 10);
    d1.set('bar', 33);
    return d2 = Dictionary({
      name: 'Fred',
      age: 4000
    });
  });
  describe('#get', function() {
    return it('should get the value for the given key', function() {
      expect(d1.get('foo')).to.be(10);
      expect(d1.get('bar')).to.be(33);
      expect(d2.get('name')).to.be('Fred');
      return expect(d2.get('age')).to.be(4000);
    });
  });
  describe('#set', function() {
    it('should add a new key/value pair to the dictionary', function() {
      d1.set('zzz', 21);
      expect(d1.length).to.be(3);
      expect(d1.get('zzz')).to.be(21);
      d2.set('kid', 'bambam');
      expect(d2.length).to.be(3);
      return expect(d2.get('kid')).to.be('bambam');
    });
    return it('should change the value of an existing key', function() {
      d1.set('foo', 99);
      expect(d1.length).to.be(2);
      expect(d1.get('foo')).to.be(99);
      d2.set('name', 'Barney');
      expect(d2.length).to.be(2);
      return expect(d2.get('name')).to.be('Barney');
    });
  });
  return describe('TypedDictionary#set', function() {
    return it('should be able to use objects as keys', function() {
      var Foo, d, f1, f2, f3;
      Foo = (function() {

        function Foo() {}

        return Foo;

      })();
      f1 = new Foo;
      f2 = new Foo;
      f3 = new Foo;
      d = TypedDictionary(Foo, 'String');
      d.set(f1, 'aaa');
      d.set(f2, 'bbb');
      d.set(f3, 'ccc');
      expect(d.get(f1)).to.be('aaa');
      expect(d.get(f2)).to.be('bbb');
      return expect(d.get(f3)).to.be('ccc');
    });
  });
});
