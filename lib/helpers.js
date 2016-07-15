'use strict';
exports.runQueryAction = function (mode, sources) {
  let promiseList = [];
  if (Array.isArray(sources)) {
    sources.forEach (function (source) {
      promiseList.push(mode.call(this, source));
    });
  }
  else {
    promiseList.push(mode.call(this, sources));
  }

  return Promise.all(promiseList);
};

exports.getDbQuery = function (mode) {
  return function (target) {
    return new Promise ((resolve, reject) => {
      this.exec(this.query[mode].call(this, target), (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }

        let returnObj = {
          'stdout': stdout,
          'stderr': stderr
        };

        if (mode === 'import') {
          returnObj.file = target;
        }

        if (mode === 'export') {
          returnObj.collection = target || this.config.collection;
        }

        resolve.call(this, returnObj);
      });
    });
  }
};

exports.generateAuth = function (settings) {
  if (settings.user.length > 0 && settings.pwd.length > 0) {
    return `-u ${settings.user} -p ${settings.pwd} --authenticationDatabase ${settings.db}`;
  }
  else if (settings.user.length + settings.pwd.length > 0) {
    throw new Error('Missing user name or password');
  }
};