// Generated by CoffeeScript 1.3.1
(function() {
  var List, TypedList, expect, _ref;

  expect = require('expect.js');

  _ref = require('../lib/coll'), TypedList = _ref.TypedList, List = _ref.List;

  describe('TypedList / List Mutator Methods', function() {
    describe('#push', function() {
      it('should add one or more items to the end of the list', function() {
        var ls;
        ls = TypedList('String');
        ls.push('a');
        ls.push('b', 'c');
        expect(ls.length).to.be(3);
        expect(ls[0]).to.be('a');
        expect(ls[1]).to.be('b');
        return expect(ls[2]).to.be('c');
      });
      it('should type check the values it adds', function() {
        var Bar, Foo, lsN, lsO, lsS;
        lsS = TypedList('String');
        expect(function() {
          return lsS.push('a', 'b', 34);
        }).to.throwError(/Expected String/);
        expect(function() {
          return lsS.push('a', 'b', 'a');
        }).not.to.throwError();
        lsN = TypedList('Number');
        expect(function() {
          return lsN.push(1, 'b', 3);
        }).to.throwError(/Expected Number/);
        expect(function() {
          return lsN.push(1, 2, 3);
        }).not.to.throwError();
        Foo = (function() {

          Foo.name = 'Foo';

          function Foo() {}

          return Foo;

        })();
        Bar = (function() {

          Bar.name = 'Bar';

          function Bar() {}

          return Bar;

        })();
        lsO = TypedList(Foo);
        expect(function() {
          return lsO.push(new Foo, 34, new Foo);
        }).to.throwError();
        expect(function() {
          return lsO.push(new Foo, new Bar, new Foo);
        }).to.throwError();
        return expect(function() {
          return lsO.push(new Foo, new Foo, new Foo);
        }).not.to.throwError();
      });
      it('should return the new length of the list', function() {
        var ls;
        ls = TypedList('Number', [2, 4]);
        expect(ls.push(6)).to.be(3);
        return expect(ls.push(8, 10)).to.be(5);
      });
      return it('should not alter list to another type', function() {
        var ls;
        ls = TypedList('Number', [2, 4]);
        ls.push(4, 6);
        expect(ls instanceof TypedList).to.be(true);
        return expect(ls.type === 'Number').to.be(true);
      });
    });
    describe('#unshift', function() {
      it('should add one or more items to the beginning of the list', function() {
        var ls;
        ls = TypedList('String', ['a', 'b', 'c']);
        ls.unshift('d');
        ls.unshift('e', 'f');
        expect(ls.length).to.be(6);
        expect(ls[0]).to.be('e');
        expect(ls[1]).to.be('f');
        expect(ls[2]).to.be('d');
        expect(ls[3]).to.be('a');
        expect(ls[4]).to.be('b');
        return expect(ls[5]).to.be('c');
      });
      it('should type checks the values it adds', function() {
        var Bar, Foo, lsN, lsO, lsS;
        lsS = TypedList('String');
        expect(function() {
          return lsS.unshift('a', 'b', 34);
        }).to.throwError(/Expected String/);
        expect(function() {
          return lsS.unshift('a', 'b', 'a');
        }).not.to.throwError();
        lsN = TypedList('Number');
        expect(function() {
          return lsN.unshift(1, 'b', 3);
        }).to.throwError(/Expected Number/);
        expect(function() {
          return lsN.unshift(1, 2, 3);
        }).not.to.throwError();
        Foo = (function() {

          Foo.name = 'Foo';

          function Foo() {}

          return Foo;

        })();
        Bar = (function() {

          Bar.name = 'Bar';

          function Bar() {}

          return Bar;

        })();
        lsO = TypedList(Foo);
        expect(function() {
          return lsO.unshift(new Foo, 34, new Foo);
        }).to.throwError();
        expect(function() {
          return lsO.unshift(new Foo, new Bar, new Foo);
        }).to.throwError();
        return expect(function() {
          return lsO.unshift(new Foo, new Foo, new Foo);
        }).not.to.throwError();
      });
      it('should return the new length of the list', function() {
        var ls;
        ls = TypedList('Number', [2, 4]);
        expect(ls.unshift(6)).to.be(3);
        return expect(ls.unshift(8, 10)).to.be(5);
      });
      return it('should not alter list to another type', function() {
        var ls;
        ls = TypedList('Number', [2, 4]);
        ls.unshift(4, 6);
        expect(ls instanceof TypedList).to.be(true);
        return expect(ls.type === 'Number').to.be(true);
      });
    });
    describe('#splice', function() {
      var ls1, ls2, ls3;
      ls1 = ls2 = ls3 = null;
      beforeEach(function() {
        ls1 = TypedList('String', ['a', 'b', 'c']);
        ls2 = TypedList('Number', [2, 4, 6, 8]);
        return ls3 = TypedList('String', ['aa', 'bb', 'cc', 'dd', 'ee']);
      });
      it('should add items to the list at specified index', function() {
        ls1.splice(3, 0, 'x', 'y', 'z');
        expect(ls1.length).to.be(6);
        return expect(ls1[3]).to.be('x');
      });
      it('should add items to the list and removes a specified number items', function() {
        ls1.splice(2, 1, 'x', 'y', 'z');
        expect(ls1.length).to.be(5);
        expect(ls1[0]).to.be('a');
        expect(ls1[1]).to.be('b');
        expect(ls1[2]).to.be('x');
        expect(ls1[3]).to.be('y');
        return expect(ls1[4]).to.be('z');
      });
      it('should remove items from the list after a specified index', function() {
        ls2.splice(1);
        expect(ls2.length).to.be(1);
        return expect(ls2[0]).to.be(2);
      });
      it('should remove a specified number of items from the list at a specified index', function() {
        ls2.splice(1, 2);
        expect(ls2.length).to.be(2);
        expect(ls2[0]).to.be(2);
        return expect(ls2[1]).to.be(8);
      });
      it('should not change the list to an array', function() {
        ls1.splice(3, 0, 'x', 'y', 'z');
        return expect(ls1 instanceof TypedList).to.be(true);
      });
      it('should return a list of the elements removed', function() {
        var lsNew, lsNew2, lsNew3;
        lsNew = ls1.splice(1, 2, 'x', 'y', 'z');
        expect(lsNew instanceof TypedList).to.be(true);
        expect(lsNew.length).to.be(2);
        expect(lsNew[0]).to.be('b');
        expect(lsNew[1]).to.be('c');
        lsNew2 = ls2.splice(0, 2);
        expect(lsNew2 instanceof TypedList).to.be(true);
        expect(lsNew2.length).to.be(2);
        expect(lsNew2[0]).to.be(2);
        expect(lsNew2[1]).to.be(4);
        lsNew3 = ls3.splice(2);
        expect(lsNew3 instanceof TypedList).to.be(true);
        expect(lsNew3.length).to.be(3);
        expect(lsNew3[0]).to.be('cc');
        expect(lsNew3[1]).to.be('dd');
        return expect(lsNew3[2]).to.be('ee');
      });
      return it('should check the type of items added to the list', function() {
        expect(function() {
          return ls2.splice(1, 0, 'a');
        }).to.throwError(/Expected Number/);
        expect(function() {
          return ls2.splice(1, 0, 20, 'a');
        }).to.throwError(/Expected Number/);
        return expect(function() {
          return ls2.splice(1, 0, 40, 60);
        }).not.to.throwError();
      });
    });
    describe('#sort', function() {
      it('should sort Numbers numerically', function() {
        var ls, ls2, ls3;
        ls = TypedList('Number', [33, 4, 77, 5, 2, 8]);
        ls.sort();
        expect(ls[0]).to.be(2);
        expect(ls[1]).to.be(4);
        expect(ls[2]).to.be(5);
        expect(ls[3]).to.be(8);
        expect(ls[4]).to.be(33);
        expect(ls[5]).to.be(77);
        ls = TypedList('Number', [1, 2, 3, 2, 4, 5, 2, 6, 7, 8, 9]);
        ls.sort();
        expect(ls[0]).to.be(1);
        expect(ls[1]).to.be(2);
        expect(ls[2]).to.be(2);
        expect(ls[3]).to.be(2);
        expect(ls[4]).to.be(3);
        expect(ls[5]).to.be(4);
        expect(ls[6]).to.be(5);
        expect(ls[7]).to.be(6);
        expect(ls[8]).to.be(7);
        expect(ls[9]).to.be(8);
        expect(ls[10]).to.be(9);
        ls2 = TypedList('Number', [2.0001, 33.0001, 4.0001, 77.0001, 8.0001]);
        ls2.sort();
        expect(ls2[0]).to.be(2.0001);
        expect(ls2[1]).to.be(4.0001);
        expect(ls2[2]).to.be(8.0001);
        expect(ls2[3]).to.be(33.0001);
        expect(ls2[4]).to.be(77.0001);
        ls3 = TypedList(Number, [new Number(5), new Number(2), new Number(7), new Number(3)]);
        ls3.sort();
        expect(ls3[0].toString()).to.be('2');
        expect(ls3[1].toString()).to.be('3');
        expect(ls3[2].toString()).to.be('5');
        return expect(ls3[3].toString()).to.be('7');
      });
      it('should sort Dates chronologically', function() {
        var a, b, c, d, ls, ls2;
        a = new Date('4/5/2012');
        b = new Date('12/9/2011');
        c = new Date('4/4/2012');
        d = new Date('1/26/2012');
        ls = TypedList('Date', [a, b, c, d]);
        ls.sort();
        expect(ls[0]).to.be(b);
        expect(ls[1]).to.be(d);
        expect(ls[2]).to.be(c);
        expect(ls[3]).to.be(a);
        ls2 = TypedList(Date, [a, b, c, d]);
        ls2.sort();
        expect(ls2[0]).to.be(b);
        expect(ls2[1]).to.be(d);
        expect(ls2[2]).to.be(c);
        return expect(ls2[3]).to.be(a);
      });
      it('should use Array#sort lexicographic order for other types', function() {
        var a, b, c, d, ls, ls2;
        a = /mmm/;
        b = /zzz/;
        c = /aaa/;
        d = /vvv/;
        ls = TypedList('RegExp', [a, b, c, d]);
        ls.sort();
        expect(ls[0]).to.be(c);
        expect(ls[1]).to.be(a);
        expect(ls[2]).to.be(d);
        expect(ls[3]).to.be(b);
        ls2 = TypedList('Boolean', [true, false]);
        ls2.sort();
        expect(ls2[0]).to.be(false);
        return expect(ls2[1]).to.be(true);
      });
      return it('should return the sorted instance for chaining', function() {
        var ls1, ls2, ls3;
        ls1 = TypedList('Number', [2, 33, 4, 77, 8]);
        ls2 = TypedList('Date', [new Date, new Date('1/1/1980')]);
        ls3 = TypedList('Boolean', [true, false, true, false]);
        expect(ls1.sort()).to.be(ls1);
        expect(ls2.sort()).to.be(ls2);
        expect(ls3.sort()).to.be(ls3);
        return expect(ls1.sort(function(a, b) {
          return a < b;
        })).to.be(ls1);
      });
    });
    /*
      Private instance function
    */

    describe('#_add', function() {
      var l1, l2;
      l1 = l2 = null;
      beforeEach(function() {
        l1 = TypedList('String');
        return l2 = List([2, false, 'z']);
      });
      it('should add one or more items to the end of the list', function() {
        l1._add('x');
        l1._add('y', 'z');
        expect(l1.length).to.be(3);
        expect(l1[0]).to.be('x');
        expect(l1[1]).to.be('y');
        expect(l1[2]).to.be('z');
        l2._add(4, true);
        expect(l2.length).to.be(5);
        expect(l2[3]).to.be(4);
        return expect(l2[4]).to.be(true);
      });
      return it('should not type check the value', function() {
        return expect(function() {
          return l1._add(2, /foo/);
        }).to.not.throwError();
      });
    });
    describe('#add', function() {
      var ls;
      ls = null;
      beforeEach(function() {
        return ls = TypedList('String');
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
      it('should check the type of the item added', function() {
        return expect(function() {
          return ls.add(99);
        }).to.throwError(/Expected String/);
      });
      it('should do nothing if no item is passed', function() {
        ls.add();
        return expect(ls.length).to.be(0);
      });
      return it('should return the instance for chaining', function() {
        ls = TypedList('Number');
        return expect(ls.add(1)).to.be(ls);
      });
    });
    describe('#addRange', function() {
      it('should add one or more items to the end of the list', function() {
        var ls;
        ls = TypedList('Number');
        ls.addRange([1, 2]);
        expect(ls[0]).to.be(1);
        return expect(ls[1]).to.be(2);
      });
      it('should increment the length property', function() {
        var ls;
        ls = TypedList('Number');
        ls.addRange([1, 2]);
        return expect(ls.length).to.be(2);
      });
      it('should check the type of each item to be added', function() {
        var ls;
        ls = TypedList('Number');
        return expect(function() {
          return ls.addRange(['a']);
        }).to.throwError(function(e) {
          expect(e).to.be.a(TypeError);
          return expect(e.message).to.be('Expected Number');
        });
      });
      it('should accept an "iterable" as it\'s parameter', function() {
        var foo, ls;
        ls = TypedList('Number');
        ls.addRange([1, 2]);
        expect(ls.length).to.be(2);
        ls = TypedList('String');
        ls.addRange('as');
        expect(ls.length).to.be(2);
        ls = TypedList('String');
        ls.addRange(List('as'));
        expect(ls.length).to.be(2);
        ls = TypedList('String');
        foo = function() {
          ls.addRange(arguments);
          return expect(ls.length).to.be(2);
        };
        return foo('a', 'b');
      });
      it('should do nothing if no item is passed', function() {
        var ls;
        ls = TypedList('String');
        ls.addRange();
        return expect(ls.length).to.be(0);
      });
      return it('should return the instance for chaining', function() {
        var ls;
        ls = TypedList('Number');
        return expect(ls.addRange([1, 2])).to.be(ls);
      });
    });
    describe('#insert', function() {
      var ls;
      ls = null;
      beforeEach(function() {
        return ls = TypedList('String', 'aaaa');
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
      it('should add the item to the end of the list if the index is out of range', function() {
        ls.insert(99, 'b');
        expect(ls[4]).to.be('b');
        ls.insert(-99, 'c');
        return expect(ls[5]).to.be('b');
      });
      return it('should return the instance for chaining', function() {
        return expect(ls.insert(2, 'b')).to.be(ls);
      });
    });
    describe('#insertRange', function() {
      var ls;
      ls = null;
      beforeEach(function() {
        return ls = TypedList('String', 'aaaa');
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
      it('should add the item to the end of the list if the index is out of range', function() {
        ls.insertRange(99, ['b']);
        expect(ls[4]).to.be('b');
        ls.insertRange(-99, ['c']);
        return expect(ls[5]).to.be('b');
      });
      it('should accept an "iterable" as it\'s items parameter', function() {
        var foo;
        ls = TypedList('Number', [1, 1]);
        ls.insertRange(1, [2, 2]);
        expect(ls.length).to.be(4);
        expect(ls[0]).to.be(1);
        expect(ls[1]).to.be(2);
        expect(ls[2]).to.be(2);
        expect(ls[3]).to.be(1);
        ls = TypedList('String', 'aa');
        ls.insertRange(1, 'bb');
        expect(ls.length).to.be(4);
        expect(ls[0]).to.be('a');
        expect(ls[1]).to.be('b');
        expect(ls[2]).to.be('b');
        expect(ls[3]).to.be('a');
        ls = TypedList('String', 'aa');
        ls.insertRange(1, List('bb'));
        expect(ls.length).to.be(4);
        expect(ls[0]).to.be('a');
        expect(ls[1]).to.be('b');
        expect(ls[2]).to.be('b');
        expect(ls[3]).to.be('a');
        ls = TypedList('String', 'aa');
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
        return ls = TypedList('String', 'asdf');
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
        return ls = TypedList('String', 'aaa');
      });
      it('should set a new value for the item at the given index', function() {
        ls.set(1, 'b');
        expect(ls[0]).to.be('a');
        expect(ls[1]).to.be('b');
        return expect(ls[2]).to.be('a');
      });
      it('should return `false` if the new item is not passed', function() {
        var x;
        x = ls.set(1);
        return expect(x).to.be(false);
      });
      it('should not mutate the list if the new item is not passed', function() {
        ls.set(1);
        return expect(ls.every(function(v) {
          return v === 'a';
        })).to.be(true);
      });
      it('should return `false` if the passed index is not in the list', function() {
        var x;
        x = ls.set(99, 'b');
        return expect(x).to.be(false);
      });
      it('should check the type of the new item', function() {
        return expect(function() {
          return ls.set(1, 5);
        }).to.throwError(/Expected String/);
      });
      return it('should return `true` if the item is successfully set', function() {
        var x;
        x = ls.set(1, 'b');
        return expect(x).to.be(true);
      });
    });
    describe('#removeAt', function() {
      var ls;
      ls = null;
      beforeEach(function() {
        return ls = TypedList('String', 'ababa');
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
        ls.removeAt(2, 2);
        expect(ls.length).to.be(3);
        expect(ls[0]).to.be('a');
        expect(ls[1]).to.be('b');
        return expect(ls[2]).to.be('a');
      });
      it('should return the number of items removed from the list', function() {
        var x;
        x = ls.removeAt(1);
        expect(x).to.be(1);
        x = ls.removeAt(1, 2);
        return expect(x).to.be(2);
      });
      it('should not remove any items if the index is >= the list length', function() {
        var x;
        x = ls.removeAt(99);
        return expect(x).to.be(0);
      });
      it('should use an offset from the end of the list if the index is negative', function() {
        var x;
        x = ls.removeAt(-2);
        expect(ls.length).to.be(4);
        expect(ls[0]).to.be('a');
        expect(ls[1]).to.be('b');
        expect(ls[2]).to.be('a');
        return expect(ls[3]).to.be('a');
      });
      it('should not remove anything if the calculated index is less than zero', function() {
        var x;
        x = ls.removeAt(-99);
        return expect(x).to.be(0);
      });
      return it('should return `0` if the list is empty', function() {
        var x;
        ls = TypedList('String');
        x = ls.removeAt(1);
        return expect(x).to.be(0);
      });
    });
    describe('#remove', function() {
      var ls;
      ls = null;
      beforeEach(function() {
        return ls = TypedList('String', 'ababa');
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
      it('should return `true` if the item was successfully removed', function() {
        var x;
        x = ls.remove('b');
        return expect(x).to.be(true);
      });
      it('should return `false` if the item was was not removed', function() {
        var x;
        x = ls.remove('z');
        return expect(x).to.be(false);
      });
      return it('should return `false` if the list is empty', function() {
        var x;
        ls = TypedList('String');
        x = ls.remove('a');
        return expect(x).to.be(false);
      });
    });
    describe('#removeIf', function() {
      var ls;
      ls = null;
      beforeEach(function() {
        return ls = TypedList('String', 'ababa');
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
      it('should return `true` if the item was successfully removed', function() {
        var x;
        x = ls.removeIf(function(val) {
          return val === 'b';
        });
        return expect(x).to.be(true);
      });
      it('should return `false` if the item was was not removed', function() {
        var x;
        x = ls.removeIf(function(val) {
          return val === 'z';
        });
        return expect(x).to.be(false);
      });
      it('should return `false` if the list is empty', function() {
        var x;
        ls = TypedList('String');
        x = ls.removeIf(function(val) {
          return val === 'a';
        });
        return expect(x).to.be(false);
      });
      return it('should accept a context object for the callback as an optional second parameter', function() {
        var obj;
        obj = {
          foo: 'bar'
        };
        return ls.removeIf((function(v) {
          expect(this).to.be(obj);
          expect(this.foo).to.be('bar');
          return true;
        }), obj);
      });
    });
    return describe('#removeAll', function() {
      var ls;
      ls = null;
      beforeEach(function() {
        return ls = TypedList('String', 'ababa');
      });
      it('should remove every item from the list that passes the iterator test', function() {
        ls.removeAll(function(val) {
          return val === 'a';
        });
        expect(ls.length).to.be(2);
        expect(ls[0]).to.be('b');
        return expect(ls[1]).to.be('b');
      });
      it('should return the number of items removed from the list', function() {
        var x;
        x = ls.removeAll(function(val) {
          return val === 'b';
        });
        return expect(x).to.be(2);
      });
      it('should return `0` if no items are removed', function() {
        var x;
        x = ls.removeAll(function(val) {
          return val === 'z';
        });
        return expect(x).to.be(0);
      });
      it('should return `0` if the list is empty', function() {
        var x;
        ls = TypedList('String');
        x = ls.removeAll(function(val) {
          return val === 'a';
        });
        return expect(x).to.be(0);
      });
      it('should accept a context object for the callback as an optional second parameter', function() {
        var obj;
        ls = TypedList('String', 'a');
        obj = {
          foo: 'bar'
        };
        return ls.removeAll((function(v) {
          expect(this).to.be(obj);
          expect(this.foo).to.be('bar');
          return true;
        }), obj);
      });
      return it('should pass 3 parameters to the callback test: current value, index, the list', function() {
        ls = TypedList('String', ['foo']);
        return ls.removeAll(function(val, index, list) {
          expect(val).to.be('foo');
          expect(index).to.be(0);
          expect(list).to.be(ls);
          return true;
        });
      });
    });
  });

}).call(this);
