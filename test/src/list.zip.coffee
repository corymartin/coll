
expect = require 'expect.js'

{List} = require('../lib/coll')

describe 'List Zip Methods', ->

  describe '#zip', ->
    l1 = l2 = l3 = l4 = null

    beforeEach ->
      l1 = List [1, 2, 3, 4]
      l2 = List 'abcd'
      l3 = List ['alpha', 'bravo', 'charlie']
      l4 = List 'ABCDE'

    it '''should merge the instance list with the passed iterables at their
      corresponding indices''', ->
      x = l1.zip l2
      expect(x.length).to.be 4
      expect(x.every (ls) -> ls.length == 2).to.be true
      expect(x[0][0]).to.be 1
      expect(x[0][1]).to.be 'a'
      expect(x[1][0]).to.be 2
      expect(x[1][1]).to.be 'b'
      expect(x[2][0]).to.be 3
      expect(x[2][1]).to.be 'c'
      expect(x[3][0]).to.be 4
      expect(x[3][1]).to.be 'd'

      x = l1.zip [11, 22, 33, 44], 'abcd'
      expect(x.length).to.be 4
      expect(x.every (ls) -> ls.length == 3).to.be true
      expect(x[0][0]).to.be 1
      expect(x[0][1]).to.be 11
      expect(x[0][2]).to.be 'a'
      expect(x[1][0]).to.be 2
      expect(x[1][1]).to.be 22
      expect(x[1][2]).to.be 'b'
      expect(x[2][0]).to.be 3
      expect(x[2][1]).to.be 33
      expect(x[2][2]).to.be 'c'
      expect(x[3][0]).to.be 4
      expect(x[3][1]).to.be 44
      expect(x[3][2]).to.be 'd'

    it 'should return a new List', ->
      x = l1.zip l2
      expect(x).to.be.a List
      expect(x).not.to.be l1
      expect(x).not.to.be l2

      x = l1.zip [11, 22, 33, 44], 'abcd'
      expect(x).to.be.a List
      expect(x).not.to.be l1

    it 'should return a List of Lists', ->
      x = l1.zip l2
      expect(x.every (ls) -> ls instanceof List).to.be true

      x = l1.zip [11, 22, 33, 44], 'abcd'
      expect(x.every (ls) -> ls instanceof List).to.be true

    it 'should limit merged lists to the length of the instance list', ->
      x = l3.zip l4
      expect(x.length).to.be 3

    it '''should fill in undefined values when passed iterables are shorter
      than the instance list''', ->
      x  = l4.zip l3
      expect(x.length).to.be 5
      expect(x[0][1]).to.be 'alpha'
      expect(x[1][1]).to.be 'bravo'
      expect(x[2][1]).to.be 'charlie'
      expect(x[3][1]).to.be undefined
      expect(x[4][1]).to.be undefined

