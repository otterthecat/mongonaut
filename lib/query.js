'use strict'

const HELPERS = require('./helpers')

exports.import = function (data) {
  return `-h ${data.host} --db ${data.db} ${HELPERS.generateAuth(data)} -c ${data.collection}
          ${HELPERS.generateType(data.file)} ${HELPERS.generateHeaderline(data)} ${HELPERS.generateJSONArray(data)}
          ${HELPERS.generateUpsertFields(data.upsertFields)} --file ${data.file}`.replace(/\s+/g, ' ')
}

exports.export = function (data) {
  return `-h ${data.host} --db ${data.db} ${HELPERS.generateAuth(data)} -c ${data.collection}
          --jsonArray -o ${data.collection}.json`.replace(/\s+/g, ' ')
}
