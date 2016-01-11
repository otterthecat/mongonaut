# Mongonaut
NodeJS module that totally Promises to import JSON files to MongoDB.

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

### .set(key, val)
**key:** desired config key to set.

**val:** desired value of `mongonaut.config[key]`

**returns:** mongonaut

### .import(jsonFile)
**jsonFile:** The JSON file containing the data you wish to [import to MongoDB](https://docs.mongodb.org/manual/reference/program/mongoimport/).

**returns:** [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Run Tests
In a terminal:
```javascript
npm install
npm test
```