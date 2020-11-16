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

describe('Blueprint: helper-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-qunit@4.6.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-qunit', '4.6.0');
      });

      it('helper-test foo/bar-baz', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts'))
            .to.equal(fixture('helper-test/integration.ts'));
        });
      });

      it('helper-test foo/bar-baz --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('tests/unit/helpers/foo/bar-baz-test.ts'))
            .to.equal(fixture('helper-test/unit.ts'));
        });
      });
    });

    describe('with ember-mocha@0.16.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-mocha', dev: true }
        ]);
        generateFakePackageManifest('ember-mocha', '0.16.0');
      });

      it('helper-test foo/bar-baz for mocha', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts'))
            .to.equal(fixture('helper-test/mocha.ts'));
        });
      });

      it('helper-test foo/bar-baz for mocha --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('tests/unit/helpers/foo/bar-baz-test.ts'))
            .to.equal(fixture('helper-test/mocha-unit.ts'));
        });
      });
    });
  });
});
