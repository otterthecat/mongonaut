'use strict'

exports.generateAuth = function (opts) {
  return opts.user && opts.pwd ? `-u ${opts.user} -p ${opts.pwd} --authenticationDatabase ${opts.db}` : ''
}

exports.generateHeaderline = function (opts) {
  let fileExtension = opts.file.substring(opts.file.lastIndexOf('.') + 1).toLowerCase()
  return fileExtension !== 'json' ? '--headerline' : (opts.jsonArray ? '--jsonArray' : '')
}

exports.generateType = function (file) {
  return `--type ${file.substring(file.lastIndexOf('.') + 1).toLowerCase()}`
}

exports.generateUpsertFields = function (val) {
  return val ? `--upsertFields ${val.join(',')}` : ''
}
