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

describe('Blueprint: service-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-qunit@4.6.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-qunit', '4.6.0');
      });

      it('service-test foo', function() {
        return emberGenerateDestroy(['service-test', 'foo'], _file => {
          expect(_file('tests/unit/services/foo-test.ts')).to.equal(
            fixture('service-test/default.ts')
          );
        });
      });
    });

    describe('with ember-mocha@0.16.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-mocha', '0.16.0');
      });

      it('service-test foo', function() {
        return emberGenerateDestroy(['service-test', 'foo'], _file => {
          expect(_file('tests/unit/services/foo-test.ts')).to.equal(
            fixture('service-test/mocha.ts')
          );
        });
      });

      it('service-test foo --pod', function() {
        return emberGenerateDestroy(['service-test', 'foo', '--pod'], _file => {
          expect(_file('tests/unit/foo/service-test.ts')).to.equal(
            fixture('service-test/mocha.ts')
          );
        });
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' });
    });

    describe('with ember-qunit@4.6.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-qunit', '4.6.0');
      });

      it('service-test foo', function() {
        return emberGenerateDestroy(['service-test', 'foo'], _file => {
          expect(_file('tests/unit/services/foo-test.ts')).to.equal(
            fixture('service-test/default.ts')
          );

          expect(_file('app/service-test/foo.ts')).to.not.exist;
        });
      });
    });
  });
});
