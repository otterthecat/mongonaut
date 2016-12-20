'use strict'

const test = require('ava')
let defaults = require('../lib/defaults')
let d = defaults()

test('defaults', function (t) {
  t.is(typeof defaults, 'function', 'should be a function')
  t.is(typeof d, 'object', 'should return an object when called')
  t.throws(function () {
    d.fake = 'fake'
  }, TypeError, 'should not allow for adding new properties')

  t.is(d.host, 'localhost', 'should have default value for localhost')
  t.is(d.jsonArray, true, 'should have default value for jsonArray')
  t.is(d.upsertFields, undefined, 'should have default value for upsertFields')
})
