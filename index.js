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
    let options = Object.assign({}, this.config, {'file': file})
    return SPAWN('mongoimport', QUERY['import'](options).split(' '))
  },

  'export': function (collection) {
    if (collection) this.config.collection = collection
    return SPAWN('mongoexport', QUERY['export'](this.config).split(' '))
  },

  'set': function (...args) {
    if (args.length === 1 && typeof args === 'object') {
      this.config = Object.assign(this.config, args)
      return this
    } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[0] === 'string') {
      this.config[args[0]] = args[1]
      return this
    }
    return new Error('Invalid argument(s) passed to .set()')
  }
}

module.exports = Mongonaut
