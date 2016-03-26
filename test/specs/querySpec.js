/*eslint max-nested-callbacks: 0, no-unused-expressions: 0 */
'use strict';
// assertion library
// /////////////////////////////////////////////////////////
let chai = require('chai');
let sinonChai = require('sinon-chai');
let expect = chai.expect;
chai.should();
chai.use(sinonChai);

// mock data
let configMock = {
  'config': {
    'user': 'tomservo',
    'pwd': 'lemur',
    'db': 'deep13',
    'collection': 'mads'
  }
};

let noAuthMock = {
  'config': {
    'user': '',
    'pwd': '',
    'db': 'sol',
    'collection': 'bots'
  }
};

let incompleteMock1 = {
  'config': {
    'user': 'foo',
    'pwd': '',
    'db': 'deep13',
    'colelction': 'mads'
  }
};

let incompleteMock2 = {
  'config': {
    'user': '',
    'pwd': 'foo',
    'db': 'deep13',
    'colelction': 'mads'
  }
};

let fakeJson = 'fake.json';
let fakeCsv = 'fake.csv';
let fakeTsv = 'fake.tsv';
let fakeBadFile = 'fake.jpg';

// modules to test
// /////////////////////////////////////////////////////////
let query = require('../../lib/query');

describe('query', function () {
  describe('when passed a JSON file path', function () {
    it('should generate query string to import JSON file', function () {
      let returnValue = query.call(configMock, fakeJson);
      returnValue.should.contain(`--db ${configMock.config.db}`);
      returnValue.should.contain(`-u ${configMock.config.user}`);
      returnValue.should.contain(`-p ${configMock.config.pwd}`);
      returnValue.should.contain(`--authenticationDatabase ${configMock.config.db}`);
      returnValue.should.contain(`--collection ${configMock.config.collection}`);
      returnValue.should.contain('--type json');
      returnValue.should.not.contain('--headerline');
      returnValue.should.contain('--jsonArray');
      returnValue.should.contain(`--file ${fakeJson}`);
    });
  });

  describe ('when no authentication is set', function () {
    it('should create query without authentication params', function () {
      let returnValue = query.call(noAuthMock, fakeJson);
      returnValue.should.not.contain('-p');
      returnValue.should.not.contain('-u');
      returnValue.should.not.contain('--authenticationDatabase');
    });
  });

  describe('when only a user or pwd is set', function () {
    it('should throw an error if missing a pwd', function () {
      expect(query.bind(incompleteMock1, fakeJson)).to.throw('Missing user name or password');
    });

    it('should throw an error if missing a user', function () {
      expect(query.bind(incompleteMock2, fakeJson)).to.throw('Missing user name or password');
    });
  });

  describe('when passed a CSV file path', function () {
    it('should generate query string to import CSV file', function () {
      let returnValue = query.call(configMock, fakeCsv);
      returnValue.should.contain('--type csv');
      returnValue.should.contain('--headerline');
      returnValue.should.contain(`--file ${fakeCsv}`);
    });
  });

  describe('when passed a TSV file path', function () {
    it('should generate query string to import TSV file', function () {
      let returnValue = query.call(configMock, fakeTsv);
      returnValue.should.contain('--type tsv');
      returnValue.should.contain('--headerline');
      returnValue.should.contain(`--file ${fakeTsv}`);
    });
  });

  describe('when passed an invalid file path', function () {
    it('should throw an error', function () {
      expect(query.bind(configMock, fakeBadFile)).to.throw('Invalid file type');
    });
  });
});
