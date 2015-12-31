'use strict';

module.exports = function (target) {
  return `mongoimport --host localhost -db ${this.db} -u ${this.user} -p ${this.pwd} --authenticationDatabase ${this.db} --collection ${this.collection} < ${target} --jsonArray`;
};
