'use strict'

const test = require('ava')
const cp = require('child_process')
const sinon = require('sinon')

sinon.stub(cp, 'spawn', function (action, opts) {
  return [action, opts]
})
const Mongonaut = require('../index')
let m = new Mongonaut()

test('import() should spawn a new mongoimport process', function (t) {
  let stubReturn = m.import('foo.json')
  t.is(stubReturn[0], 'mongoimport')
})

test('export() should spawn a new mongoexport process', function (t) {
  let stubReturn = m.export('foo')
  t.is(stubReturn[0], 'mongoexport')
})

test('set() should update config when passed an object ', function (t) {
  m.set({user: 'foo', pwd: 'bar'})

  t.is(m.config.user, 'foo')
  t.is(m.config.pwd, 'bar')
})

test('set() should update config when passed key/value strings', function (t) {
  m.set('collection', 'meh')

  t.is(m.config.collection, 'meh')
})

test('set() should return an error if passed invalid data', function (t) {
  var returnValue = m.set()
  t.is(returnValue instanceof Error, true)
})
