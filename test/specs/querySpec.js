/*eslint max-nested-callbacks: 0, no-unused-expressions: 0 */
'use strict';
// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

// mock data
let configMock = {
  'user': 'tomservo',
  'pwd': 'lemur',
  'db': 'deep13',
  'collection': 'mads'
};

let fakeTarget = 'fake.json';

// modules to test
// /////////////////////////////////////////////////////////
let query = require('../../lib/query');

describe('query', function () {
  it('should generate query string', function () {
    let returnValue = query.call(configMock, fakeTarget);
    returnValue.should.contain(`-db ${configMock.db}`);
    returnValue.should.contain(`-u ${configMock.user}`);
    returnValue.should.contain(`-p ${configMock.pwd}`);
    returnValue.should.contain(`--authenticationDatabase ${configMock.db}`);
    returnValue.should.contain(`--collection ${configMock.collection}`);
    returnValue.should.contain(`${fakeTarget} --jsonArray`);
  });
});
