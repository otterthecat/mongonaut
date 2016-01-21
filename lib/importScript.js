'use strict';
module.exports = function (target) {
  return new Promise ((resolve, reject) => {
    this.exec(this.query(target), (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve.call(this, {
        'file': target,
        'stdout': stdout,
        'stderr': stderr
      });
    });
  });
};
