'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const chai = require('ember-cli-blueprint-test-helpers/chai');
const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');
const setupTestEnvironment = require('../helpers/setup-test-environment');

const SilentError = require('silent-error');

const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerate = blueprintHelpers.emberGenerate;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;

const expect = chai.expect;
const enableOctane = setupTestEnvironment.enableOctane;
const enableClassic = setupTestEnvironment.enableClassic;

describe('Acceptance: generate and destroy adapter blueprints', function () {
  setupTestHooks(this);

  describe('classic', function () {
    enableClassic();
    beforeEach(function () {
      return emberNew();
    });

    it('adapter', function () {
      let args = ['adapter', 'foo'];

      return emberGenerateDestroy(args, (_file) => {
        expect(_file('app/adapters/foo.js'))
          .to.contain(`import JSONAPIAdapter from '@ember-data/adapter/json-api';`)
          .to.contain('export default JSONAPIAdapter.extend({})');

        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    it('adapter extends application adapter if it exists', function () {
      let args = ['adapter', 'foo'];

      return emberGenerate(['adapter', 'application']).then(() =>
        emberGenerateDestroy(args, (_file) => {
          expect(_file('app/adapters/foo.js'))
            .to.contain("import ApplicationAdapter from './application';")
            .to.contain('export default ApplicationAdapter.extend({})');

          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        })
      );
    });

    it('adapter with --base-class', function () {
      let args = ['adapter', 'foo', '--base-class=bar'];

      return emberGenerateDestroy(args, (_file) => {
        expect(_file('app/adapters/foo.js'))
          .to.contain("import BarAdapter from './bar';")
          .to.contain('export default BarAdapter.extend({})');

        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    xit('adapter throws when --base-class is same as name', function () {
      let args = ['adapter', 'foo', '--base-class=foo'];

      return expect(emberGenerate(args)).to.be.rejectedWith(
        SilentError,
        /Adapters cannot extend from themself/
      );
    });

    it('adapter when is named "application"', function () {
      let args = ['adapter', 'application'];

      return emberGenerateDestroy(args, (_file) => {
        expect(_file('app/adapters/application.js'))
          .to.contain(`import JSONAPIAdapter from '@ember-data/adapter/json-api';`)
          .to.contain('export default JSONAPIAdapter.extend({})');

        expect(_file('tests/unit/adapters/application-test.ts')).to.equal(
          fixture('adapter-test/application-default.ts')
        );
      });
    });

    it('adapter-test', function () {
      let args = ['adapter-test', 'foo'];

      return emberGenerateDestroy(args, (_file) => {
        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    describe('adapter-test with ember-cli-qunit@4.1.0', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', delete: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('adapter-test-test foo', function () {
        return emberGenerateDestroy(['adapter-test', 'foo'], (_file) => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/foo-default.ts')
          );
        });
      });
    });

    describe('with ember-cli-mocha v0.12+', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.12.0');
      });

      it('adapter-test for mocha v0.12+', function () {
        let args = ['adapter-test', 'foo'];

        return emberGenerateDestroy(args, (_file) => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/foo-mocha-0.12.ts')
          );
        });
      });
    });

    describe('with ember-mocha v0.14+', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('adapter-test for mocha v0.14+', function () {
        return emberGenerateDestroy(['adapter-test', 'foo'], (_file) => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/mocha-rfc232.ts')
          );
        });
      });
    });
  });

  describe('octane', function () {
    enableOctane();

    beforeEach(function () {
      return emberNew();
    });

    it('adapter', function () {
      let args = ['adapter', 'foo'];

      return emberGenerateDestroy(args, (_file) => {
        expect(_file('app/adapters/foo.ts'))
          .to.contain(`import JSONAPIAdapter from '@ember-data/adapter/json-api';`)
          .to.contain('export default class FooAdapter extends JSONAPIAdapter {');

        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    it('adapter extends application adapter if it exists', function () {
      let args = ['adapter', 'foo'];

      return emberGenerate(['adapter', 'application']).then(() =>
        emberGenerateDestroy(args, (_file) => {
          expect(_file('app/adapters/foo.ts'))
            .to.contain("import ApplicationAdapter from './application';")
            .to.contain('export default class FooAdapter extends ApplicationAdapter {');

          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        })
      );
    });

    it('adapter with --base-class', function () {
      let args = ['adapter', 'foo', '--base-class=bar'];

      return emberGenerateDestroy(args, (_file) => {
        expect(_file('app/adapters/foo.ts'))
          .to.contain("import BarAdapter from './bar';")
          .to.contain('export default class FooAdapter extends BarAdapter {');

        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    it('adapter when is named "application"', function () {
      let args = ['adapter', 'application'];

      return emberGenerateDestroy(args, (_file) => {
        expect(_file('app/adapters/application.ts'))
          .to.contain(`import JSONAPIAdapter from '@ember-data/adapter/json-api';`)
          .to.contain('export default class ApplicationAdapter extends JSONAPIAdapter {');

        expect(_file('tests/unit/adapters/application-test.ts')).to.equal(
          fixture('adapter-test/application-default.ts')
        );
      });
    });

    it('adapter-test', function () {
      let args = ['adapter-test', 'foo'];

      return emberGenerateDestroy(args, (_file) => {
        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    describe('adapter-test with ember-cli-qunit@4.1.0', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', delete: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('adapter-test-test foo', function () {
        return emberGenerateDestroy(['adapter-test', 'foo'], (_file) => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/foo-default.ts')
          );
        });
      });
    });

    describe('with ember-cli-mocha v0.12+', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.12.0');
      });

      it('adapter-test for mocha v0.12+', function () {
        let args = ['adapter-test', 'foo'];

        return emberGenerateDestroy(args, (_file) => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/foo-mocha-0.12.ts')
          );
        });
      });
    });

    describe('with ember-mocha v0.14+', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('adapter-test for mocha v0.14+', function () {
        let args = ['adapter-test', 'foo'];

        return emberGenerateDestroy(args, (_file) => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/mocha-rfc232.ts')
          );
        });
      });
    });
  });
});
