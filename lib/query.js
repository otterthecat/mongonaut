'use strict';

module.exports = function (target) {
  let fileTypeSet = new Set(['json', 'csv', 'tsv']),
      fileType = target.substring(target.lastIndexOf('.') + 1).toLowerCase(),
      headerline = fileType !== 'json' ? '--headerline' : '';

  if (!fileTypeSet.has(fileType)) {
    throw new Error('Invalid file type');
  }

  return `mongoimport --host localhost --db ${this.config.db} -u ${this.config.user} -p ${this.config.pwd} --authenticationDatabase ${this.config.db} --collection ${this.config.collection} --type ${fileType} ${headerline} --file ${target}`;
};
