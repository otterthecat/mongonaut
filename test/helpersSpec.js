'use strict'

const test = require('ava')
let h = require('../lib/helpers')

test('generateAuth() should return empty string if no credentials are passed', function (t) {
  t.is(h.generateAuth({}), '')
})

test('generateAuth() should return auth substring when credentials are passed', function (t) {
  t.is(h.generateAuth({user: 'servo', pwd: 'crow', db: 'sol'}),
    '-u servo -p crow --authenticationDatabase sol')
})

test('generateHeaderline() should return headerline flag is passed non-json file', function (t) {
  t.is(h.generateHeaderline({file: 'foo.csv'}), '--headerline')
  t.is(h.generateHeaderline({file: 'foo.json'}), '')
})

test('generateJSONArray() should return jsonArray flag if passed truthy .jsonArray property', function (t) {
  t.is(h.generateJSONArray({}), '')
  t.is(h.generateJSONArray({jsonArray: true}), '--jsonArray')
})

test('generateType() should return type option based on file extension', function (t) {
  t.is(h.generateType('thing.txt'), '--type txt')
  t.is(h.generateType('THING.txt'), '--type txt')
})

test('generateUpsertFields() should return empty string if passed falsy value', function (t) {
  t.is(h.generateUpsertFields(), '')
})

test('generateUpsertFields() should return upsert substring when passed array', function (t) {
  t.is(h.generateUpsertFields(['foo', 'bar']), '--upsertFields foo,bar')
})
