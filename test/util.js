// Generated by CoffeeScript 1.3.3
var expect, util;

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
  describe('isNumeric()', function() {
    it('should return true for numbers', function() {
      expect(util.isNumeric(23)).to.be(true);
      return expect(util.isNumeric(23.3802)).to.be(true);
    });
    it('should return true for Number instances', function() {
      expect(util.isNumeric(new Number)).to.be(true);
      return expect(util.isNumeric(new Number(34.2))).to.be(true);
    });
    it('should return false for Date instances', function() {
      return expect(util.isNumeric(new Date)).to.be(false);
    });
    it('should return false for NaN', function() {
      return expect(util.isNumeric(NaN)).to.be(false);
    });
    it('should return false for string numbers', function() {
      return expect(util.isNumeric('5')).to.be(false);
    });
    return it('should return false for boolean', function() {
      expect(util.isNumeric(false)).to.be(false);
      expect(util.isNumeric(true)).to.be(false);
      expect(util.isNumeric(new Boolean(false))).to.be(false);
      return expect(util.isNumeric(new Boolean(true))).to.be(false);
    });
  });
  return describe('indexOf()', function() {
    return it('should work with NaN', function() {
      var arr;
      arr = [34, 'foo', NaN, /asdf/, NaN, new Date, 333];
      return expect(util.indexOf(arr, NaN)).to.be(2);
    });
  });
});
