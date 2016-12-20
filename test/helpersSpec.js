'use strict'

const test = require('ava')
let h = require('../lib/helpers')

test('#generateAuth', function (t) {
  t.is(h.generateAuth({}), '', 'should return empty string if not passed a user and pwd')

  t.is(h.generateAuth({user: 'servo', pwd: 'crow', db: 'sol'}),
    '-u servo -p crow --authenticationDatabase sol',
    'should return authentication flags when user/pwd/db are passed')
})

test('#generateHeaderline', function (t) {
  t.is(h.generateHeaderline({fileType: 'csv'}), '--headerline', 'should return "--headerline" if passed fileType is not "json"')

  t.is(h.generateHeaderline({fileType: 'json', jsonArray: true}), '--jsonArray', 'should return jsonArray flag when appropriate')

  t.is(h.generateHeaderline({fileType: 'json'}), '', 'should retrun empty string when fileType of json passed with falsy "jsonArray" property')
})

test('#generateType', function (t) {
  t.is(h.generateType('thing.txt'), '--type txt', 'should return type flag with parsed file extension')
  t.is(h.generateType('THING.TXT'), '--type txt', 'should return string that is converted to lowercase')
})

test('#generateUpsertFields', function (t) {
  t.is(h.generateUpsertFields(), '', 'should return empty string when argument is falsy')
  t.is(h.generateUpsertFields(['foo', 'bar']), '--upsertFields foo,bar', 'should return upsert flags when passed an array')
})
