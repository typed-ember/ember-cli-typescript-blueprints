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

const setupTestEnvironment = require('../helpers/setup-test-environment');
const enableOctane = setupTestEnvironment.enableOctane;

describe('Blueprint: controller', function () {
  setupTestHooks(this);

  describe('in app - octane', function () {
    enableOctane();

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

    it('controller foo', function () {
      return emberGenerateDestroy(['controller', 'foo'], (_file) => {
        expect(_file('app/controllers/foo.ts')).to.equal(fixture('controller/controller.ts'));

        expect(_file('tests/unit/controllers/foo-test.ts')).to.equal(
          fixture('controller-test/rfc232.ts')
        );
      });
    });

    it('controller foo.ts', function () {
      return emberGenerateDestroy(['controller', 'foo.ts'], (_file) => {
        expect(_file('app/controllers/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/controllers/foo.ts-test.ts')).to.not.exist;

        expect(_file('app/controllers/foo.ts')).to.equal(fixture('controller/controller.ts'));

        expect(_file('tests/unit/controllers/foo-test.ts')).to.equal(
          fixture('controller-test/rfc232.ts')
        );
      });
    });

    it('controller foo/bar', function () {
      return emberGenerateDestroy(['controller', 'foo/bar'], (_file) => {
        expect(_file('app/controllers/foo/bar.ts')).to.equal(
          fixture('controller/controller-nested.ts')
        );

        expect(_file('tests/unit/controllers/foo/bar-test.ts')).to.equal(
          fixture('controller-test/rfc232-nested.ts')
        );
      });
    });

    it('controller foo --pod', function () {
      return emberGenerateDestroy(['controller', 'foo', '--pod'], (_file) => {
        expect(_file('app/foo/controller.ts')).to.equal(fixture('controller/controller.ts'));

        expect(_file('tests/unit/foo/controller-test.ts')).to.equal(
          fixture('controller-test/rfc232.ts')
        );
      });
    });

    it('controller foo.ts --pod', function () {
      return emberGenerateDestroy(['controller', 'foo.ts', '--pod'], (_file) => {
        expect(_file('app/foo.ts/controller.ts')).to.not.exist;
        expect(_file('tests/unit/foo.ts/controller-test.ts')).to.not.exist;

        expect(_file('app/foo/controller.ts')).to.equal(fixture('controller/controller.ts'));

        expect(_file('tests/unit/foo/controller-test.ts')).to.equal(
          fixture('controller-test/rfc232.ts')
        );
      });
    });

    it('controller foo/bar --pod', function () {
      return emberGenerateDestroy(['controller', 'foo/bar', '--pod'], (_file) => {
        expect(_file('app/foo/bar/controller.ts')).to.equal(
          fixture('controller/controller-nested.ts')
        );

        expect(_file('tests/unit/foo/bar/controller-test.ts')).to.equal(
          fixture('controller-test/rfc232-nested.ts')
        );
      });
    });

    describe('with podModulePrefix', function () {
      enableOctane();
      beforeEach(function () {
        setupPodConfig({ podModulePrefix: true });
      });

      it('controller foo --pod podModulePrefix', function () {
        return emberGenerateDestroy(['controller', 'foo', '--pod'], (_file) => {
          expect(_file('app/pods/foo/controller.ts')).to.equal(fixture('controller/controller.ts'));

          expect(_file('tests/unit/pods/foo/controller-test.ts')).to.equal(
            fixture('controller-test/rfc232.ts')
          );
        });
      });

      it('controller foo.ts --pod podModulePrefix', function () {
        return emberGenerateDestroy(['controller', 'foo.ts', '--pod'], (_file) => {
          expect(_file('app/pods/foo.ts/controller.ts')).to.not.exist;
          expect(_file('tests/unit/pods/foo.ts/controller-test.ts')).to.not.exist;
          expect(_file('app/pods/foo/controller.ts')).to.equal(fixture('controller/controller.ts'));

          expect(_file('tests/unit/pods/foo/controller-test.ts')).to.equal(
            fixture('controller-test/rfc232.ts')
          );
        });
      });

      it('controller foo/bar --pod podModulePrefix', function () {
        return emberGenerateDestroy(['controller', 'foo/bar', '--pod'], (_file) => {
          expect(_file('app/pods/foo/bar/controller.ts')).to.equal(
            fixture('controller/controller-nested.ts')
          );

          expect(_file('tests/unit/pods/foo/bar/controller-test.ts')).to.equal(
            fixture('controller-test/rfc232-nested.ts')
          );
        });
      });
    });
  });

  describe('in addon - octane', function () {
    enableOctane();

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

    it('controller foo', function () {
      return emberGenerateDestroy(['controller', 'foo'], (_file) => {
        expect(_file('addon/controllers/foo.ts')).to.equal(fixture('controller/controller.ts'));

        expect(_file('app/controllers/foo.js')).to.contain(
          "export { default } from 'my-addon/controllers/foo';"
        );

        expect(_file('tests/unit/controllers/foo-test.ts')).to.equal(
          fixture('controller-test/rfc232.ts')
        );
      });
    });

    it('controller foo.ts', function () {
      return emberGenerateDestroy(['controller', 'foo.ts'], (_file) => {
        expect(_file('addon/controllers/foo.ts.ts')).to.not.exist;
        expect(_file('app/controllers/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/controllers/foo.ts-test.ts')).to.not.exist;

        expect(_file('addon/controllers/foo.ts')).to.equal(fixture('controller/controller.ts'));

        expect(_file('app/controllers/foo.js')).to.contain(
          "export { default } from 'my-addon/controllers/foo';"
        );

        expect(_file('tests/unit/controllers/foo-test.ts')).to.equal(
          fixture('controller-test/rfc232.ts')
        );
      });
    });

    it('controller foo/bar', function () {
      return emberGenerateDestroy(['controller', 'foo/bar'], (_file) => {
        expect(_file('addon/controllers/foo/bar.ts')).to.equal(
          fixture('controller/controller-nested.ts')
        );

        expect(_file('app/controllers/foo/bar.js')).to.contain(
          "export { default } from 'my-addon/controllers/foo/bar';"
        );

        expect(_file('tests/unit/controllers/foo/bar-test.ts')).to.equal(
          fixture('controller-test/rfc232-nested.ts')
        );
      });
    });

    it('controller foo --dummy', function () {
      return emberGenerateDestroy(['controller', 'foo', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/controllers/foo.ts')).to.equal(
          fixture('controller/controller.ts')
        );

        expect(_file('app/controllers/foo-test.js')).to.not.exist;

        expect(_file('tests/unit/controllers/foo-test.ts')).to.not.exist;
      });
    });

    it('controller foo.ts --dummy', function () {
      return emberGenerateDestroy(['controller', 'foo.ts', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/controllers/foo.ts.ts')).to.not.exist;

        expect(_file('tests/dummy/app/controllers/foo.ts')).to.equal(
          fixture('controller/controller.ts')
        );

        expect(_file('app/controllers/foo-test.js')).to.not.exist;

        expect(_file('tests/unit/controllers/foo-test.ts')).to.not.exist;
      });
    });

    it('controller foo/bar --dummy', function () {
      return emberGenerateDestroy(['controller', 'foo/bar', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/controllers/foo/bar.ts')).to.equal(
          fixture('controller/controller-nested.ts')
        );

        expect(_file('app/controllers/foo/bar.js')).to.not.exist;

        expect(_file('tests/unit/controllers/foo/bar-test.ts')).to.not.exist;
      });
    });
  });

  describe('in in-repo-addon', function () {
    enableOctane();
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

    it('controller foo --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['controller', 'foo', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/controllers/foo.ts')).to.equal(
          fixture('controller/controller.ts')
        );

        expect(_file('lib/my-addon/app/controllers/foo.js')).to.contain(
          "export { default } from 'my-addon/controllers/foo';"
        );

        expect(_file('tests/unit/controllers/foo-test.ts')).to.equal(
          fixture('controller-test/rfc232.ts')
        );
      });
    });

    it('controller foo.ts --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['controller', 'foo.ts', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/controllers/foo.ts.ts')).to.not.exist;
        expect(_file('lib/my-addon/app/controllers/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/controllers/foo.ts-test.ts')).to.not.exist;

        expect(_file('lib/my-addon/addon/controllers/foo.ts')).to.equal(
          fixture('controller/controller.ts')
        );

        expect(_file('lib/my-addon/app/controllers/foo.js')).to.contain(
          "export { default } from 'my-addon/controllers/foo';"
        );

        expect(_file('tests/unit/controllers/foo-test.ts')).to.equal(
          fixture('controller-test/rfc232.ts')
        );
      });
    });

    it('controller foo/bar --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(
        ['controller', 'foo/bar', '--in-repo-addon=my-addon'],
        (_file) => {
          expect(_file('lib/my-addon/addon/controllers/foo/bar.ts')).to.equal(
            fixture('controller/controller-nested.ts')
          );

          expect(_file('lib/my-addon/app/controllers/foo/bar.js')).to.contain(
            "export { default } from 'my-addon/controllers/foo/bar';"
          );

          expect(_file('tests/unit/controllers/foo/bar-test.ts')).to.equal(
            fixture('controller-test/rfc232-nested.ts')
          );
        }
      );
    });
  });
});
