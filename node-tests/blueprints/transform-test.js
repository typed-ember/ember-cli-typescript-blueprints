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

describe('Acceptance: generate and destroy transform blueprints', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew()
        .then(() => generateFakePackageManifest('ember-qunit', '4.6.0'));
    });

    it('transform', function() {
      let args = ['transform', 'foo'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('app/transforms/foo.ts'))
          .to.contain("import DS from 'ember-data';")
          .to.contain('const Foo = DS.Transform.extend(')
          .to.contain('deserialize(serialized) {')
          .to.contain('serialize(deserialized) {')
          .to.contain('export default Foo;');

        expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
          fixture('transform-test/default.ts')
        );
      });
    });

    it('transform-test', function() {
      let args = ['transform-test', 'foo'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
          fixture('transform-test/default.ts')
        );
      });
    });

    describe('with ember-mocha', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-mocha', '0.16.0');
      });

      it('transform-test for mocha', function() {
        let args = ['transform-test', 'foo'];

        return emberGenerateDestroy(args, _file => {
          expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
            fixture('transform-test/mocha.ts')
          );
        });
      });
    });
  });
});
