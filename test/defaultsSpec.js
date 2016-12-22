'use strict'

const test = require('ava')
let defaults = require('../lib/defaults')
let d = defaults()

test('should be a function', function (t) {
  t.is(typeof defaults, 'function')
})

test('should return a sealed object when called', function (t) {
  t.is(Object.isSealed(d), true)
})
