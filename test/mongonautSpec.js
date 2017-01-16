'use strict'

const test = require('ava')
const Spawngo = require('spawngo')
const sinon = require('sinon')

let fakeSpawn = {
  stderr: {
    on: function (str, cb) {
      cb(str)
    }
  },
  on: function (str, cb) {
    cb(0)
  }
}

sinon.stub(Spawngo.prototype, 'import', function () {
  return fakeSpawn
})
sinon.stub(Spawngo.prototype, 'export', function () {
  return fakeSpawn
})

const Mongonaut = require('../index')
let m = new Mongonaut()

test('Mongonaut should be a constructor', function (t) {
  t.is(m instanceof Mongonaut, true)
})

test('#import() should return a promise', function (t) {
  return m.import('fake.json').then(function () {
    t.pass()
  })
})

test('#export() should return a promise', function (t) {
  return m.export('fakeCollection').then(function () {
    t.pass()
  })
})
