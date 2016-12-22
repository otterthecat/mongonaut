'use strict'

const test = require('ava')
const Mongonaut = require('../index')
let m = new Mongonaut()

test('set() should update config when passed an object ', function (t) {
  m.set({user: 'foo', pwd: 'bar'})

  t.is(m.config.user, 'foo')
  t.is(m.config.pwd, 'bar')
})

test('set() should update config when passed key/value strings', function (t) {
  m.set('collection', 'meh')

  t.is(m.config.collection, 'meh')
})
