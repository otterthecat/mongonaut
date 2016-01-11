'use strict';
let exec = require('child_process').exec;
let defaults = require('./lib/defaults');
let query = require('./lib/query');

let Mongonaut = function (options) {
  this.config = Object.assign(defaults, options);
  this.exec = exec;
  this.query = query;
};

Mongonaut.prototype = {
  'import': function (target) {
    return new Promise ((resolve, reject) => {
      this.exec(this.query(target), (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        resolve.call(this, {
          'stdout': stdout,
          'stderr': stderr
        });
      });
    });
  },

  'set': function (prop, val) {
    if (typeof defaults[prop] !== 'undefined') {
      this.config[prop] = val;
      return this;
    }
    return false;
  }
};

module.exports = Mongonaut;
