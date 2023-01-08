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

describe('Blueprint: component-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-cli-qunit@4.6.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('component-test x-foo', function() {
        return emberGenerateDestroy(['component-test', 'x-foo'], _file => {
          expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
            fixture('component-test/qunit.ts')
          );
        });
      });

    });

    describe('with ember-mocha@0.16.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-cli-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-mocha', '0.16.0');
      });

      it('component-test x-foo', function() {
        return emberGenerateDestroy(['component-test', 'x-foo'], _file => {
          expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
            fixture('component-test/mocha.ts')
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

    it('component-test x-foo', function() {
      return emberGenerateDestroy(['component-test', 'x-foo'], _file => {
        expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
          fixture('component-test/qunit.ts')
        );

        expect(_file('app/component-test/x-foo.ts')).to.not.exist;
      });
    });

    it('component-test x-foo --dummy', function() {
      return emberGenerateDestroy(['component-test', 'x-foo', '--dummy'], _file => {
        expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
          fixture('component-test/qunit.ts')
        );

        expect(_file('app/component-test/x-foo.ts')).to.not.exist;
      });
    });
  });

  describe('in in-repo-addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'in-repo-addon' }).then(() =>
        generateFakePackageManifest('ember-qunit', '4.6.0')
      );
    });

    it('component-test x-foo --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(
        ['component-test', 'x-foo', '--in-repo-addon=my-addon'],
        _file => {
          expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
            fixture('component-test/qunit.ts')
          );
        }
      );
    });
  });
});
