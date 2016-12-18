'use strict'

const HELPERS = require('./helpers')

exports.import = function (data) {
  return `-h ${data.host} --db ${data.db} ${HELPERS.generateAuth(data)} ${HELPERS.generateType(data)}`
}

exports.export = function (data) {
  return `-h ${data.host} --db ${data.db} ${HELPERS.generateAuth(data)} -c ${data.collection} --jsonArray -o ${data.collection}.json`
}
