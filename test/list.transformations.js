// Generated by CoffeeScript 1.3.3
var List, expect;

expect = require('expect.js');

List = require('../lib/coll').List;

describe('List Transformation Methods', function() {
  describe('#filter', function() {
    var l1;
    l1 = null;
    beforeEach(function() {
      return l1 = List([1, 2, 3, 4]);
    });
    it('should return a new list containing only the elements that pass the iterator test', function() {
      var evens;
      evens = l1.filter(function(v) {
        return v % 2 === 0;
      });
      expect(evens.length).to.be(2);
      expect(evens[0]).to.be(2);
      return expect(evens[1]).to.be(4);
    });
    it('should not modify the instance list', function() {
      l1.filter(function(v) {
        return v % 2 === 0;
      });
      expect(l1.length).to.be(4);
      expect(l1[0]).to.be(1);
      return expect(l1[1]).to.be(2);
    });
    it('should accept a context object for the callback as an optional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return l1.filter(obj, function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      });
    });
    return it('should pass 3 parameters to the callback test: current value, index, the list', function() {
      var ls;
      ls = List(['foo']);
      return ls.filter(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        return expect(list).to.be(ls);
      });
    });
  });
  describe('#reject', function() {
    var l1;
    l1 = null;
    beforeEach(function() {
      return l1 = List([1, 2, 3, 4]);
    });
    it('should return a new list containing only the elements that fail the iterator test', function() {
      var evens;
      evens = l1.reject(function(v) {
        return v % 2 === 0;
      });
      expect(evens.length).to.be(2);
      expect(evens[0]).to.be(1);
      return expect(evens[1]).to.be(3);
    });
    it('should not modify the instance list', function() {
      l1.reject(function(v) {
        return v % 2 === 0;
      });
      expect(l1.length).to.be(4);
      expect(l1[0]).to.be(1);
      return expect(l1[1]).to.be(2);
    });
    it('should accept a context object for the callback as an\noptional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return l1.reject(obj, function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      });
    });
    return it('should pass 3 parameters to the callback test:\ncurrent value, index, the list', function() {
      var ls;
      ls = List(['foo']);
      return ls.reject(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        return expect(list).to.be(ls);
      });
    });
  });
  describe('#map', function() {
    var l1;
    l1 = null;
    beforeEach(function() {
      return l1 = List([1, 2, 3, 4]);
    });
    it('should return a new list composed of the results returned\nby the iterator', function() {
      var x;
      x = l1.map(function(v) {
        return v * 10;
      });
      expect(x[0]).to.be(10);
      expect(x[1]).to.be(20);
      expect(x[2]).to.be(30);
      return expect(x[3]).to.be(40);
    });
    it('should not modify the instance list', function() {
      var x;
      x = l1.map(function(v) {
        return v * 10;
      });
      expect(l1[0]).to.be(1);
      expect(l1[1]).to.be(2);
      expect(l1[2]).to.be(3);
      return expect(l1[3]).to.be(4);
    });
    it('should accept a context object for the callback as an\noptional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return l1.map(obj, function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return v;
      });
    });
    return it('should pass 3 parameters to the callback test:\ncurrent value, index, the list', function() {
      var ls;
      ls = List(['foo']);
      return ls.map(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        expect(list).to.be(ls);
        return val;
      });
    });
  });
  describe('#intersperse', function() {
    var l1, l2;
    l1 = l2 = null;
    beforeEach(function() {
      l1 = List([1, 2, 3]);
      return l2 = List(['a', new Date, [1, 2], true]);
    });
    it('should return a new list with the passed item inserted between\nevery item in the original list', function() {
      var regex, x;
      x = l1.intersperse(0);
      expect(x).to.be.a(List);
      expect(x.length).to.be(5);
      expect(x[0]).to.be(1);
      expect(x[1]).to.be(0);
      expect(x[2]).to.be(2);
      expect(x[3]).to.be(0);
      expect(x[4]).to.be(3);
      regex = /foo/;
      x = l2.intersperse(regex);
      expect(x).to.be.a(List);
      expect(x.length).to.be(7);
      expect(x[0]).to.be('a');
      expect(x[1]).to.be(regex);
      expect(x[2]).to.be.a(Date);
      expect(x[3]).to.be(regex);
      expect(x[4]).to.eql([1, 2]);
      expect(x[5]).to.be(regex);
      return expect(x[6]).to.be(true);
    });
    return it('should not modify the instance list', function() {
      l1.intersperse(0);
      l2.intersperse('-');
      expect(l1.length).to.be(3);
      return expect(l2.length).to.be(4);
    });
  });
  return describe('#sort', function() {
    it('should sort numbers numerically', function() {
      var ls, x;
      ls = List([33, 4, 77, 5, 2, 8]);
      x = ls.sort();
      expect(x).to.be.a(List);
      expect(x[0]).to.be(2);
      expect(x[1]).to.be(4);
      expect(x[2]).to.be(5);
      expect(x[3]).to.be(8);
      expect(x[4]).to.be(33);
      expect(x[5]).to.be(77);
      ls = List([1, 2, 3, 2, 4, 5, 2, 6, 7, 8, 9]);
      x = ls.sort();
      expect(x).to.be.a(List);
      expect(x[0]).to.be(1);
      expect(x[1]).to.be(2);
      expect(x[2]).to.be(2);
      expect(x[3]).to.be(2);
      expect(x[4]).to.be(3);
      expect(x[5]).to.be(4);
      expect(x[6]).to.be(5);
      expect(x[7]).to.be(6);
      expect(x[8]).to.be(7);
      expect(x[9]).to.be(8);
      expect(x[10]).to.be(9);
      ls = List([2.0001, 33.0001, 4.0001, 77.0001, 8.0001]);
      x = ls.sort();
      expect(x).to.be.a(List);
      expect(x[0]).to.be(2.0001);
      expect(x[1]).to.be(4.0001);
      expect(x[2]).to.be(8.0001);
      expect(x[3]).to.be(33.0001);
      expect(x[4]).to.be(77.0001);
      ls = List([new Number(5), new Number(2), new Number(7), new Number(3)]);
      x = ls.sort();
      expect(x).to.be.a(List);
      expect(x[0].toString()).to.be('2');
      expect(x[1].toString()).to.be('3');
      expect(x[2].toString()).to.be('5');
      return expect(x[3].toString()).to.be('7');
    });
    it('should sort Dates chronologically', function() {
      var a, b, c, d, ls, x;
      a = new Date('4/5/2012');
      b = new Date('12/9/2011');
      c = new Date('4/4/2012');
      d = new Date('1/26/2012');
      ls = List([a, b, c, d]);
      x = ls.sort();
      expect(x).to.be.a(List);
      expect(x[0]).to.be(b);
      expect(x[1]).to.be(d);
      expect(x[2]).to.be(c);
      expect(x[3]).to.be(a);
      ls = List([a, b, c, d]);
      x = ls.sort();
      expect(x).to.be.a(List);
      expect(x[0]).to.be(b);
      expect(x[1]).to.be(d);
      expect(x[2]).to.be(c);
      return expect(x[3]).to.be(a);
    });
    it('should use Array#sort lexicographic order for other types', function() {
      var a, b, c, d, ls, x;
      a = /mmm/;
      b = /zzz/;
      c = /aaa/;
      d = /vvv/;
      ls = List([a, b, c, d]);
      x = ls.sort();
      expect(x).to.be.a(List);
      expect(x[0]).to.be(c);
      expect(x[1]).to.be(a);
      expect(x[2]).to.be(d);
      expect(x[3]).to.be(b);
      ls = List([true, false]);
      x = ls.sort();
      expect(x).to.be.a(List);
      expect(x[0]).to.be(false);
      return expect(x[1]).to.be(true);
    });
    return it('should not modify the instance list', function() {
      var ls1;
      ls1 = List([2, 33, 4, 77, 8]);
      expect(ls1.sort()).not.to.be(ls1);
      expect(ls1.length).to.be(5);
      expect(ls1[0]).to.be(2);
      expect(ls1[1]).to.be(33);
      expect(ls1[2]).to.be(4);
      expect(ls1[3]).to.be(77);
      expect(ls1[4]).to.be(8);
      expect(ls1.sort(function(a, b) {
        return a < b;
      })).not.to.be(ls1);
      expect(ls1.length).to.be(5);
      expect(ls1[0]).to.be(2);
      expect(ls1[1]).to.be(33);
      expect(ls1[2]).to.be(4);
      expect(ls1[3]).to.be(77);
      return expect(ls1[4]).to.be(8);
    });
  });
});
