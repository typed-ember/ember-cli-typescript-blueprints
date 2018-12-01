'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const setupPodConfig = blueprintHelpers.setupPodConfig;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');
const fs = require('fs-extra');

describe('Blueprint: helper', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew().then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('helper foo/bar-baz', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz'], _file => {
        expect(_file('app/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });

    it('helper foo/bar-baz unit', function() {
      return emberGenerateDestroy(['helper', '--test-type=unit', 'foo/bar-baz'], _file => {
        expect(_file('app/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('tests/unit/helpers/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/unit.ts')
        );
      });
    });

    it('helper foo/bar-baz --pod', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz', '--pod'], _file => {
        expect(_file('app/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });

    it('helper foo/bar-baz --pod', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz', '--pod'], _file => {
        expect(_file('app/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });

    describe('with podModulePrefix', function() {
      beforeEach(function() {
        setupPodConfig({ podModulePrefix: true });
      });

      it('helper foo/bar-baz --pod', function() {
        return emberGenerateDestroy(['helper', 'foo/bar-baz', '--pod'], _file => {
          expect(_file('app/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/integration.ts')
          );
        });
      });

      it('helper foo/bar-baz --pod', function() {
        return emberGenerateDestroy(['helper', 'foo/bar-baz', '--pod'], _file => {
          expect(_file('app/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
          expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/integration.ts')
          );
        });
      });
    });
  });

  describe('in app - module unification', function() {
    beforeEach(function() {
      return emberNew()
        .then(() => fs.ensureDirSync('src'))
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('helper foo/bar-baz', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz'], _file => {
        expect(_file('src/ui/components/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });

    it('helper foo/bar-baz unit', function() {
      return emberGenerateDestroy(['helper', '--test-type=unit', 'foo/bar-baz'], _file => {
        expect(_file('src/ui/components/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/unit.ts')
        );
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' }).then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('helper foo/bar-baz', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz'], _file => {
        expect(_file('addon/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('app/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper-addon.ts'));
        expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });

    it('helper foo/bar-baz --dummy', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz', '--dummy'], _file => {
        expect(_file('tests/dummy/app/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('app/helpers/foo/bar-baz.ts')).to.not.exist;
        expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.not.exist;
      });
    });
  });

  describe('in addon - module unification', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' })
        .then(() => fs.ensureDirSync('src'))
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('helper foo/bar-baz', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz'], _file => {
        expect(_file('src/ui/components/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });

    it('helper foo/bar-baz unit', function() {
      return emberGenerateDestroy(['helper', '--test-type=unit', 'foo/bar-baz'], _file => {
        expect(_file('src/ui/components/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('src/ui/components/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/module-unification/addon-unit.ts')
        );
      });
    });
  });

  describe('in in-repo-addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'in-repo-addon' }).then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('helper foo/bar-baz --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz', '--in-repo-addon=my-addon'], _file => {
        expect(_file('lib/my-addon/addon/helpers/foo/bar-baz.ts')).to.equal(fixture('helper/helper.ts'));
        expect(_file('lib/my-addon/app/helpers/foo/bar-baz.ts')).to.equal(
          fixture('helper/helper-addon.ts')
        );
        expect(_file('tests/integration/helpers/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });
  });

  describe('in in-repo-addon - module unification', function() {
    beforeEach(function() {
      return emberNew({ target: 'in-repo-addon' })
        .then(() => fs.ensureDirSync('src'))
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('helper foo/bar-baz --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(['helper', 'foo/bar-baz', '--in-repo-addon=my-addon'], _file => {
        expect(_file('packages/my-addon/src/ui/components/foo/bar-baz.ts')).to.equal(
          fixture('helper/helper.ts')
        );
        expect(_file('packages/my-addon/src/ui/components/foo/bar-baz-test.ts')).to.equal(
          fixture('helper-test/integration.ts')
        );
      });
    });

    it('helper foo/bar-baz unit --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(
        ['helper', '--test-type=unit', 'foo/bar-baz', '--in-repo-addon=my-addon'],
        _file => {
          expect(_file('packages/my-addon/src/ui/components/foo/bar-baz.ts')).to.equal(
            fixture('helper/helper.ts')
          );
          expect(_file('packages/my-addon/src/ui/components/foo/bar-baz-test.ts')).to.equal(
            fixture('helper-test/module-unification/addon-unit.ts')
          );
        }
      );
    });
  });
});
