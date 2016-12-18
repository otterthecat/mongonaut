'use strict'

exports.generateAuth = function (options) {
  return options.user && options.pwd ? `-u ${options.user} -p ${options.pwd} --authenticationDatabase ${options.db}` : ''
}

exports.generateHeaderline = function (options) {
  return options.fileTye !== 'json' ? '--headerline' : (options.jsonArray ? '--jsonArray' : '')
}

exports.generateType = function (options) {

}
