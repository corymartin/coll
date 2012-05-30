
expect = require 'expect.js'

{TypedList, List} = require '../lib/coll'


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

  it 'should inherit from `TypedList`', ->
    expect(ls1 instanceof TypedList).to.be true
    expect(ls2 instanceof TypedList).to.be true
    expect(ls3 instanceof TypedList).to.be true
    expect(ls4 instanceof TypedList).to.be true

  it 'should set the inital length of the list', ->
    expect(ls1.length).to.be 0
    expect(ls2.length).to.be 2
    expect(ls3.length).to.be 0
    expect(ls4.length).to.be 2

  it 'should have a type parameter of "Any"', ->
    expect(ls1.type).to.be 'Any'
    expect(ls2.type).to.be 'Any'
    expect(ls3.type).to.be 'Any'
    expect(ls4.type).to.be 'Any'

  it 'should populate itself with some initial values via the init param', ->
    expect(ls2[0]).to.be 'a'
    expect(ls2[1]).to.be 2
    expect(ls4[0]).to.be 1
    expect(ls4[1]).to.be 'z'

