# Mongonaut
NodeJS module that totally Promises to import your JSON, CSV or TSV files to MongoDB.

## Usage
```javascript
let mongonaut = new Mongonaut({
  'user': 'tomservo',
  'pwd': 'sol',
  'db': 'experiments',
  'collection': 'movies'
});

// pass a path to data file
mongonaut.import('./data.json')
  .then(function (response) {
    // code to fire on Promise resolve
  });

// change config to point to new collection
// then batch import multiple files.
mongonaut.set('collection', 'inventions');
  .import(['./data2.json', './some/other/data.json', './third.json'])
  .then(function (response) {
      // code to fire on Promise resolve
  });
```

### Constructor(config)
**config:** object to apply configuration data. Available keys are `user`, `pwd`, `db`, and `collection` which are used to authenticate with MongoDB

**returns:** Mongonaut instance.


### .set([key, val] OR [config])
**key:** desired config key to set.

**val:** desired value of `mongonaut.config[key]`

**config** object to apply configuration data. Available keys are `user`, `pwd`, `db`, and `collection` which are used to authenticate with MongoDB

**note** trying to set a key other than `user`, `pwd`, `db` or `collection` will result in an error.

**returns:** mongonaut


### .import(targetfile OR [targetFiles])
**targetFile:** The file (.json, .csv, or .tsv) containing the data you wish to [import to MongoDB](https://docs.mongodb.org/manual/reference/program/mongoimport/).

**[targetFiles]** An array of file paths containing the data you wish to import.

**returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Resolving callback will be passed an array of objects (1 for each file originally imported) that contain the `file` that was imported, as well
as the `stdout` and `stderr` values.


## Changelog
**v2.0.2**
* updated changelog

**v2.0.1**
* bumped version in package.json

**v2.0.0**
* `.import()` function can be passed either a string of the path to a single JSON file, or an array of strings each pointing to a JSON file to be imported.
[enhancement/9](https://github.com/otterthecat/mongonaut/issues/9)

* **breaking change** the returned promise from `.import()` resolving callback
is now passed an array instead of an object.

**v1.1.1**
* Config property is now sealed before options are applied during instantiation.[bug/7](https://github.com/otterthecat/mongonaut/issues/7)

**v1.1.0**
* Can now import CSV and TSV files [enchancement/1](https://github.com/otterthecat/mongonaut/issues/1)
* `.set()` function can either accept key/value arguments, or a config object [enhancement/2](https://github.com/otterthecat/mongonaut/issues/2)
* Bugfix [bug/4](https://github.com/otterthecat/mongonaut/issues/4)

**v1.0.1**
* fixed typo in `.npmignore`

**v1.0.0**
* Initial release

## Run Tests
In a terminal:
```javascript
npm install
npm test
```