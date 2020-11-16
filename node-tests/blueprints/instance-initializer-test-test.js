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

describe('Blueprint: instance-initializer-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-qunit@4.6.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-qunit', '4.6.0');
      });

      it('instance-initializer-test foo', function() {
        return emberGenerateDestroy(['instance-initializer-test', 'foo'], _file => {
          expect(_file('tests/unit/instance-initializers/foo-test.ts')).to.equal(
            fixture('instance-initializer-test/default.ts')
          );
        });
      });
    });

    describe('with ember-mocha', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
      });

      it('instance-initializer-test foo for mocha', function() {
        return emberGenerateDestroy(['instance-initializer-test', 'foo'], _file => {
          expect(_file('tests/unit/instance-initializers/foo-test.ts')).to.equal(
            fixture('instance-initializer-test/mocha.ts')
          );
        });
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' }).then(() =>
        generateFakePackageManifest('ember-qunit', '4.6.0')
      );
    });

    it('instance-initializer-test foo', function() {
      return emberGenerateDestroy(['instance-initializer-test', 'foo'], _file => {
        expect(_file('tests/unit/instance-initializers/foo-test.ts')).to.equal(
          fixture('instance-initializer-test/dummy.ts')
        );
      });
    });
  });
});
