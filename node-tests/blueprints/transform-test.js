'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const chai = require('ember-cli-blueprint-test-helpers/chai');

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');
const setupTestEnvironment = require('../helpers/setup-test-environment');

const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;
const expect = chai.expect;
const enableOctane = setupTestEnvironment.enableOctane;
const enableClassic = setupTestEnvironment.enableClassic;

describe('Acceptance: generate and destroy transform blueprints', function () {
  setupTestHooks(this);

  describe('classic', function () {
    enableClassic();
    describe('in app', function () {
      beforeEach(function () {
        return emberNew();
      });

      it('transform', function () {
        let args = ['transform', 'foo'];

        return emberGenerateDestroy(args, (_file) => {
          expect(_file('app/transforms/foo.ts'))
            .to.contain(`import Transform from '@ember-data/serializer/transform';`)
            .to.contain('export default Transform.extend(')
            .to.contain('deserialize(serialized) {')
            .to.contain('serialize(deserialized) {');

          expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
            fixture('transform-test/rfc232.ts')
          );
        });
      });

      it('transform-test', function () {
        let args = ['transform-test', 'foo'];

        return emberGenerateDestroy(args, (_file) => {
          expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
            fixture('transform-test/rfc232.ts')
          );
        });
      });

      describe('with ember-cli-mocha v0.12+', function () {
        beforeEach(function () {
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-mocha', dev: true },
          ]);
          generateFakePackageManifest('ember-cli-mocha', '0.12.0');
        });

        it('transform-test for mocha v0.12+', function () {
          let args = ['transform-test', 'foo'];

          return emberGenerateDestroy(args, (_file) => {
            expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
              fixture('transform-test/mocha-0.12.ts')
            );
          });
        });
      });

      describe('with ember-mocha v0.14+', function () {
        beforeEach(function () {
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-mocha', dev: true },
          ]);
          generateFakePackageManifest('ember-mocha', '0.14.0');
        });

        it('transform-test for mocha v0.14+', function () {
          let args = ['transform-test', 'foo'];

          return emberGenerateDestroy(args, (_file) => {
            expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
              fixture('transform-test/mocha-rfc232.ts')
            );
          });
        });
      });
    });
  });

  describe('octane', function () {
    describe('in app', function () {
      enableOctane();

      beforeEach(function () {
        return emberNew();
      });

      it('transform', function () {
        let args = ['transform', 'foo'];

        return emberGenerateDestroy(args, (_file) => {
          expect(_file('app/transforms/foo.ts'))
            .to.contain(`import Transform from '@ember-data/serializer/transform';`)
            .to.contain('export default class FooTransform extends Transform {')
            .to.contain('deserialize(serialized) {')
            .to.contain('serialize(deserialized) {');

          expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
            fixture('transform-test/rfc232.ts')
          );
        });
      });

      it('transform-test', function () {
        let args = ['transform-test', 'foo'];

        return emberGenerateDestroy(args, (_file) => {
          expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
            fixture('transform-test/rfc232.ts')
          );
        });
      });

      describe('with ember-cli-mocha v0.12+', function () {
        beforeEach(function () {
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-mocha', dev: true },
          ]);
          generateFakePackageManifest('ember-cli-mocha', '0.12.0');
        });

        it('transform-test for mocha v0.12+', function () {
          let args = ['transform-test', 'foo'];

          return emberGenerateDestroy(args, (_file) => {
            expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
              fixture('transform-test/mocha-0.12.ts')
            );
          });
        });
      });

      describe('with ember-mocha v0.14+', function () {
        beforeEach(function () {
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-mocha', dev: true },
          ]);
          generateFakePackageManifest('ember-mocha', '0.14.0');
        });

        it('transform-test for mocha v0.14+', function () {
          let args = ['transform-test', 'foo'];

          return emberGenerateDestroy(args, (_file) => {
            expect(_file('tests/unit/transforms/foo-test.ts')).to.equal(
              fixture('transform-test/mocha-rfc232.ts')
            );
          });
        });
      });
    });
  });
});
