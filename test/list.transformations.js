// Generated by CoffeeScript 1.3.3
var List, expect;

expect = require('expect.js');

List = require('../lib/coll').coll.List;

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
  describe('#sort', function() {
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
    it('should take an optional `comparer` function to determine sorting', function() {
      var asc, desc, ls;
      ls = List([6, 2, 4, 8]);
      desc = ls.sort(function(a, b) {
        return b - a;
      });
      expect(desc.toArray()).to.eql([8, 6, 4, 2]);
      asc = ls.sort(function(a, b) {
        return a - b;
      });
      return expect(asc.toArray()).to.eql([2, 4, 6, 8]);
    });
    it('should take an optional `comparer` string name to determine\nan object\'s property to sort by', function() {
      var ls, o1, o2, o3, o4, o5, x;
      o1 = {
        foo: 34,
        bar: 'erf'
      };
      o2 = {
        foo: 12,
        bar: 'xcv'
      };
      o3 = {
        foo: 45,
        bar: 'bhu'
      };
      o4 = {
        foo: 5,
        bar: 'mer'
      };
      o5 = {
        foo: 26,
        bar: 'aer'
      };
      ls = List([o1, o2, o3, o4, o5]);
      x = ls.sort('foo');
      expect(x[0]).to.be(o4);
      expect(x[1]).to.be(o2);
      expect(x[2]).to.be(o5);
      expect(x[3]).to.be(o1);
      expect(x[4]).to.be(o3);
      x = ls.sort('bar');
      expect(x[0]).to.be(o5);
      expect(x[1]).to.be(o3);
      expect(x[2]).to.be(o1);
      expect(x[3]).to.be(o4);
      return expect(x[4]).to.be(o2);
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
    it('should sort lists of mixed types in the following order:\nnumber literals,\nstring literals,\nboolean literals,\ndate objects,\nnumber objects,\nstring objects,\nboolean objects,\nregexes,\nfunctions,\nobjects,\narrays,\nglobals', function() {
      var arr1, arr2, arr3, arrays, bool1, bool2, bool3, date1, date2, date3, fn1, fn2, fn3, globals, ls, num1, num2, num3, obj1, obj2, obj3, objects, regex1, regex2, regex3, str1, str2, str3, x;
      date1 = new Date('2012-5-5');
      date2 = new Date('2000-9-9');
      date3 = new Date('2008-2-2');
      regex1 = /foo/;
      regex2 = new RegExp('bar');
      regex3 = /abc/;
      obj1 = {
        a: 1
      };
      obj2 = {
        z: 9
      };
      obj3 = {
        b: 5
      };
      fn1 = function foo(){};
      fn2 = function bar(){};
      fn3 = function abc(){};
      str1 = new String('foo');
      str2 = new String('bar');
      str3 = new String('abc');
      num1 = new Number(12);
      num2 = new Number(3);
      num3 = new Number(6);
      bool1 = new Boolean(true);
      bool2 = new Boolean(false);
      bool3 = new Boolean(true);
      arr1 = [2, 4];
      arr2 = ['b', 'a'];
      arr3 = [1, 10];
      ls = new List([9, void 0, 'a', obj1, str1, fn1, NaN, arr1, 8, num1, regex1, 3, Infinity, num2, true, bool1, str2, regex2, 0, obj2, date1, arr2, 1, fn2, false, date2, 'sd', bool2, 5, regex3, obj3, num3, arr3, false, fn3, null, date3, '4', str3, bool3]);
      x = ls.sort();
      expect(x[0]).to.be(0);
      expect(x[1]).to.be(1);
      expect(x[2]).to.be(3);
      expect(x[3]).to.be(5);
      expect(x[4]).to.be(8);
      expect(x[5]).to.be(9);
      expect(x[6]).to.be('4');
      expect(x[7]).to.be('a');
      expect(x[8]).to.be('sd');
      expect(x[9]).to.be(false);
      expect(x[10]).to.be(false);
      expect(x[11]).to.be(true);
      expect(x[12]).to.be(date2);
      expect(x[13]).to.be(date3);
      expect(x[14]).to.be(date1);
      expect(x[15]).to.be(num2);
      expect(x[16]).to.be(num3);
      expect(x[17]).to.be(num1);
      expect(x[18]).to.be(str3);
      expect(x[19]).to.be(str2);
      expect(x[20]).to.be(str1);
      expect(x[21].valueOf()).to.be(false);
      expect(x[22].valueOf()).to.be(true);
      expect(x[23].valueOf()).to.be(true);
      expect(x[24]).to.be(regex3);
      expect(x[25]).to.be(regex2);
      expect(x[26]).to.be(regex1);
      expect(x[27]).to.be(fn3);
      expect(x[28]).to.be(fn2);
      expect(x[29]).to.be(fn1);
      objects = x.slice(30, 33);
      expect(objects).to.contain(obj1);
      expect(objects).to.contain(obj2);
      expect(objects).to.contain(obj3);
      arrays = x.slice(33, 36);
      expect(arrays).to.contain(arr1);
      expect(arrays).to.contain(arr2);
      expect(arrays).to.contain(arr3);
      globals = x.slice(36);
      expect(globals[0]).to.be(Infinity);
      expect(isNaN(globals[1])).to.be(true);
      expect(globals[2]).to.be(null);
      return expect(globals[3]).to.be(void 0);
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
    return it('should return a new list', function() {
      var ls, x;
      ls = List([4, 2, 9]);
      x = ls.sort();
      expect(x).to.be.a(List);
      return expect(x).not.to.be(ls);
    });
  });
  return describe('#reverse', function() {
    return it('should return a new list of the instances items in reverse order', function() {
      var ls, x;
      ls = List([5, 2, 9, 4]);
      x = ls.reverse();
      expect(x).to.be.a(List);
      expect(x).not.to.be(ls);
      expect(x[0]).to.be(4);
      expect(x[1]).to.be(9);
      expect(x[2]).to.be(2);
      return expect(x[3]).to.be(5);
    });
  });
});
