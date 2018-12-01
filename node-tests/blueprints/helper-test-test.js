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
const fs = require('fs-extra');

describe('Blueprint: helper-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('helper-test foo/bar-baz', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/integration.ts')
          );
        });
      });

      it('helper-test foo/bar-baz --integration', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--integration'], _file => {
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/integration.ts')
          );
        });
      });
    });

    describe('with ember-cli-qunit@4.2.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('helper-test foo/bar-baz', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/rfc232.ts')
          );
        });
      });

      it('helper-test foo/bar-baz --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('tests/unit/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/rfc232-unit.ts')
          );
        });
      });
    });

    describe('with ember-cli-mocha@0.11.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-cli-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.11.0');
      });

      it('helper-test foo/bar-baz --integration', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha.ts')
          );
        });
      });

      it('helper-test foo/bar-baz --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('tests/unit/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-unit.ts')
          );
        });
      });
    });

    describe('with ember-cli-mocha@0.12.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-cli-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.12.0');
      });

      it('helper-test foo/bar-baz for mocha', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-0.12.ts')
          );
        });
      });

      it('helper-test foo/bar-baz for mocha --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('tests/unit/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-0.12-unit.ts')
          );
        });
      });
    });

    describe('with ember-mocha@0.14.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-cli-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('helper-test foo/bar-baz for mocha', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-rfc232.ts')
          );
        });
      });

      it('helper-test foo/bar-baz for mocha --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('tests/unit/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-rfc232-unit.ts')
          );
        });
      });
    });
  });

  describe('in app - module unification', function() {
    beforeEach(function() {
      return emberNew().then(() => fs.ensureDirSync('src'));
    });

    describe('with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('helper-test foo/bar-baz', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/integration.ts')
          );
        });
      });

      it('helper-test foo/bar-baz --integration', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--integration'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/integration.ts')
          );
        });
      });
    });

    describe('with ember-cli-qunit@4.2.0', function() {
      beforeEach(function() {
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('helper-test foo/bar-baz', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/rfc232.ts')
          );
        });
      });

      it('helper-test foo/bar-baz --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/rfc232-unit.ts')
          );
        });
      });
    });

    describe('with ember-cli-mocha@0.11.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-cli-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.11.0');
      });

      it('helper-test foo/bar-baz --integration', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha.ts')
          );
        });
      });

      it('helper-test foo/bar-baz --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-unit.ts')
          );
        });
      });
    });

    describe('with ember-cli-mocha@0.12.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-cli-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.12.0');
      });

      it('helper-test foo/bar-baz for mocha', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-0.12.ts')
          );
        });
      });

      it('helper-test foo/bar-baz for mocha --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-0.12-unit.ts')
          );
        });
      });
    });

    describe('with ember-mocha@0.14.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-cli-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('helper-test foo/bar-baz for mocha', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-rfc232.ts')
          );
        });
      });

      it('helper-test foo/bar-baz for mocha --unit', function() {
        return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
          expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/mocha-rfc232-unit.ts')
          );
        });
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' })
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('helper-test foo/bar-baz', function() {
      return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
        expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });
  });

  describe('in addon - module unification', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' }).then(() => fs.ensureDirSync('src'))
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('helper-test foo/bar-baz', function() {
      return emberGenerateDestroy(['helper-test', 'foo/bar-baz'], _file => {
        expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });

    it('helper-test foo/bar-baz --unit', function() {
      return emberGenerateDestroy(['helper-test', 'foo/bar-baz', '--unit'], _file => {
        expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/module-unification/addon-unit.ts')
        );
      });
    });
  });
});
