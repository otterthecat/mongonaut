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
    'collection': 'mads',
    'jsonArray': true,
  }
};

let configUpsertMock = {
  'config': {
    'user': 'tomservo',
    'pwd': 'lemur',
    'db': 'deep13',
    'collection': 'mads',
    'jsonArray': true,
    'upsertFields':['field1']
  }
};

let configMultipleUpsertMock = {
  'config': {
    'user': 'tomservo',
    'pwd': 'lemur',
    'db': 'deep13',
    'collection': 'mads',
    'jsonArray': true,
    'upsertFields':['field1', 'field2', 'field3']
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
let q = require('../../lib/query');
let imp = q.import;
let exp = q.export;

describe('#import', function () {
  describe('when passed a JSON file path', function () {
    it('should generate query string to import JSON file', function () {
      let returnValue = imp.call(configMock, fakeJson);
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
      let returnValue = imp.call(noAuthMock, fakeJson);
      returnValue.should.not.contain('-p');
      returnValue.should.not.contain('-u');
      returnValue.should.not.contain('--authenticationDatabase');
    });
  });

  describe('when only a user or pwd is set', function () {
    it('should throw an error if missing a pwd', function () {
      expect(imp.bind(incompleteMock1, fakeJson)).to.throw('Missing user name or password');
    });

    it('should throw an error if missing a user', function () {
      expect(imp.bind(incompleteMock2, fakeJson)).to.throw('Missing user name or password');
    });
  });

  describe('when passed an upsertfield', function () {
    it('should generate query with an upsertfield set', function () {
      let returnValue = imp.call(configUpsertMock, fakeJson);
      returnValue.should.contain('--upsertFields field1');
    });
  });

  describe('when passed multiple upsertfield', function () {
    it('should generate query with multiple upsertfields set', function () {
      let returnValue = imp.call(configMultipleUpsertMock, fakeJson);
      returnValue.should.contain('--upsertFields field1,field2,field3');
    });
  });

  describe('when passed a CSV file path', function () {
    it('should generate query string to import CSV file', function () {
      let returnValue = imp.call(configMock, fakeCsv);
      returnValue.should.contain('--type csv');
      returnValue.should.contain('--headerline');
      returnValue.should.contain(`--file ${fakeCsv}`);
    });
  });

  describe('when passed a TSV file path', function () {
    it('should generate query string to import TSV file', function () {
      let returnValue = imp.call(configMock, fakeTsv);
      returnValue.should.contain('--type tsv');
      returnValue.should.contain('--headerline');
      returnValue.should.contain(`--file ${fakeTsv}`);
    });
  });

  describe('when passed an invalid file path', function () {
    it('should throw an error', function () {
      expect(imp.bind(configMock, fakeBadFile)).to.throw('Invalid file type');
    });
  });
});

describe('#export', function () {
  describe('when passed a collection', function () {
    let returnedVal = exp.call(configMock, 'foo');
    it('should return a string when passed a collection with auth set in config', function () {
      returnedVal.should.be.a('string');
    });

    it('should have returned string contain auth flag', function () {
      returnedVal.should.contain('-u');
      returnedVal.should.contain('-p');
      returnedVal.should.contain('--authenticationDatabase');
    });
  });

  describe('when config does not contain user/password properties', function () {
    let returnedVal = exp.call(noAuthMock);
    it('should return a command without authorization flags', function () {
      returnedVal.should.not.contain('-u');
      returnedVal.should.not.contain('-p');
      returnedVal.should.not.contain('--authenticationDatabase');
    });
  });
});
