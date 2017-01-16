'use strict'

const test = require('ava')
let h = require('../lib/helpers')

let fakeSpawn = function (closeVal) {
  return {
    stderr: {
      on: function (str, cb) {
        cb(str)
      }
    },
    on: function (str, cb) {
      cb(closeVal)
    }
  }
}

test('#promisify() should return a promise', function (t) {
  return h.promisify(fakeSpawn(0)).then(function () {
    t.pass()
  })
})

test('#promisify() should fail promise if child process errors', function (t) {
  return h.promisify(fakeSpawn(1)).catch(function () {
    t.pass()
  })
})

test('#promisify() should fail promise if error is is caught', function (t) {
  return h.promisify().catch(function () {
    t.pass()
  })
})
