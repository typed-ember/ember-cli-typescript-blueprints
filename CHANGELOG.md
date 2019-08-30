# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2019

### 🎉 Added

- Generators for Glimmer components

### 💥 Breaking

- Removes support for Module Unification, in line with [its removal][MU] from Ember's roadmap in favor of other directions.
- Removes support for Node 6

[MU]: https://blog.emberjs.com/2019/03/11/update-on-module-unification-and-octane.html

## [2.0.0] - 2019-03-13

This release formalizes the contents of `2.0.0-beta.1` as a stable release. It also includes refreshes to several blueprints by [@simonihmig](https://github.com/simonihmig) 👏

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
[unreleased]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/v3.0.0...master
[3.0.0]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/v2.0.0-beta.1...v2.0.0
[2.0.0-beta.1]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/v1.2.0...v2.0.0-beta.1
[1.2.0]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/typed-ember/ember-cli-typescript-blueprints/compare/54697b4...v1.1.0
