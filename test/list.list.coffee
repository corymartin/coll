
expect = require 'expect.js'

{List} = require '../lib/coll'


describe 'List Constructor', ->

  ls1 = ls2 = ls3 = ls4 = null

  beforeEach ->
    ls1 = new List
    ls2 = new List ['a', 2]
    ls3 = List()
    ls4 = List [1, 'z']

  it 'should instantiate a new instance with or without the use of `new`', ->
    expect(ls1).to.be.a List
    expect(ls2).to.be.a List
    expect(ls3).to.be.a List
    expect(ls4).to.be.a List

  it 'should set the inital length of the list', ->
    expect(ls1.length).to.be 0
    expect(ls2.length).to.be 2
    expect(ls3.length).to.be 0
    expect(ls4.length).to.be 2

  it 'should populate itself with some initial values via the init param', ->
    expect(ls2[0]).to.be 'a'
    expect(ls2[1]).to.be 2
    expect(ls4[0]).to.be 1
    expect(ls4[1]).to.be 'z'

  it 'should accept an "iterable" for the init parameter', ->
    ls = List [1,2]
    expect(ls.length).to.be 2

    ls = List 'as'
    expect(ls.length).to.be 2

    ls = List List 'as'
    expect(ls.length).to.be 2

    foo = ->
      ls = List arguments
      expect(ls.length).to.be 2
    foo 'a', 'b'

