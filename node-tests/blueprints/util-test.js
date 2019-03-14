'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const setupPodConfig = blueprintHelpers.setupPodConfig;
const modifyPackages = blueprintHelpers.modifyPackages;
const expectError = require('../helpers/expect-error');

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

const setupTestEnvironment = require('../helpers/setup-test-environment');
const enableModuleUnification = setupTestEnvironment.enableModuleUnification;

describe('Blueprint: util', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew()
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('util foo-bar', function() {
      return emberGenerateDestroy(['util', 'foo-bar'], _file => {
        expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/default.ts'));
      });
    });

    it('util foo/bar-baz', function() {
      return emberGenerateDestroy(['util', 'foo/bar-baz'], _file => {
        expect(_file('app/utils/foo/bar-baz.ts')).to.equal(fixture('util/util-nested.ts'));

        expect(_file('tests/unit/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/default-nested.ts')
        );
      });
    });

    it('util foo-bar --pod', function() {
      return emberGenerateDestroy(['util', 'foo-bar', '--pod'], _file => {
        expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/default.ts'));
      });
    });

    it('util foo/bar-baz --pod', function() {
      return emberGenerateDestroy(['util', 'foo/bar-baz', '--pod'], _file => {
        expect(_file('app/utils/foo/bar-baz.ts')).to.equal(fixture('util/util-nested.ts'));

        expect(_file('tests/unit/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/default-nested.ts')
        );
      });
    });

    describe('with podModulePrefix', function() {
      beforeEach(function() {
        return setupPodConfig({ podModulePrefix: true });
      });

      it('util foo-bar --pod', function() {
        return emberGenerateDestroy(['util', 'foo-bar', '--pod'], _file => {
          expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

          expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(
            fixture('util-test/default.ts')
          );
        });
      });
    });
  });

  describe('in app - module unification', function() {
    enableModuleUnification();

    beforeEach(function() {
      return emberNew()
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('util foo-bar', function() {
      return emberGenerateDestroy(['util', 'foo-bar'], _file => {
        expect(_file('src/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('src/utils/foo-bar-test.ts')).to.equal(fixture('util-test/default.ts'));
      });
    });

    it('util foo/bar-baz', function() {
      return emberGenerateDestroy(['util', 'foo/bar-baz'], _file => {
        expect(_file('src/utils/foo/bar-baz.ts')).to.equal(fixture('util/util-nested.ts'));

        expect(_file('src/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/default-nested.ts')
        );
      });
    });

    it('util foo-bar --pod', function() {
      return expectError(
        emberGenerateDestroy(['util', 'foo-bar', '--pod']),
        "Pods aren't supported within a module unification app"
      );
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' })
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('util foo-bar', function() {
      return emberGenerateDestroy(['util', 'foo-bar'], _file => {
        expect(_file('addon/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('app/utils/foo-bar.js')).to.contain(
          "export { default } from 'my-addon/utils/foo-bar';"
        );

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(
          fixture('util-test/addon-default.ts')
        );
      });
    });

    it('util foo/bar-baz', function() {
      return emberGenerateDestroy(['util', 'foo/bar-baz'], _file => {
        expect(_file('addon/utils/foo/bar-baz.ts')).to.equal(fixture('util/util-nested.ts'));

        expect(_file('app/utils/foo/bar-baz.js')).to.contain(
          "export { default } from 'my-addon/utils/foo/bar-baz';"
        );

        expect(_file('tests/unit/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/addon-default-nested.ts')
        );
      });
    });

    it('util foo/bar-baz --dummy', function() {
      return emberGenerateDestroy(['util', 'foo/bar-baz', '--dummy'], _file => {
        expect(_file('tests/dummy/app/utils/foo/bar-baz.ts')).to.equal(
          fixture('util/util-nested.ts')
        );

        expect(_file('addon/utils/foo/bar-baz.ts')).to.not.exist;
      });
    });
  });

  describe('in addon - module unification', function() {
    enableModuleUnification();

    beforeEach(function() {
      return emberNew({ target: 'addon' })
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('util foo-bar', function() {
      return emberGenerateDestroy(['util', 'foo-bar'], _file => {
        expect(_file('src/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('src/utils/foo-bar-test.ts')).to.equal(fixture('util-test/addon-default.ts'));

        expect(_file('app/utils/foo-bar.ts')).to.not.exist;
      });
    });

    it('util foo-bar/baz', function() {
      return emberGenerateDestroy(['util', 'foo/bar-baz'], _file => {
        expect(_file('src/utils/foo/bar-baz.ts')).to.equal(fixture('util/util-nested.ts'));

        expect(_file('src/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/addon-default-nested.ts')
        );

        expect(_file('app/utils/foo/bar-baz.ts')).to.not.exist;
      });
    });

    it('util foo/bar-baz --dummy', function() {
      return emberGenerateDestroy(['util', 'foo/bar-baz', '--dummy'], _file => {
        expect(_file('tests/dummy/src/utils/foo/bar-baz.ts')).to.equal(
          fixture('util/util-nested.ts')
        );

        expect(_file('src/utils/foo/bar-baz.ts')).to.not.exist;
      });
    });
  });

  describe('in in-repo-addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'in-repo-addon' })
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('util foo-bar --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(['util', 'foo-bar', '--in-repo-addon=my-addon'], _file => {
        expect(_file('lib/my-addon/addon/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('lib/my-addon/app/utils/foo-bar.js')).to.contain(
          "export { default } from 'my-addon/utils/foo-bar';"
        );

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/default.ts'));
      });
    });

    it('util foo/bar-baz --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(['util', 'foo/bar-baz', '--in-repo-addon=my-addon'], _file => {
        expect(_file('lib/my-addon/addon/utils/foo/bar-baz.ts')).to.equal(
          fixture('util/util-nested.ts')
        );

        expect(_file('lib/my-addon/app/utils/foo/bar-baz.js')).to.contain(
          "export { default } from 'my-addon/utils/foo/bar-baz';"
        );

        expect(_file('tests/unit/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/default-nested.ts')
        );
      });
    });
  });
});
