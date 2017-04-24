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
// then import a new file
mongonaut.set('collection', 'inventions');
  .import('./data2.json')
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
**config:** object to apply configuration data. Available keys are `host`, `user`, `pwd`, `db`, `collection` which are used to authenticate with MongoDB, as well as options `jsonArray` - set as `false` if you want to use MongoDB's [JSON format](http://zaiste.net/2012/08/importing_json_into_mongodb/). (by default, *Mongonaut* will expect valid JSON files),
and `upsertFields` if you need to [specify fields](https://docs.mongodb.com/manual/reference/program/mongoimport/#cmdoption--upsertFields)

If authentication is not desired, then simply omit setting both `user` and `pwd`, or in the case of changing settings from using authentication to omitting authtentication, set both `user` and `pwd` to empty strings.

**returns:** Mongonaut instance.


### .set([key, val] OR [config])
**key:** desired config key to set.

**val:** desired value of `mongonaut.config[key]`

**config** object to apply configuration data. Available keys are `host`, `user`, `pwd`, `db`, and `collection` which are used to authenticate with MongoDB.

If you intend to use [MongoDB's default JSON formatting](http://zaiste.net/2012/08/importing_json_into_mongodb/), then set `jsonArray` to false.

You can set `upsertFields` if you intend to specify specific fields for your query. Unless set by a user, *Mongonaut* ignores this setting.

Remember, both `user` and `pwd` must both either be set (for authentication), or set as the default/empty strings (for no authentication). Setting only one or the other
will result in an error when you call `.import()`.

**note** trying to set a key other than `host`, `user`, `pwd`, `db` or `collection` will result in an error.

**returns:** mongonaut


### .import(targetfile)
**targetFile:** The file (.json, .csv, or .tsv) containing the data you wish to [import to MongoDB](https://docs.mongodb.org/manual/reference/program/mongoimport/).

**returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Resolving callback will be passed an object with two properties: `code` and `out`. The exit code from the import/export process will be the value of `code`, and `out` will contain general output. Note that `mongomimport` [natively sends status info to stderr rather than stdout](https://jira.mongodb.org/browse/DOCS-8817), so rather than be confusing, this output is attached to the `out` property of the object passed to the resolving function.

### .export(collectionString)
**collectionString:** Name of a collection within the database set by the `db` property of a mongonaut instance.

Note that an argument for `.export()` is optional, and will default to the collection set within the instnace's configured `collection` property.

**returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Resolving callback will be passed an object similar as done in `.import()` which contains properties `code` (the exit code) and `out` data sent to stderr.

## Breaking in v3
Previously, `mongonaut` took an array of files/collections. This has been removed in favor of only passing a single file/collection. It should be trivial to write one's own iterator over an array of files to replicate previous behavior if desired.

Object passed to resolving promises have different properties (`out` and `code` rather than `file`, `stderr`, and `stdout`). This is largely due to the fact that `mongoimport` [does not send status info to stdout](https://jira.mongodb.org/browse/DOCS-8817).

## Run Tests
In a terminal:
```javascript
npm install
npm test
```