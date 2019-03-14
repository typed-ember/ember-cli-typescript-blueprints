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

const setupTestEnvironment = require('../helpers/setup-test-environment');
const enableModuleUnification = setupTestEnvironment.enableModuleUnification;

describe('Blueprint: mixin-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('mixin-test foo', function() {
        return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
          expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(fixture('mixin-test/default.ts'));
        });
      });
    });

    describe('with ember-cli-mocha', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
      });

      it('mixin-test foo', function() {
        return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
          expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(fixture('mixin-test/mocha.ts'));
        });
      });
    });

    describe('with ember-cli-qunit@4.2.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('mixin-test foo', function() {
        return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
          expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(fixture('mixin-test/rfc232.ts'));
        });
      });
    });

    describe('with ember-mocha@0.14.0', function() {
      beforeEach(function() {
        modifyPackages([{ name: 'ember-qunit', delete: true }, { name: 'ember-mocha', dev: true }]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('mixin-test foo', function() {
        return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
          expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(
            fixture('mixin-test/mocha-rfc232.ts')
          );
        });
      });
    });
  });

  describe('in app - module unification', function() {
    enableModuleUnification();

    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('mixin-test foo', function() {
        return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
          expect(_file('src/mixins/foo-test.ts')).to.equal(fixture('mixin-test/default.ts'));
        });
      });
    });

    describe('with ember-cli-mocha', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
      });

      it('mixin-test foo', function() {
        return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
          expect(_file('src/mixins/foo-test.ts')).to.equal(fixture('mixin-test/mocha.ts'));
        });
      });
    });

    describe('with ember-cli-qunit@4.2.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('mixin-test foo', function() {
        return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
          expect(_file('src/mixins/foo-test.ts')).to.equal(fixture('mixin-test/rfc232.ts'));
        });
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' }).then(() =>
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ])
      );
    });

    it('mixin-test foo', function() {
      return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
        expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(fixture('mixin-test/addon.ts'));
      });
    });
  });

  describe('in addon - module unification', function() {
    enableModuleUnification();

    beforeEach(function() {
      return emberNew({ target: 'addon' }).then(() =>
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ])
      );
    });

    it('mixin-test foo', function() {
      return emberGenerateDestroy(['mixin-test', 'foo'], _file => {
        expect(_file('src/mixins/foo-test.ts')).to.equal(fixture('mixin-test/addon.ts'));
      });
    });
  });

  describe('in in-repo-addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'in-repo-addon' }).then(() =>
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ])
      );
    });

    it('mixin-test foo --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(['mixin-test', 'foo', '--in-repo-addon=my-addon'], _file => {
        expect(_file('tests/unit/mixins/foo-test.ts')).to.equal(fixture('mixin-test/addon.ts'));
      });
    });
  });
});
