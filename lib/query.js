'use strict';

module.exports = function (target) {
  let fileTypeSet = new Set(['json', 'csv', 'tsv']),
      fileType = target.substring(target.lastIndexOf('.') + 1).toLowerCase(),
      headerline = fileType !== 'json' ? '--headerline' : '--jsonArray',
      auth = '';

  if (!fileTypeSet.has(fileType)) {
    throw new Error('Invalid file type');
  }

  if (this.config.user.length > 0 && this.config.pwd.length > 0) {
    auth = `-u ${this.config.user} -p ${this.config.pwd} --authenticationDatabase ${this.config.db}`;
  }
  else if (this.config.user.length + this.config.pwd.length > 0) {
    throw new Error('Missing user name or password');
  }

  return `mongoimport --host localhost --db ${this.config.db} ${auth} --collection ${this.config.collection} --type ${fileType} ${headerline} --file ${target}`;
};
