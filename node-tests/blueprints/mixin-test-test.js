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

describe('Blueprint: mixin-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew().then(() => generateFakePackageManifest('ember-qunit', '4.6.0'));
    });

    it('mixin-test foo', function() {
      return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
        expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(fixture('mixin-test/default.ts'));
      });
    });

    describe('with ember-mocha', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
      });

      it('mixin-test foo', function() {
        return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
          expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(fixture('mixin-test/mocha.ts'));
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

    it('mixin-test foo', function() {
      return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
        expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(fixture('mixin-test/addon.ts'));
      });
    });
  });
});
