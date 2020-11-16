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

describe('Blueprint: route-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-qunit@4.6.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-qunit', '4.6.0');
      });

      it('route-test foo', function() {
        return emberGenerateDestroy(['route-test', 'foo'], _file => {
          expect(_file('tests/unit/routes/foo-test.ts')).to.equal(fixture('route-test/default.ts'));
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

      it('route-test foo', function() {
        return emberGenerateDestroy(['route-test', 'foo'], _file => {
          expect(_file('tests/unit/routes/foo-test.ts')).to.equal(fixture('route-test/mocha.ts'));
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

    it('route-test foo', function() {
      return emberGenerateDestroy(['route-test', 'foo'], _file => {
        expect(_file('tests/unit/routes/foo-test.ts')).to.equal(fixture('route-test/default.ts'));
      });
    });
  });
});
