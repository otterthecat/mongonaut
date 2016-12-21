'use strict'

const test = require('ava')
const q = require('../lib/query')

var mockSettings = {
  host: 'localhost',
  user: 'ishmael',
  pwd: 'pequod',
  db: 'ahab',
  file: 'foo.json',
  collection: 'stuff'
}

test('#import', function (t) {
  let returnValue = q.import(mockSettings)

  t.regex(returnValue, /-h localhost/, 'should return string with correct host setting')
  t.regex(returnValue, /-db ahab/, 'should return string with correct db setting')
  t.regex(returnValue, /--file foo.json/, 'should return string with correct file setting')
})

test('#export', function (t) {
  let returnValue = q.export(mockSettings)

  t.regex(returnValue, /-h localhost/)
  t.regex(returnValue, /-db ahab/)
  t.regex(returnValue, /-c stuff/)
  t.regex(returnValue, /--jsonArray -o stuff.json/)
})
