'use strict';
let exec = require('child_process').exec;
let defaults = require('./lib/defaults');
let query = require('./lib/query');
let importScript = require('./lib/importScript');

let Mongonaut = function (options) {
  this.config = Object.assign(defaults(), options);
  this.exec = exec;
  this.query = query;
};

Mongonaut.prototype = {
  'import': function (target) {
    let promiseList = [];
    if (typeof target === 'string') {
      promiseList.push(importScript.call(this, target));
    }
    else if (Array.isArray(target)) {
      target.forEach((item) => {
        promiseList.push(importScript.call(this, item));
      });
    }

    return Promise.all(promiseList);
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
