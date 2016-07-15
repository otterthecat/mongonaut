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

// export "inventions" collection to a json file
mongonaut.export()
  .then(function (returnedCollections){
    // code to execute on Promise resolve
  });
```

### Constructor(config)
**config:** object to apply configuration data. Available keys are `user`, `pwd`, `db`, and `collection` which are used to authenticate with MongoDB.

If authentication is not desired, then simply omit setting both `user` and `pwd`, or in the case of changing settings from using authentication to omitting authtentication, set both `user` and `pwd` to empty strings.

**returns:** Mongonaut instance.


### .set([key, val] OR [config])
**key:** desired config key to set.

**val:** desired value of `mongonaut.config[key]`

**config** object to apply configuration data. Available keys are `user`, `pwd`, `db`, and `collection` which are used to authenticate with MongoDB.

Remember, both `user` and `pwd` must both either be set (for authentication), or set as the default/empty strings (for no authentication). Setting only one or the other
will result in an error when you call `.import()`.

**note** trying to set a key other than `user`, `pwd`, `db` or `collection` will result in an error.

**returns:** mongonaut


### .import(targetfile OR [targetFiles])
**targetFile:** The file (.json, .csv, or .tsv) containing the data you wish to [import to MongoDB](https://docs.mongodb.org/manual/reference/program/mongoimport/).

**[targetFiles]** An array of file paths containing the data you wish to import.

**returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Resolving callback will be passed an array of objects (1 for each file originally imported) that contain the `file` that was imported, as well
as the `stdout` and `stderr` values.

### .export(collectionString OR [collectionStringArray])
**collectionString:** Name of a collection within the database set by the `db` property of a mongonaut instance

**[collectionStringArray]:** An array of strings that each match the name of a collection within the `db` property of the mongonaut instance.

Note that an argument for `.export()` is optional, and will default to the collection set within the instnace's configured `collection` property.

**returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Resolving callback will be passed an array of objects (1 for each collection originally exported) that contain the `collection` that was exported, as well
as the `stdout` and `stderr` values.

## Run Tests
In a terminal:
```javascript
npm install
npm test
```