// Generated by CoffeeScript 1.3.1
(function() {
  var expect, util,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  expect = require('expect.js');

  util = require('../lib/util');

  describe('util function', function() {
    describe('determineSearchIndex()', function() {
      it('should return the passed index if that index is within the\nrange of zero to length', function() {
        var x;
        x = util.determineSearchIndex(3, 8);
        return expect(x).to.be(3);
      });
      it('should return zero if index is null or undefined', function() {
        var x;
        x = util.determineSearchIndex(null, 8);
        expect(x).to.be(0);
        x = util.determineSearchIndex(void 0, 8);
        return expect(x).to.be(0);
      });
      it('should return an offset index from the end of the list if the\nindex is negative', function() {
        var x;
        x = util.determineSearchIndex(-2, 8);
        return expect(x).to.be(6);
      });
      return it('should return an index of zero if the computed\nindex is less than zero', function() {
        var x;
        x = util.determineSearchIndex(-12, 8);
        return expect(x).to.be(0);
      });
    });
    describe('determineLastSearchIndex()', function() {
      it('should return the passed index (+1) if that index is within the\nrange of zero to length', function() {
        var x;
        x = util.determineLastSearchIndex(5, 8);
        return expect(x).to.be(6);
      });
      it('should return the length if index is null or undefined', function() {
        var x;
        x = util.determineLastSearchIndex(null, 8);
        expect(x).to.be(8);
        x = util.determineLastSearchIndex(void 0, 8);
        return expect(x).to.be(8);
      });
      it('should return the length if index is greater than\nor equal to length', function() {
        var x;
        x = util.determineLastSearchIndex(8, 8);
        expect(x).to.be(8);
        x = util.determineLastSearchIndex(12, 8);
        return expect(x).to.be(8);
      });
      it('should return an offset index (+1) from the end of the list if the\nindex is negative', function() {
        var x;
        x = util.determineLastSearchIndex(-2, 8);
        return expect(x).to.be(7);
      });
      return it('should return an index of zero if the computed\nindex is less than zero', function() {
        var x;
        x = util.determineLastSearchIndex(-12, 8);
        return expect(x).to.be(0);
      });
    });
    describe('isType()', function() {
      return it('should test to see if the passed object is of the passed type', function() {
        var Bar, Foo, Zzz;
        expect(util.isType(4, 'Number')).to.be(true);
        expect(util.isType(new Number, Number)).to.be(true);
        expect(util.isType('z', 'Number')).to.be(false);
        expect(util.isType(/foo/, 'RegExp')).to.be(true);
        Foo = (function() {

          Foo.name = 'Foo';

          function Foo() {}

          return Foo;

        })();
        Bar = (function(_super) {

          __extends(Bar, _super);

          Bar.name = 'Bar';

          function Bar() {
            return Bar.__super__.constructor.apply(this, arguments);
          }

          return Bar;

        })(Foo);
        Zzz = (function(_super) {

          __extends(Zzz, _super);

          Zzz.name = 'Zzz';

          function Zzz() {
            return Zzz.__super__.constructor.apply(this, arguments);
          }

          return Zzz;

        })(Array);
        expect(util.isType(new Foo, Foo)).to.be(true);
        expect(util.isType(new Bar, Foo)).to.be(true);
        return expect(util.isType(new Zzz, Foo)).to.be(false);
      });
    });
    return describe('isTypeEvery()', function() {
      it('should test if every type in the passed array is of the passed type', function() {
        expect(util.isTypeEvery([2, 3, 4], 'Number')).to.be(true);
        return expect(util.isTypeEvery([2, 'a', 4], 'Number')).to.be(false);
      });
      return it('should only type check items after the optional index, if passed', function() {
        expect(util.isTypeEvery([2, 'a', 4, 6], 'Number', 2)).to.be(true);
        return expect(util.isTypeEvery([2, 3, 'a', 6], 'Number', 2)).to.be(false);
      });
    });
  });

}).call(this);