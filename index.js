'use strict'

const SPAWN = require('child_process').spawn
const DEFAULTS = require('./lib/defaults')()
const QUERY = require('./lib/query')

let Mongonaut = function (options) {
  this.config = Object.assign(DEFAULTS, options)
  this.allowedFileTypes = new Set(['json', 'csv', 'tsv'])
}

Mongonaut.prototype = {
  'import': function (file) {
    return SPAWN('mongoimport', QUERY['import'](this.config).split(' '))
  },

  'export': function (collection) {
    return SPAWN('mongoexport', QUERY['export'](this.config).split(' '))
  },

  'set': function () {

  }
}

module.exports = Mongonaut
