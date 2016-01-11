'use strict';

module.exports = function (target) {
  return `mongoimport --host localhost --db ${this.config.db} -u ${this.config.user} -p ${this.config.pwd} --authenticationDatabase ${this.config.db} --collection ${this.config.collection} < ${target} --jsonArray`;
};
