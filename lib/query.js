'use strict';

let generateAuth = require('./helpers').generateAuth;

exports.import = function (target) {
  let fileTypeSet = new Set(['json', 'csv', 'tsv']),
      fileType = target.substring(target.lastIndexOf('.') + 1).toLowerCase(),
      headerline = fileType !== 'json' ? '--headerline' : (this.config.jsonArray ? '--jsonArray' : ''),
      auth = generateAuth(this.config) || '';

  if (!fileTypeSet.has(fileType)) {
    throw new Error('Invalid file type');
  }

  return `mongoimport --host localhost --db ${this.config.db} ${auth} --collection ${this.config.collection} --type ${fileType} ${headerline} --file ${target}`;
};

exports.export = function (collection) {
  collection = collection || this.config.collection;
  let auth = generateAuth(this.config) || '';

  return `mongoexport --host localhost --db ${this.config.db} ${auth} --collection ${collection} --jsonArray -o ${collection}.json`;
};