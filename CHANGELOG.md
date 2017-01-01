# Changelog
## v3.0.0
 * [enhancment/19](https://github.com/otterthecat/mongonaut/issues/19)
  * allow for `numInsertions` flag. Defaults to number of cores on current user's machine. Issue resolved with [spawngo](https://github.com/otterthecat/spawngo) repo, which mongonaut extends.
 * [enhancement/20](https://github.com/otterthecat/mongonaut/issues/20)
  * Change `exec` to `spawn` to remove buffer restriction. Issue resolved with [spawngo](https://github.com/otterthecat/spawngo) repo, which mongonaut extends.
 * [enhancement/21](https://github.com/otterthecat/mongonaut/issues/21)
  * allow for `drop` flag configuration (defaults to false). Issue resolved with [spawngo](https://github.com/otterthecat/spawngo) repo, which mongonaut extends.

* Mongonaut will no longer take an array of files directly.
* Mongonaut's passed data object has been altered from versions previous to `3.0.0`. This is largely due to how `mongoimport` sends to `stdout` and `stderr`.

## v2.4.0
 * [enhancement/24](https://github.com/otterthecat/mongonaut/pull/24)
  * allow to configure host. Default is still localhost.

## v2.3.0
 * [enhancement/16](https://github.com/otterthecat/mongonaut/issues/16)
  * allow for importing non-standard, MongoDB flabvored JSON
 * [enhancement/17](https://github.com/otterthecat/mongonaut/issues/17)
  * add config option for `upsertfields`

## v2.2.1
 * Added missing docs in README

## v2.2.0
 * [enhancement/13](https://github.com/otterthecat/mongonaut/issues/13)
  * created export feature
 * [clean-up/14](https://github.com/otterthecat/mongonaut/issues/14)
  * moved release notes to own file

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