# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0-beta.1] - 2018-10-25

### Changed
- Both `ember-cli-babel` and `ember-cli-typescript` are now added as `dependencies` when generating in-repo addons (#11)
- We no longer generate `.ts` files for addons' `app` re-exports, as those files aren't handled by the addons' own preprocessors, but rather the host app's (#11)

## [1.2.0] - 2018-10-03

### Updated
- Ember Data blueprints now align with the per-type registry files (#10)

## [1.1.0] - 2018-09-10

### Added
- Support for generating components in a module unification project (#8)

## 1.0.0 - 2018-08-21

This release was the initial import of all existing blueprints from [ember-cli-typescript].

[ember-cli-typescript]: https://github.com/typed-ember/ember-cli-typescript
[unreleased]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/v2.0.0-beta.1...v2
[2.0.0-beta.1]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/v1.2.0...v2.0.0-beta.1
[1.2.0]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/54697b4...v1.1.0
