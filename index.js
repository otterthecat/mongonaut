'use strict';
let exec = require('child_process').exec;
let defaults = require('./lib/defaults');
let query = require('./lib/query');
let helpers = require('./lib/helpers');
let runDbAction = helpers.runQueryAction;
let getDbQuery = helpers.getDbQuery;

let Mongonaut = function (options) {
  this.config = Object.assign(defaults(), options);
  this.exec = exec;
  this.query = query;
  this.runDbAction = runDbAction.bind(this);
};

Mongonaut.prototype = {
  'import': function (files) {
    return this.runDbAction(getDbQuery('import'), files);
  },

  'export': function (collections) {
    return this.runDbAction(getDbQuery('export'), collections);
  },

  'set': function () {
    if (typeof arguments[0] === 'object') {
      this.config = Object.assign(this.config, arguments[0]);
      return this;
    }
    else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'string') {
      this.config[arguments[0]] = arguments[1];
      return this;
    }

    return new Error('Invalid argument(s)');
  }
};

module.exports = Mongonaut;
