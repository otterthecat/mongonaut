# Changelog
## v2.1.0
 * [enhancement/11](https://github.com/otterthecat/mongonaut/issues/11)
  * If `user` and `pwd` configs are BOTH not set, then the mongo query will not
invoke authentication.
  * If a `user` config is set without a `pwd`, or vice versa, an error will be thrown.

## v2.0.2
* updated changelog

## v2.0.1
* bumped version in package.json

## v2.0.0
* [enhancement/9](https://github.com/otterthecat/mongonaut/issues/9)
  * `.import()` function can be passed either a string of the path to a single JSON file, or an array of strings each pointing to a JSON file to be imported.

* **breaking change** the returned promise from `.import()` resolving callback
is now passed an array instead of an object.

## v1.1.1
* [bug/7](https://github.com/otterthecat/mongonaut/issues/7)
  * Config property is now sealed before options are applied during instantiation.

## v1.1.0
* [enchancement/1](https://github.com/otterthecat/mongonaut/issues/1)
  * `.set()` function can either accept key/value arguments, or a config object
* [enhancement/2](https://github.com/otterthecat/mongonaut/issues/2)
  * Can now import CSV and TSV files
* Bugfix [bug/4](https://github.com/otterthecat/mongonaut/issues/4)

## v1.0.1
* fixed typo in `.npmignore`

## v1.0.0
* Initial release