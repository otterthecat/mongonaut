'use strict'

const test = require('ava')
let h = require('../lib/helpers')

test('#generateAuth', function (t) {
  t.is(h.generateAuth({}), '')

  t.is(h.generateAuth({user: 'servo', pwd: 'crow', db: 'sol'}),
    '-u servo -p crow --authenticationDatabase sol')
})

test('#generateHeaderline', function (t) {
  t.is(h.generateHeaderline({file: 'foo.csv'}), '--headerline')
  t.is(h.generateHeaderline({file: 'bar.json', jsonArray: true}), '--jsonArray')
  t.is(h.generateHeaderline({file: 'baz.json'}), '')
})

test('#generateType', function (t) {
  t.is(h.generateType('thing.txt'), '--type txt')
  t.is(h.generateType('THING.TXT'), '--type txt')
})

test('#generateUpsertFields', function (t) {
  t.is(h.generateUpsertFields(), '')
  t.is(h.generateUpsertFields(['foo', 'bar']), '--upsertFields foo,bar')
})
