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

describe('Blueprint: initializer-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-qunit@4.6.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-qunit', '4.6.0');
      });

      it('initializer-test foo', function() {
        return emberGenerateDestroy(['initializer-test', 'foo'], _file => {
          expect(_file('tests/unit/initializers/foo-test.ts')).to.equal(
            fixture('initializer-test/default.ts')
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

      it('initializer-test foo', function() {
        return emberGenerateDestroy(['initializer-test', 'foo'], _file => {
          expect(_file('tests/unit/initializers/foo-test.ts')).to.equal(
            fixture('initializer-test/mocha.ts')
          );
        });
      });
    });
  });
});
