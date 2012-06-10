// Generated by CoffeeScript 1.3.3
var List, expect;

expect = require('expect.js');

List = require('../lib/coll').List;

describe('List Iteration Methods', function() {
  describe('reduction functions', function() {
    var ls0items, ls1items, ls3items;
    ls0items = ls1items = ls3items = null;
    beforeEach(function() {
      ls0items = List();
      ls1items = List(['a']);
      return ls3items = List(['a', 'b', 'c']);
    });
    describe('#reduce', function() {
      it('accumulates each value in the list (L to R) applying a function to them, resulting in a single value', function() {
        var result;
        result = ls3items.reduce(function(a, b) {
          return a + b;
        });
        return expect(result).to.be('abc');
      });
      it('returns the only item in the list if there is only one item in the list', function() {
        var result;
        result = ls1items.reduce(function(a, b) {
          return a + b;
        });
        return expect(result).to.be('a');
      });
      it('throws an error if there are no items in the list (no init val passed)', function() {
        return expect(function() {
          return ls0items.reduce(function(a, b) {
            return a + b;
          });
        }).to.throwError(/Reduce of empty List with no initial value/);
      });
      it('does not throw an error on an empty list if an initial value is passed', function() {
        return expect(function() {
          return ls0items.reduce('a', function(a, b) {
            return a + b;
          });
        }).not.to.throwError();
      });
      it('takes an initial value as a parameter', function() {
        var result;
        result = ls3items.reduce('z', function(a, b) {
          return a + b;
        });
        expect(result).to.be('zabc');
        result = ls1items.reduce('z', function(a, b) {
          return a + b;
        });
        return expect(result).to.be('za');
      });
      it('returns the initial value parameter if that is passed and the list is empty', function() {
        var result;
        result = ls0items.reduce('z', function(a, b) {
          return a + b;
        });
        return expect(result).to.be('z');
      });
      return it('should pass 4 parameters to the callback: accumulator, current value, index, the list', function() {
        var ls;
        ls = List(['foo']);
        return ls.reduce(function(acc, val, index, list) {
          expect(acc).to.be('foo');
          expect(val).to.be('foo');
          expect(index).to.be(0);
          return expect(list).to.be(ls);
        });
      });
    });
    return describe('#reduceRight', function() {
      it('accumulates each value in the list (R to L) applying a function to them, resulting in a single value', function() {
        var result;
        result = ls3items.reduceRight(function(a, b) {
          return a + b;
        });
        return expect(result).to.be('cba');
      });
      it('returns the only item in the list if there is only one item in the list', function() {
        var result;
        result = ls1items.reduceRight(function(a, b) {
          return a + b;
        });
        return expect(result).to.be('a');
      });
      it('throws an error if there are no items in the list (no init val passed)', function() {
        return expect(function() {
          return ls0items.reduceRight(function(a, b) {
            return a + b;
          });
        }).to.throwError(/Reduce of empty List with no initial value/);
      });
      it('does not throw an error on an empty list if an initial value is passed', function() {
        return expect(function() {
          return ls0items.reduceRight('a', function(a, b) {
            return a + b;
          });
        }).not.to.throwError();
      });
      it('takes an initial value as a parameter', function() {
        var result;
        result = ls3items.reduceRight('z', function(a, b) {
          return a + b;
        });
        expect(result).to.be('zcba');
        result = ls1items.reduceRight('z', function(a, b) {
          return a + b;
        });
        return expect(result).to.be('za');
      });
      it('returns the initial value parameter if that is passed and the list is empty', function() {
        var result;
        result = ls0items.reduceRight('z', function(a, b) {
          return a + b;
        });
        return expect(result).to.be('z');
      });
      return it('should pass 4 parameters to the callback: accumulator, current value, index, the list', function() {
        var ls;
        ls = List(['foo']);
        return ls.reduceRight(function(acc, val, index, list) {
          expect(acc).to.be('foo');
          expect(val).to.be('foo');
          expect(index).to.be(0);
          return expect(list).to.be(ls);
        });
      });
    });
  });
  describe('#forEach', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List(['a', 'b', 'c', 'd']);
    });
    it('should iterate once for each item in list', function() {
      var cnt;
      cnt = 0;
      ls.forEach(function() {
        return cnt++;
      });
      return expect(cnt).to.be(4);
    });
    it('should pass 3 values to the iterator function: current value, index, the list', function() {
      var i;
      i = 0;
      return ls.forEach(function() {
        expect(arguments.length).to.be(3);
        expect(arguments[0]).to.be(ls[i]);
        expect(arguments[1]).to.be(i);
        expect(arguments[2]).to.be(ls);
        return i++;
      });
    });
    it('takes an optional context argument as a second parameter', function() {
      return ls.forEach({
        foo: 'bar'
      }, function() {
        return expect(this.foo).to.be('bar');
      });
    });
    return it('should return the instance for chaining', function() {
      var retval;
      retval = ls.forEach(function() {});
      return expect(retval).to.be(ls);
    });
  });
  describe('#every', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List([2, 4, 6, 8]);
    });
    it('should return true if every item in the list passes the iterator test', function() {
      var result;
      result = ls.every(function(val) {
        return val % 2 === 0;
      });
      return expect(result).to.be(true);
    });
    it('should return false if every item in the list does not pass the iterator test', function() {
      var result;
      ls.insert(2, 7);
      result = ls.every(function(val) {
        return val % 2 === 0;
      });
      return expect(result).to.be(false);
    });
    it('should accept a context object for the callback as an optional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return ls.every(obj, function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      });
    });
    it('should pass 3 parameters to the callback test: current value, index, the list', function() {
      ls = List(['foo']);
      return ls.every(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        expect(list).to.be(ls);
        return true;
      });
    });
    return it('should stop iterating through the list after the iterator test returns false', function() {
      var cnt;
      ls.insert(2, 7);
      cnt = 0;
      ls.every(function(val) {
        ++cnt;
        return val % 2 === 0;
      });
      return expect(cnt).to.be(3);
    });
  });
  describe('#some', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List([2, 4, 6, 8]);
    });
    it('should return true if at least one item in the list passes the iterator test', function() {
      var result;
      result = ls.some(function(val) {
        return val % 2 === 0;
      });
      return expect(result).to.be(true);
    });
    it('should return false if none of the items in the list pass the iterator test', function() {
      var result;
      result = ls.every(function(val) {
        return val % 2 !== 0;
      });
      return expect(result).to.be(false);
    });
    it('should accept a context object for the callback as an optional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return ls.some(obj, function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      });
    });
    it('should pass 3 parameters to the callback test: current value, index, the list', function() {
      ls = List(['foo']);
      return ls.some(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        expect(list).to.be(ls);
        return true;
      });
    });
    return it('should stop iterating through the list after the iterator test returns true', function() {
      var cnt;
      ls.insert(2, 7);
      cnt = 0;
      ls.some(function(val) {
        ++cnt;
        return val % 2 !== 0;
      });
      return expect(cnt).to.be(3);
    });
  });
  describe('#find', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('aababa');
    });
    it('should return the first item to pass the iterator test', function() {
      var result;
      result = ls.find(function(val) {
        return val === 'b';
      });
      return expect(result).to.be('b');
    });
    it('should return `undefined` if no items pass the iterator test', function() {
      var result;
      result = ls.find(function(val) {
        return val === 'z';
      });
      return expect(result).to.be(void 0);
    });
    it('should accept a context object for the callback as an optional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return ls.find((function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      }), obj);
    });
    it('should pass 3 parameters to the callback test: current value, index, the list', function() {
      ls = List(['foo']);
      return ls.find(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        expect(list).to.be(ls);
        return true;
      });
    });
    return it('should stop iterating through the list after the iterator test returns true', function() {
      var cnt, index;
      index = null;
      cnt = 0;
      ls.find(function(val, i) {
        index = i;
        ++cnt;
        return val === 'b';
      });
      expect(index).to.be(2);
      return expect(cnt).to.be(3);
    });
  });
  describe('#findLast', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('aababa');
    });
    it('should return the first item from the end of the list to pass the iterator test', function() {
      var result;
      result = ls.findLast(function(val) {
        return val === 'b';
      });
      return expect(result).to.be('b');
    });
    it('should return `undefined` if no items pass the iterator test', function() {
      var result;
      result = ls.findLast(function(val) {
        return val === 'z';
      });
      return expect(result).to.be(void 0);
    });
    it('should accept a context object for the callback as an optional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return ls.findLast((function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      }), obj);
    });
    it('should pass 3 parameters to the callback test: current value, index, the list', function() {
      ls = List(['foo']);
      return ls.findLast(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        expect(list).to.be(ls);
        return true;
      });
    });
    return it('should stop iterating through the list after the iterator test returns true', function() {
      var cnt, index;
      index = null;
      cnt = 0;
      ls.findLast(function(val, i) {
        index = i;
        ++cnt;
        return val === 'b';
      });
      expect(index).to.be(4);
      return expect(cnt).to.be(2);
    });
  });
  describe('#findAll', function() {
    var ls;
    ls = null;
    beforeEach(function() {
      return ls = List('aababa');
    });
    it('should return a new list of all items to pass the iterator test', function() {
      var result;
      result = ls.findAll(function(val) {
        return val === 'b';
      });
      expect(result).to.be.a(List);
      expect(result.length).to.be(2);
      return expect(result.every(function(v) {
        return v === 'b';
      })).to.be(true);
    });
    it('should return an empty list if no items pass the iterator test', function() {
      var result;
      result = ls.findAll(function(val) {
        return val === 'z';
      });
      return expect(result.length).to.be(0);
    });
    it('should accept a context object for the callback as an optional second parameter', function() {
      var obj;
      obj = {
        foo: 'bar'
      };
      return ls.findAll((function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      }), obj);
    });
    return it('should pass 3 parameters to the callback test: current value, index, the list', function() {
      ls = List(['foo']);
      return ls.findAll(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        expect(list).to.be(ls);
        return true;
      });
    });
  });
  return describe('#partition', function() {
    it('should return an array of two lists, the first composed of items\npassing the iterator test, the second those that failed', function() {
      var fail, ls, p, pass;
      ls = List([1, 2, 3, 4]);
      p = ls.partition(function(val) {
        return val % 2 === 0;
      });
      expect(p).to.be.an(Array);
      expect(p.length).to.be(2);
      pass = p[0];
      fail = p[1];
      expect(pass).to.be.a(List);
      expect(fail).to.be.a(List);
      expect(pass[0]).to.be(2);
      expect(pass[1]).to.be(4);
      expect(fail[0]).to.be(1);
      return expect(fail[1]).to.be(3);
    });
    it('should accept a context object for the callback as\nan optional second parameter', function() {
      var ls, obj;
      ls = List('a');
      obj = {
        foo: 'bar'
      };
      return ls.partition(obj, function(v) {
        expect(this).to.be(obj);
        expect(this.foo).to.be('bar');
        return true;
      });
    });
    return it('should pass 3 parameters to the callback test:\ncurrent value, index, the list', function() {
      var ls;
      ls = List(['foo']);
      return ls.partition(function(val, index, list) {
        expect(val).to.be('foo');
        expect(index).to.be(0);
        expect(list).to.be(ls);
        return true;
      });
    });
  });
});
