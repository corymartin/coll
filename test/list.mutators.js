// Generated by CoffeeScript 1.3.3
var List, expect;

expect = require('expect.js');

List = require('../lib/coll').List;

describe('List Mutator Methods', function() {
  describe('#add', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List();
    });
    it('should add a single item to the end of the list', function() {
      ls.add('a');
      expect(ls[0]).to.be('a');
      ls.add('b');
      return expect(ls[1]).to.be('b');
    });
    it('should increment the instance length property', function() {
      ls.add('a');
      expect(ls.length).to.be(1);
      ls.add('b');
      return expect(ls.length).to.be(2);
    });
    it('should do nothing if no item is passed', function() {
      ls.add();
      return expect(ls.length).to.be(0);
    });
    it('should return the instance for chaining', function() {
      ls = List();
      return expect(ls.add(1)).to.be(ls);
    });
    return it('should add one or more items to the end of the list', function() {
      ls = List();
      ls.add('a', 'b', 'c');
      expect(ls.length).to.be(3);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('b');
      return expect(ls[2]).to.be('c');
    });
  });
  describe('#addRange', function() {
    it('should add one or more items to the end of the list', function() {
      var ls;
      ls = List();
      ls.addRange([1, 2]);
      expect(ls[0]).to.be(1);
      return expect(ls[1]).to.be(2);
    });
    it('should increment the length property', function() {
      var ls;
      ls = List();
      ls.addRange([1, 2]);
      return expect(ls.length).to.be(2);
    });
    it('should accept an "iterable" as it\'s parameter', function() {
      var foo, ls;
      ls = List();
      ls.addRange([1, 2]);
      expect(ls.length).to.be(2);
      ls = List();
      ls.addRange('as');
      expect(ls.length).to.be(2);
      ls = List();
      ls.addRange(List('as'));
      expect(ls.length).to.be(2);
      ls = List();
      foo = function() {
        ls.addRange(arguments);
        return expect(ls.length).to.be(2);
      };
      return foo('a', 'b');
    });
    it('should do nothing if no item is passed', function() {
      var ls;
      ls = List();
      ls.addRange();
      return expect(ls.length).to.be(0);
    });
    return it('should return the instance for chaining', function() {
      var ls;
      ls = List();
      return expect(ls.addRange([1, 2])).to.be(ls);
    });
  });
  describe('#insert', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('aaaa');
    });
    it('should insert an item at the given index', function() {
      ls.insert(1, 'b');
      expect(ls.length).to.be(5);
      return expect(ls[1]).to.be('b');
    });
    it('should do nothing if no item is passed', function() {
      ls.insert(2);
      return expect(ls.length).to.be(4);
    });
    it('should throw a `RangeError` if the index is not in the list', function() {
      expect(function() {
        return ls.insert(99, 'b');
      }).to.throwError(function(e) {
        return expect(e).to.be.a(RangeError);
      });
      return expect(function() {
        return ls.insert(-99, 'b');
      }).to.throwError(function(e) {
        return expect(e).to.be.a(RangeError);
      });
    });
    return it('should return the instance for chaining', function() {
      return expect(ls.insert(2, 'b')).to.be(ls);
    });
  });
  describe('#insertRange', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('aaaa');
    });
    it('should insert a range of items at the given index', function() {
      ls.insertRange(1, ['b', 'b']);
      expect(ls.length).to.be(6);
      expect(ls[1]).to.be('b');
      return expect(ls[2]).to.be('b');
    });
    it('should do nothing if no items are passed', function() {
      ls.insertRange(2);
      return expect(ls.length).to.be(4);
    });
    it('should throw a `RangeError` if the index is not in the list', function() {
      expect(function() {
        return ls.insertRange(99, ['b']);
      }).to.throwError(function(e) {
        return expect(e).to.be.a(RangeError);
      });
      return expect(function() {
        return ls.insertRange(-99, ['b']);
      }).to.throwError(function(e) {
        return expect(e).to.be.a(RangeError);
      });
    });
    it('should accept an "iterable" as it\'s items parameter', function() {
      var foo;
      ls = List([1, 1]);
      ls.insertRange(1, [2, 2]);
      expect(ls.length).to.be(4);
      expect(ls[0]).to.be(1);
      expect(ls[1]).to.be(2);
      expect(ls[2]).to.be(2);
      expect(ls[3]).to.be(1);
      ls = List('aa');
      ls.insertRange(1, 'bb');
      expect(ls.length).to.be(4);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('b');
      expect(ls[2]).to.be('b');
      expect(ls[3]).to.be('a');
      ls = List('aa');
      ls.insertRange(1, List('bb'));
      expect(ls.length).to.be(4);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('b');
      expect(ls[2]).to.be('b');
      expect(ls[3]).to.be('a');
      ls = List('aa');
      foo = function() {
        ls.insertRange(1, arguments);
        expect(ls.length).to.be(4);
        expect(ls[0]).to.be('a');
        expect(ls[1]).to.be('b');
        expect(ls[2]).to.be('b');
        return expect(ls[3]).to.be('a');
      };
      return foo('b', 'b');
    });
    return it('should return the instance for chaining', function() {
      return expect(ls.insertRange(2, 'bb')).to.be(ls);
    });
  });
  describe('#clear', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('asdf');
    });
    it('should remove all items from this instance', function() {
      ls.clear();
      expect(ls.length).to.be(0);
      return expect(ls[0]).to.be(void 0);
    });
    return it('should return the instance for chaining', function() {
      var x;
      x = ls.clear();
      return expect(x).to.be(ls);
    });
  });
  describe('#set', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('aaa');
    });
    it('should set a new value for the item at the given index', function() {
      ls.set(1, 'b');
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('b');
      return expect(ls[2]).to.be('a');
    });
    it('should throw a `RangeError` if the passed index is not in the list', function() {
      return expect(function() {
        return ls.set(99, 'b');
      }).to.throwError(function(e) {
        return expect(e).to.be.a(RangeError);
      });
    });
    it('should return the instance for chaining', function() {
      var x;
      x = ls.set(1, 'b');
      return expect(x).to.be(ls);
    });
    return it('should do nothing if no item is passed', function() {
      ls.set(1);
      return expect(ls.every(function(v) {
        return v === 'a';
      })).to.be(true);
    });
  });
  describe('#removeAt', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('ababa');
    });
    it('should remove the item at the passed index', function() {
      ls.removeAt(1);
      expect(ls.length).to.be(4);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('a');
      expect(ls[2]).to.be('b');
      return expect(ls[3]).to.be('a');
    });
    it('should remove a range of items if the `howMany` parameter is passed', function() {
      ls = List('abcdef');
      ls.removeAt(2, 3);
      expect(ls.length).to.be(3);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('b');
      return expect(ls[2]).to.be('f');
    });
    it('should return the item removed from the list', function() {
      var x;
      x = ls.removeAt(1);
      return expect(x).to.eql('b');
    });
    it('should return a list of removed items if there is more than one', function() {
      var x;
      x = ls.removeAt(1, 2);
      expect(x).to.be.a(List);
      expect(x.length).to.be(2);
      expect(x[0]).to.be('b');
      return expect(x[1]).to.be('a');
    });
    it('should use an offset from the end of the list if index is negative', function() {
      var x;
      x = ls.removeAt(-2);
      expect(x).to.be('b');
      expect(ls.length).to.be(4);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('b');
      expect(ls[2]).to.be('a');
      return expect(ls[3]).to.be('a');
    });
    return it('should throw a `RangeError` if the index is not in the list', function() {
      expect(function() {
        return ls.removeAt(9);
      }).to.throwError(function(e) {
        return expect(e).to.be.a(RangeError);
      });
      expect(function() {
        return ls.removeAt(-9);
      }).to.throwError(function(e) {
        return expect(e).to.be.a(RangeError);
      });
      ls = List();
      return expect(function() {
        return ls.removeAt(0);
      }).to.throwError(function(e) {
        return expect(e).to.be.a(RangeError);
      });
    });
  });
  describe('#remove', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('ababa');
    });
    it('should remove the first occurence of the passed item from the list', function() {
      ls.remove('b');
      expect(ls.length).to.be(4);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('a');
      expect(ls[2]).to.be('b');
      expect(ls[3]).to.be('a');
      ls.remove('a');
      expect(ls.length).to.be(3);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('b');
      return expect(ls[2]).to.be('a');
    });
    it('should return the removed item', function() {
      var x;
      x = ls.remove('b');
      return expect(x).to.be('b');
    });
    it('should return `undefined` if the item was was not removed', function() {
      var x;
      x = ls.remove('z');
      return expect(x).to.be(void 0);
    });
    return it('should return `undefined` if the list is empty', function() {
      var x;
      ls = List();
      x = ls.remove('a');
      return expect(x).to.be(void 0);
    });
  });
  describe('#removeIf', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('ababa');
    });
    it('should remove the first item to pass the iterator test', function() {
      ls.removeIf(function(val) {
        return val === 'b';
      });
      expect(ls.length).to.be(4);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('a');
      expect(ls[2]).to.be('b');
      expect(ls[3]).to.be('a');
      ls.removeIf(function(val) {
        return val === 'a';
      });
      expect(ls.length).to.be(3);
      expect(ls[0]).to.be('a');
      expect(ls[1]).to.be('b');
      return expect(ls[2]).to.be('a');
    });
    it('should return the item removed', function() {
      var x;
      x = ls.removeIf(function(val) {
        return val === 'b';
      });
      return expect(x).to.be('b');
    });
    it('should return `undefined` if the item was was not removed', function() {
      var x;
      x = ls.removeIf(function(val) {
        return val === 'z';
      });
      return expect(x).to.be(void 0);
    });
    it('should return `undefined` if the list is empty', function() {
      var x;
      ls = List();
      x = ls.removeIf(function(val) {
        return val === 'a';
      });
      return expect(x).to.be(void 0);
    });
    it('should pass 3 values to the iterator function:\ncurrent value, index, the list', function() {
      var i;
      i = 0;
      return ls.removeIf(function(v) {
        expect(arguments.length).to.be(3);
        expect(arguments[0]).to.be(ls[i]);
        expect(arguments[1]).to.be(i);
        expect(arguments[2]).to.be(ls);
        return i++;
      });
    });
    return it('should accept a context object for the callback as an optional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return ls.removeIf(obj, function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      });
    });
  });
  describe('#removeAll', function() {
    var l1, l2;
    l1 = l2 = null;
    beforeEach(function() {
      l1 = List('ababa');
      return l2 = List(['a', NaN, null, 0, false, 'fish', void 0, 5, NaN, 'bar']);
    });
    it('should remove every item from the list that passes the iterator test', function() {
      l1.removeAll(function(val) {
        return val === 'a';
      });
      expect(l1.length).to.be(2);
      expect(l1[0]).to.be('b');
      expect(l1[1]).to.be('b');
      l2.removeAll(function(val) {
        return !val;
      });
      expect(l2.length).to.be(4);
      expect(l2[0]).to.be('a');
      expect(l2[1]).to.be('fish');
      expect(l2[2]).to.be(5);
      return expect(l2[3]).to.be('bar');
    });
    it('should return a list of the items removed from the list', function() {
      var x;
      x = l1.removeAll(function(val) {
        return val === 'b';
      });
      expect(x).to.be.a(List);
      expect(x.length).to.be(2);
      expect(x[0]).to.be('b');
      expect(x[1]).to.be('b');
      x = l2.removeAll(function(val) {
        return !val;
      });
      expect(x).to.be.a(List);
      expect(x.length).to.be(6);
      expect(x[0]).not.to.be(x[0]);
      expect(x[1]).to.be(null);
      expect(x[2]).to.be(0);
      expect(x[3]).to.be(false);
      expect(x[4]).to.be(void 0);
      return expect(x[5]).not.to.be(x[5]);
    });
    it('should return an empty List if no items are removed', function() {
      var x;
      x = l1.removeAll(function(val) {
        return val === 'z';
      });
      expect(x).to.be.a(List);
      return expect(x.length).to.be(0);
    });
    it('should return `[]` if the list is empty', function() {
      var ls, x;
      ls = List();
      x = ls.removeAll(function(val) {
        return val === 'a';
      });
      expect(x).to.be.a(List);
      return expect(x.length).to.be(0);
    });
    it('should accept a context object for the callback as an optional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return l1.removeAll(obj, function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      });
    });
    return it('should pass 3 parameters to the callback test: current value, index, the list', function() {
      var ls;
      ls = List(['foo']);
      return ls.removeAll(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        expect(list).to.be(ls);
        return true;
      });
    });
  });
  describe('#removeFirst', function() {
    it('should remove the first item from the list', function() {
      var ls, x;
      ls = List('abc');
      x = ls.removeFirst();
      expect(x).to.be('a');
      expect(ls.length).to.be(2);
      expect(ls[0]).to.be('b');
      return expect(ls[1]).to.be('c');
    });
    return it('should return `undefined` on an empty list', function() {
      var ls, x;
      ls = List();
      x = ls.removeFirst();
      return expect(x).to.be(void 0);
    });
  });
  return describe('#removeLast', function() {
    it('should remove the last item from the list', function() {
      var ls, x;
      ls = List('abc');
      x = ls.removeLast();
      expect(x).to.be('c');
      expect(ls.length).to.be(2);
      expect(ls[0]).to.be('a');
      return expect(ls[1]).to.be('b');
    });
    return it('should return `undefined` on an empty list', function() {
      var ls, x;
      ls = List();
      x = ls.removeLast();
      return expect(x).to.be(void 0);
    });
  });
});
