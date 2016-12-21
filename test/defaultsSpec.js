'use strict'

const test = require('ava')
let defaults = require('../lib/defaults')
let d = defaults()

test('defaults', function (t) {
  t.is(typeof defaults, 'function')
  t.is(typeof d, 'object')
  t.throws(function () {
    d.fake = 'fake'
  }, TypeError)

  t.is(d.host, 'localhost')
  t.is(d.jsonArray, true)
  t.is(d.upsertFields, undefined)
})
