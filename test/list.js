// Generated by CoffeeScript 1.3.1
(function() {
  var List, TypedList, expect, _ref;

  expect = require('expect.js');

  _ref = require('../lib/coll'), TypedList = _ref.TypedList, List = _ref.List;

  describe('TypedList / List', function() {
    describe('Instance Properties', function() {
      describe('type', function() {
        var ls1, ls2;
        ls1 = ls2 = null;
        beforeEach(function() {
          ls1 = TypedList('String', ['a', 'b']);
          return ls2 = TypedList(RegExp);
        });
        it('should be the type of the contents in the list', function() {
          expect(ls1.type).to.be('String');
          return expect(ls2.type).to.be(RegExp);
        });
        it('should not be writable if Object.defineProperty is available', function() {
          if (Object.defineProperty != null) {
            ls1.type = 'Number';
            ls2.type = Function;
            expect(ls1.type).to.be('String');
            return expect(ls2.type).to.be(RegExp);
          }
        });
        return it('should not be configurable if Object.defineProperty is available', function() {
          if (Object.defineProperty != null) {
            delete ls1.type;
            return expect(ls1).to.have.property('type');
          }
        });
      });
      return describe('length', function() {
        var ls;
        ls = null;
        beforeEach(function() {
          return ls = TypedList('String');
        });
        it('should have an initial value of zero', function() {
          return expect(ls.length).to.be(0);
        });
        return it('should not be configurable', function() {
          delete ls.length;
          return expect(ls).to.have.property('length');
        });
      });
    });
    describe('TypedList#_new', function() {
      it('should return a new, empty list of the same constructor and type', function() {
        var l1, l1new;
        l1 = TypedList('RegExp', [/fizz/, /buzz/]);
        l1new = l1._new();
        expect(l1new).to.be.a(TypedList);
        expect(l1new.length).to.be(0);
        return expect(l1new.type).to.be('RegExp');
      });
      return it('should accept an additional type parameter to return a new type of list', function() {
        var l1, l1new;
        l1 = TypedList('String', 'asdf');
        l1new = l1._new('Number');
        return expect(l1new.type).to.be('Number');
      });
    });
    describe('List#_new', function() {
      return it('should return a new List', function() {
        var l2, l2new;
        l2 = List([new Date, 'a']);
        l2new = l2._new();
        expect(l2new).to.be.a(List);
        expect(l2new.length).to.be(0);
        return expect(l2new.type).to.be('Any');
      });
    });
    return describe('Unmodified methods inherited directly from Array prototype', function() {
      expect(TypedList.prototype.pop).to.be.a(Function);
      expect(TypedList.prototype.reverse).to.be.a(Function);
      expect(TypedList.prototype.shift).to.be.a(Function);
      return expect(TypedList.prototype.join).to.be.a(Function);
    });
  });

}).call(this);
