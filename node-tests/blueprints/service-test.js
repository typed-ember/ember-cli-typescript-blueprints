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

describe('Blueprint: service', function () {
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

    it('service foo', function () {
      return emberGenerateDestroy(['service', 'foo'], (_file) => {
        expect(_file('app/services/foo.ts')).to.equal(fixture('service/service.ts'));

        expect(_file('tests/unit/services/foo-test.ts')).to.equal(
          fixture('service-test/rfc232.ts')
        );
      });
    });

    it('service foo.ts', function () {
      return emberGenerateDestroy(['service', 'foo.ts'], (_file) => {
        expect(_file('app/services/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/services/foo.ts-test.ts')).to.not.exist;

        expect(_file('app/services/foo.ts')).to.equal(fixture('service/service.ts'));

        expect(_file('tests/unit/services/foo-test.ts')).to.equal(
          fixture('service-test/rfc232.ts')
        );
      });
    });

    it('service foo/bar', function () {
      return emberGenerateDestroy(['service', 'foo/bar'], (_file) => {
        expect(_file('app/services/foo/bar.ts')).to.equal(fixture('service/service-nested.ts'));

        expect(_file('tests/unit/services/foo/bar-test.ts')).to.equal(
          fixture('service-test/rfc232-nested.ts')
        );
      });
    });

    it('service foo --pod', function () {
      return emberGenerateDestroy(['service', 'foo', '--pod'], (_file) => {
        expect(_file('app/foo/service.ts')).to.equal(fixture('service/service.ts'));

        expect(_file('tests/unit/foo/service-test.ts')).to.equal(fixture('service-test/rfc232.ts'));
      });
    });

    it('service foo.ts --pod', function () {
      return emberGenerateDestroy(['service', 'foo.ts', '--pod'], (_file) => {
        expect(_file('app/foo.ts/service.ts')).to.not.exist;
        expect(_file('tests/unit/foo.ts/service-test.ts')).to.not.exist;

        expect(_file('app/foo/service.ts')).to.equal(fixture('service/service.ts'));

        expect(_file('tests/unit/foo/service-test.ts')).to.equal(fixture('service-test/rfc232.ts'));
      });
    });

    it('service foo/bar --pod', function () {
      return emberGenerateDestroy(['service', 'foo/bar', '--pod'], (_file) => {
        expect(_file('app/foo/bar/service.ts')).to.equal(fixture('service/service-nested.ts'));

        expect(_file('tests/unit/foo/bar/service-test.ts')).to.equal(
          fixture('service-test/rfc232-nested.ts')
        );
      });
    });

    describe('with podModulePrefix', function () {
      enableOctane();

      beforeEach(function () {
        setupPodConfig({ podModulePrefix: true });
      });

      it('service foo --pod', function () {
        return emberGenerateDestroy(['service', 'foo', '--pod'], (_file) => {
          expect(_file('app/pods/foo/service.ts')).to.equal(fixture('service/service.ts'));

          expect(_file('tests/unit/pods/foo/service-test.ts')).to.equal(
            fixture('service-test/rfc232.ts')
          );
        });
      });

      it('service foo.ts --pod', function () {
        return emberGenerateDestroy(['service', 'foo.ts', '--pod'], (_file) => {
          expect(_file('app/pods/foo.ts/service.ts')).to.not.exist;
          expect(_file('tests/unit/pods/foo.ts/service-test.ts')).to.not.exist;

          expect(_file('app/pods/foo/service.ts')).to.equal(fixture('service/service.ts'));

          expect(_file('tests/unit/pods/foo/service-test.ts')).to.equal(
            fixture('service-test/rfc232.ts')
          );
        });
      });

      it('service foo/bar --pod', function () {
        return emberGenerateDestroy(['service', 'foo/bar', '--pod'], (_file) => {
          expect(_file('app/pods/foo/bar/service.ts')).to.equal(
            fixture('service/service-nested.ts')
          );

          expect(_file('tests/unit/pods/foo/bar/service-test.ts')).to.equal(
            fixture('service-test/rfc232-nested.ts')
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

    it('service foo', function () {
      return emberGenerateDestroy(['service', 'foo'], (_file) => {
        expect(_file('addon/services/foo.ts')).to.equal(fixture('service/service.ts'));

        expect(_file('app/services/foo.js')).to.contain(
          "export { default } from 'my-addon/services/foo';"
        );

        expect(_file('tests/unit/services/foo-test.ts')).to.equal(
          fixture('service-test/rfc232.ts')
        );
      });
    });

    it('service foo.ts', function () {
      return emberGenerateDestroy(['service', 'foo.ts'], (_file) => {
        expect(_file('addon/services/foo.ts.ts')).to.not.exist;
        expect(_file('app/services/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/services/foo.ts-test.ts')).to.not.exist;

        expect(_file('addon/services/foo.ts')).to.equal(fixture('service/service.ts'));

        expect(_file('app/services/foo.js')).to.contain(
          "export { default } from 'my-addon/services/foo';"
        );

        expect(_file('tests/unit/services/foo-test.ts')).to.equal(
          fixture('service-test/rfc232.ts')
        );
      });
    });

    it('service foo/bar', function () {
      return emberGenerateDestroy(['service', 'foo/bar'], (_file) => {
        expect(_file('addon/services/foo/bar.ts')).to.equal(fixture('service/service-nested.ts'));

        expect(_file('app/services/foo/bar.js')).to.contain(
          "export { default } from 'my-addon/services/foo/bar';"
        );

        expect(_file('tests/unit/services/foo/bar-test.ts')).to.equal(
          fixture('service-test/rfc232-nested.ts')
        );
      });
    });

    it('service foo/bar --dummy', function () {
      return emberGenerateDestroy(['service', 'foo/bar', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/services/foo/bar.ts')).to.equal(
          fixture('service/service-nested.ts')
        );
        expect(_file('addon/services/foo/bar.ts')).to.not.exist;
      });
    });

    it('service foo/bar.ts --dummy', function () {
      return emberGenerateDestroy(['service', 'foo/bar.ts', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/services/foo/bar.ts.ts')).to.not.exist;

        expect(_file('tests/dummy/app/services/foo/bar.ts')).to.equal(
          fixture('service/service-nested.ts')
        );
        expect(_file('addon/services/foo/bar.ts')).to.not.exist;
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

    it('service foo --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['service', 'foo', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/services/foo.ts')).to.equal(fixture('service/service.ts'));

        expect(_file('lib/my-addon/app/services/foo.js')).to.contain(
          "export { default } from 'my-addon/services/foo';"
        );

        expect(_file('tests/unit/services/foo-test.ts')).to.equal(
          fixture('service-test/rfc232.ts')
        );
      });
    });

    it('service foo.ts --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['service', 'foo.ts', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/services/foo.ts.ts')).to.not.exist;
        expect(_file('lib/my-addon/app/services/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/services/foo.ts-test.ts')).to.not.exist;

        expect(_file('lib/my-addon/addon/services/foo.ts')).to.equal(fixture('service/service.ts'));

        expect(_file('lib/my-addon/app/services/foo.js')).to.contain(
          "export { default } from 'my-addon/services/foo';"
        );

        expect(_file('tests/unit/services/foo-test.ts')).to.equal(
          fixture('service-test/rfc232.ts')
        );
      });
    });

    it('service foo/bar --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['service', 'foo/bar', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/services/foo/bar.ts')).to.equal(
          fixture('service/service-nested.ts')
        );

        expect(_file('lib/my-addon/app/services/foo/bar.js')).to.contain(
          "export { default } from 'my-addon/services/foo/bar';"
        );

        expect(_file('tests/unit/services/foo/bar-test.ts')).to.equal(
          fixture('service-test/rfc232-nested.ts')
        );
      });
    });
  });
});
