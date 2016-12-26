'use strict'

exports.promisify = function (childProcess) {
  return new Promise((resolve, reject) => {
    try {
      let output = ''
      childProcess.stderr.on('data', function (data) {
        output += data
      })

      childProcess.on('close', function (status) {
        if (status !== 0) {
          reject({
            out: output,
            code: status
          })
        } else {
          resolve({
            out: output,
            code: status
          })
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}
