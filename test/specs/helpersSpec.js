/*eslint max-nested-callbacks: 0, no-unused-expressions: 0 */
'use strict';
// assertion library
// /////////////////////////////////////////////////////////
let chai = require('chai');
let sinonChai = require('sinon-chai');
let expect = chai.expect;
chai.should();
chai.use(sinonChai);

// Mock Data

// Modules to Test
let helpers = require('../../lib/helpers');

describe('#getDbQuery', function () {
  it('should return a function', function () {
    let returnValue = helpers.getDbQuery();
    returnValue.should.be.a('function');
  });
  it('should have returned function return a promise', function () {
    let returnValue = helpers.getDbQuery();
    let returnPromise = returnValue();
    // supress unhandled rejection warnings
    returnPromise.then(function () {}, function () {});
    returnPromise.should.be.an.instanceOf(Promise);
  });
});

describe('#generateAuth', function () {
  it('should return valid auth string using settings', function () {
    let returnValue = helpers.generateAuth({
      'user': 'foo',
      'pwd': 'bar',
      'db': 'baz'
    });
    returnValue.should.equal('-u foo -p bar --authenticationDatabase baz');
  });

  it('should throw an error if set user/pw are not stings', function () {
    try {
      let returnValue = helpers.generateAuth();
    } catch (e){
      e.should.be.an.instanceOf(Error);
    }
  });
});
