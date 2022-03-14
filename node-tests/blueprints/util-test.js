'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const setupPodConfig = blueprintHelpers.setupPodConfig;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

describe('Blueprint: util', function () {
  setupTestHooks(this);

  describe('in app', function () {
    beforeEach(function () {
      return emberNew()
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.2.0'));
    });

    it('util foo-bar', function () {
      return emberGenerateDestroy(['util', 'foo-bar'], (_file) => {
        expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/rfc232.ts'));
      });
    });

    it('util foo-bar.ts', function () {
      return emberGenerateDestroy(['util', 'foo-bar.ts'], (_file) => {
        expect(_file('app/utils/foo-bar.ts.ts')).to.not.exist;
        expect(_file('tests/unit/utils/foo-bar.ts-test.ts')).to.not.exist;

        expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/rfc232.ts'));
      });
    });

    it('util foo/bar-baz', function () {
      return emberGenerateDestroy(['util', 'foo/bar-baz'], (_file) => {
        expect(_file('app/utils/foo/bar-baz.ts')).to.equal(fixture('util/util-nested.ts'));

        expect(_file('tests/unit/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/rfc232-nested.ts')
        );
      });
    });

    it('util foo-bar --pod', function () {
      return emberGenerateDestroy(['util', 'foo-bar', '--pod'], (_file) => {
        expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/rfc232.ts'));
      });
    });

    it('util foo-bar.ts --pod', function () {
      return emberGenerateDestroy(['util', 'foo-bar.ts', '--pod'], (_file) => {
        expect(_file('app/utils/foo-bar.ts.ts')).to.not.exist;
        expect(_file('tests/unit/utils/foo-bar.ts-test.ts')).to.not.exist;

        expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/rfc232.ts'));
      });
    });

    it('util foo/bar-baz --pod', function () {
      return emberGenerateDestroy(['util', 'foo/bar-baz', '--pod'], (_file) => {
        expect(_file('app/utils/foo/bar-baz.ts')).to.equal(fixture('util/util-nested.ts'));

        expect(_file('tests/unit/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/rfc232-nested.ts')
        );
      });
    });

    describe('with podModulePrefix', function () {
      beforeEach(function () {
        return setupPodConfig({ podModulePrefix: true });
      });

      it('util foo-bar --pod', function () {
        return emberGenerateDestroy(['util', 'foo-bar', '--pod'], (_file) => {
          expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

          expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(
            fixture('util-test/rfc232.ts')
          );
        });
      });

      it('util foo-bar.ts --pod', function () {
        return emberGenerateDestroy(['util', 'foo-bar.ts', '--pod'], (_file) => {
          expect(_file('app/utils/foo-bar.ts.ts')).to.not.exist;
          expect(_file('tests/unit/utils/foo-bar.ts-test.ts')).to.not.exist;

          expect(_file('app/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

          expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(
            fixture('util-test/rfc232.ts')
          );
        });
      });
    });
  });

  describe('in addon', function () {
    beforeEach(function () {
      return emberNew({ target: 'addon' })
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.2.0'));
    });

    it('util foo-bar', function () {
      return emberGenerateDestroy(['util', 'foo-bar'], (_file) => {
        expect(_file('addon/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('app/utils/foo-bar.js')).to.contain(
          "export { default } from 'my-addon/utils/foo-bar';"
        );

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(
          fixture('util-test/rfc232-addon.ts')
        );
      });
    });

    it('util foo-bar.ts', function () {
      return emberGenerateDestroy(['util', 'foo-bar.ts'], (_file) => {
        expect(_file('addon/utils/foo-bar.ts.ts')).to.not.exist;
        expect(_file('app/utils/foo-bar.ts.ts')).to.not.exist;
        expect(_file('tests/unit/utils/foo-bar.ts-test.ts')).to.not.exist;

        expect(_file('addon/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('app/utils/foo-bar.js')).to.contain(
          "export { default } from 'my-addon/utils/foo-bar';"
        );

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(
          fixture('util-test/rfc232-addon.ts')
        );
      });
    });

    it('util foo/bar-baz', function () {
      return emberGenerateDestroy(['util', 'foo/bar-baz'], (_file) => {
        expect(_file('addon/utils/foo/bar-baz.ts')).to.equal(fixture('util/util-nested.ts'));

        expect(_file('app/utils/foo/bar-baz.js')).to.contain(
          "export { default } from 'my-addon/utils/foo/bar-baz';"
        );

        expect(_file('tests/unit/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/rfc232-addon-nested.ts')
        );
      });
    });

    it('util foo/bar-baz --dummy', function () {
      return emberGenerateDestroy(['util', 'foo/bar-baz', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/utils/foo/bar-baz.ts')).to.equal(
          fixture('util/util-nested.ts')
        );

        expect(_file('addon/utils/foo/bar-baz.ts')).to.not.exist;
      });
    });
  });

  describe('in in-repo-addon', function () {
    beforeEach(function () {
      return emberNew({ target: 'in-repo-addon' })
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.2.0'));
    });

    it('util foo-bar --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['util', 'foo-bar', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('lib/my-addon/app/utils/foo-bar.js')).to.contain(
          "export { default } from 'my-addon/utils/foo-bar';"
        );

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/rfc232.ts'));
      });
    });

    it('util foo-bar.ts --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['util', 'foo-bar.ts', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/utils/foo-bar.ts.ts')).to.not.exist;
        expect(_file('lib/my-addon/app/utils/foo-bar.ts.ts')).to.not.exist;
        expect(_file('tests/unit/utils/foo-bar.ts-test.ts')).to.not.exist;

        expect(_file('lib/my-addon/addon/utils/foo-bar.ts')).to.equal(fixture('util/util.ts'));

        expect(_file('lib/my-addon/app/utils/foo-bar.js')).to.contain(
          "export { default } from 'my-addon/utils/foo-bar';"
        );

        expect(_file('tests/unit/utils/foo-bar-test.ts')).to.equal(fixture('util-test/rfc232.ts'));
      });
    });

    it('util foo/bar-baz --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['util', 'foo/bar-baz', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/utils/foo/bar-baz.ts')).to.equal(
          fixture('util/util-nested.ts')
        );

        expect(_file('lib/my-addon/app/utils/foo/bar-baz.js')).to.contain(
          "export { default } from 'my-addon/utils/foo/bar-baz';"
        );

        expect(_file('tests/unit/utils/foo/bar-baz-test.ts')).to.equal(
          fixture('util-test/rfc232-nested.ts')
        );
      });
    });
  });
});
