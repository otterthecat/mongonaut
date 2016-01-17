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

mongonaut.import('./data.json')
  .then(function (response) {
    // code to fire on Promise resolve
  });
```

### Constructor(config)
**config:** object to apply configuration data. Available keys are `user`, `pwd`, `db`, and `collection` which are used to authenticate with MongoDB

**returns:** Mongonaut instance.


### .set([key, val] or [config])
**key:** desired config key to set.

**val:** desired value of `mongonaut.config[key]`

**config** object to apply configuration data. Available keys are `user`, `pwd`, `db`, and `collection` which are used to authenticate with MongoDB

**note** trying to set a key other than `user`, `pwd`, `db` or `collection` will result in an error.

**returns:** mongonaut


### .import(targetFile)
**targetFile:** The file (.json, .csv, or .tsv) containing the data you wish to [import to MongoDB](https://docs.mongodb.org/manual/reference/program/mongoimport/).

**returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


## Changelog
**v1.1.0**
* Can now import CSV and TSV files [enchancement/1](https://github.com/otterthecat/mongonaut/issues/1)
* #set() function can either accept key/value arguments, or a config object [enhancement/2](https://github.com/otterthecat/mongonaut/issues/2)
* Bugfix [bug/4](https://github.com/otterthecat/mongonaut/issues/4)

**v1.0.1**
* fixed typo in .npmignore

**v1.0.0**
* Initial release

## Run Tests
In a terminal:
```javascript
npm install
npm test
```