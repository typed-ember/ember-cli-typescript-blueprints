'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

describe('Blueprint: acceptance-test', function () {
  setupTestHooks(this);

  describe('in app', function () {
    beforeEach(function () {
      return emberNew();
    });

    describe('with ember-cli-qunit@4.2.0', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('acceptance-test foo', function () {
        return emberGenerateDestroy(['acceptance-test', 'foo'], (_file) => {
          expect(_file('tests/acceptance/foo-test.ts')).to.equal(
            fixture('acceptance-test/qunit-rfc268.ts')
          );
        });
      });
    });

    describe('with ember-cli-mocha', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
      });

      it('acceptance-test foo', function () {
        return emberGenerateDestroy(['acceptance-test', 'foo'], (_file) => {
          expect(_file('tests/acceptance/foo-test.ts')).to.equal(
            fixture('acceptance-test/mocha.ts')
          );
        });
      });
    });

    describe('with ember-mocha@0.14.0', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('acceptance-test foo', function () {
        return emberGenerateDestroy(['acceptance-test', 'foo'], (_file) => {
          expect(_file('tests/acceptance/foo-test.ts')).to.equal(
            fixture('acceptance-test/mocha-rfc268.ts')
          );
        });
      });
    });
  });

  describe('in addon', function () {
    beforeEach(function () {
      return emberNew({ target: 'addon' });
    });

    describe('with ember-cli-qunit@4.2.0', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('acceptance-test foo', function () {
        return emberGenerateDestroy(['acceptance-test', 'foo'], (_file) => {
          expect(_file('tests/acceptance/foo-test.ts')).to.equal(
            fixture('acceptance-test/qunit-rfc268.ts')
          );
        });
      });
    });
  });
});
