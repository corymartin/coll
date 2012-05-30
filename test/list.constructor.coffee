
expect = require 'expect.js'

{TypedList, List} = require '../lib/coll'


describe 'TypedList / List Constructor', ->

  ls1 = ls2 = ls3 = ls4 = null

  beforeEach ->
    ls1 = new TypedList 'String'
    ls2 = new TypedList 'String', ['a', 'b']
    ls3 = TypedList 'Number'
    ls4 = TypedList 'Number', [1, 2]

  it 'should instantiate a new instance with or without the use of `new`', ->
    expect(ls1).to.be.a TypedList
    expect(ls2).to.be.a TypedList
    expect(ls3).to.be.a TypedList
    expect(ls4).to.be.a TypedList

  it 'should inherit from `Array`', ->
    expect(ls1).to.be.an Array
    expect(ls2).to.be.an Array
    expect(ls3).to.be.an Array
    expect(ls4).to.be.an Array

  it 'should set the inital length of the list', ->
    expect(ls1.length).to.be 0
    expect(ls2.length).to.be 2
    expect(ls3.length).to.be 0
    expect(ls4.length).to.be 2

  it 'should require a type parameter', ->
    expect(-> TypedList()).to.throwError (e) ->
      expect(e.message).to.be 'Parameter `type` is required'
      expect(e).to.be.a TypeError
    expect(-> TypedList 'String').not.to.throwError()
    expect(-> TypedList Array).not.to.throwError()

  it 'should populate itself with some initial values via the init param', ->
    expect(ls2[0]).to.be 'a'
    expect(ls2[1]).to.be 'b'
    expect(ls4[0]).to.be 1
    expect(ls4[1]).to.be 2

  it 'should accept an "iterable" for the init parameter', ->
    ls = TypedList 'Number', [1,2]
    expect(ls.length).to.be 2

    ls = TypedList 'String', 'as'
    expect(ls.length).to.be 2

    ls = TypedList 'String', List 'as'
    expect(ls.length).to.be 2

    foo = ->
      ls = TypedList 'String', arguments
      expect(ls.length).to.be 2
    foo 'a', 'b'

  it 'should type check the values it adds', ->
    expect(-> TypedList 'String', ['a', 'b', 34]).to.throwError /Expected String/
    expect(-> TypedList 'String', ['a', 'b', 'c']).not.to.throwError()
    expect(-> new TypedList 'Number', [1, 'b', 3]).to.throwError /Expected Number/
    expect(-> new TypedList 'Number', [1, 2, 3]).not.to.throwError()

    class Foo
    class Bar

    expect(-> TypedList Foo, [new Foo, 34, new Foo]).to.throwError /Expected Foo/
    expect(-> TypedList Foo, [new Foo, new Bar, new Foo]).to.throwError /Expected Foo/
    expect(-> TypedList Foo, [new Foo, new Foo, new Foo]).not.to.throwError()
    expect(-> new TypedList Foo, [new Foo, 34, new Foo]).to.throwError()
    expect(-> new TypedList Foo, [new Foo, new Bar, new Foo]).to.throwError()
    expect(-> new TypedList Foo, [new Foo, new Foo, new Foo]).not.to.throwError()

  it 'should accept a special type `Any` that allows any type of value', ->
    expect(-> TypedList 'Any', [34, 'a', new Date, true, /asdf/]).not.to.throwError()
    expect(-> new TypedList 'Any', [34, 'a', new Date, true, /asdf/]).not.to.throwError()

