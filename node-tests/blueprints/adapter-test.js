'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerate = blueprintHelpers.emberGenerate;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const SilentError = require('silent-error');

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

const setupTestEnvironment = require('../helpers/setup-test-environment');
const enableOctane = setupTestEnvironment.enableOctane;

describe('Acceptance: generate and destroy adapter blueprints', function() {
  setupTestHooks(this);

  describe('classic', function() {
    beforeEach(function() {
      return emberNew();
    });

    it('adapter', function() {
      let args = ['adapter', 'foo'];

    return emberGenerateDestroy(args, _file => {
      expect(_file('app/adapters/foo.ts'))
        .to.contain("import DS from 'ember-data';")
        .to.contain('export default class FooAdapter extends DS.JSONAPIAdapter.extend({')
        .to.contain('  // anything which *must* be merged on the prototype')
        .to.contain('}) {')
        .to.contain('  // normal class body')
        .to.contain('}')
        .to.contain('// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.')
        .to.contain("declare module 'ember-data/types/registries/adapter' {")
        .to.contain('  export default interface AdapterRegistry {')
        .to.contain("    'foo': FooAdapter;")
        .to.contain('  }')
        .to.contain('}');

        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    it('adapter extends application adapter if it exists', function() {
      let args = ['adapter', 'foo'];

      return emberGenerate(['adapter', 'application']).then(() =>
        emberGenerateDestroy(args, _file => {
          expect(_file('app/adapters/foo.ts'))
            .to.contain("import ApplicationAdapter from './application';")
            .to.contain('export default class FooAdapter extends ApplicationAdapter.extend({');

          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        })
      );
    });

    it('adapter with --base-class', function() {
      let args = ['adapter', 'foo', '--base-class=bar'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('app/adapters/foo.ts'))
          .to.contain("import BarAdapter from './bar';")
          .to.contain('export default class FooAdapter extends BarAdapter.extend({');

        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    xit('adapter throws when --base-class is same as name', function() {
      let args = ['adapter', 'foo', '--base-class=foo'];

      return expect(emberGenerate(args)).to.be.rejectedWith(
        SilentError,
        /Adapters cannot extend from themself/
      );
    });

    it('adapter when is named "application"', function() {
      let args = ['adapter', 'application'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('app/adapters/application.ts'))
          .to.contain("import DS from 'ember-data';")
          .to.contain('export default class ApplicationAdapter extends DS.JSONAPIAdapter.extend({');

        expect(_file('tests/unit/adapters/application-test.ts')).to.equal(
          fixture('adapter-test/application-default.ts')
        );
      });
    });

    it('adapter-test', function() {
      let args = ['adapter-test', 'foo'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
          fixture('adapter-test/rfc232.ts')
        );
      });
    });

    describe('adapter-test with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', delete: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('adapter-test-test foo', function() {
        return emberGenerateDestroy(['adapter-test', 'foo'], _file => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/foo-default.ts')
          );
        });
      });
    });

    describe('with ember-cli-mocha v0.12+', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.12.0');
      });

      it('adapter-test for mocha v0.12+', function() {
        let args = ['adapter-test', 'foo'];

        return emberGenerateDestroy(args, _file => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/foo-mocha-0.12.ts')
          );
        });
      });
    });

    describe('with ember-mocha v0.14+', function() {
      beforeEach(function() {
        modifyPackages([{ name: 'ember-qunit', delete: true }, { name: 'ember-mocha', dev: true }]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('adapter-test for mocha v0.14+', function() {
        return emberGenerateDestroy(['adapter-test', 'foo'], _file => {
          expect(_file('tests/unit/adapters/foo-test.ts')).to.equal(
            fixture('adapter-test/mocha-rfc232.ts')
          );
        });
      });
    });
  });

  describe('module unification', function() {
    beforeEach(function() {
      return emberNew({ isModuleUnification: true });
    });

    it('adapter', function() {
      let args = ['adapter', 'foo'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/adapter.ts'))
            .to.contain("import DS from 'ember-data';")
            .to.contain('export default class FooAdapter extends DS.JSONAPIAdapter.extend({');

          expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('adapter extends application adapter if it exists', function() {
      let args = ['adapter', 'foo'];

      return emberGenerate(['adapter', 'application'], { isModuleUnification: true }).then(() =>
        emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/adapter.ts'))
              .to.contain("import ApplicationAdapter from '../application/adapter';")
              .to.contain('export default class FooAdapter extends ApplicationAdapter.extend({');

            expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
              fixture('adapter-test/rfc232.ts')
            );
          },
          { isModuleUnification: true }
        )
      );
    });

    it('adapter with --base-class', function() {
      let args = ['adapter', 'foo', '--base-class=bar'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/adapter.ts'))
            .to.contain("import BarAdapter from '../bar/adapter';")
            .to.contain('export default class FooAdapter extends BarAdapter.extend({');

          expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('adapter when is named "application"', function() {
      let args = ['adapter', 'application'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/application/adapter.ts'))
            .to.contain("import DS from 'ember-data';")
            .to.contain('export default class ApplicationAdapter extends DS.JSONAPIAdapter.extend({');

          expect(_file('src/data/models/application/adapter-test.ts')).to.equal(
            fixture('adapter-test/application-default.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('adapter-test', function() {
      let args = ['adapter-test', 'foo'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    describe('adapter-test with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', delete: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('adapter-test-test foo', function() {
        return emberGenerateDestroy(
          ['adapter-test', 'foo'],
          _file => {
            expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
              fixture('adapter-test/foo-default.ts')
            );
          },
          { isModuleUnification: true }
        );
      });
    });

    describe('with ember-cli-mocha v0.12+', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.12.0');
      });

      it('adapter-test for mocha v0.12+', function() {
        let args = ['adapter-test', 'foo'];

        return emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
              fixture('adapter-test/foo-mocha-0.12.ts')
            );
          },
          { isModuleUnification: true }
        );
      });
    });

    describe('with ember-mocha v0.14+', function() {
      beforeEach(function() {
        modifyPackages([{ name: 'ember-qunit', delete: true }, { name: 'ember-mocha', dev: true }]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('adapter-test for mocha v0.14+', function() {
        let args = ['adapter-test', 'foo'];

        return emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
              fixture('adapter-test/mocha-rfc232.ts')
            );
          },
          { isModuleUnification: true }
        );
      });
    });
  });

  describe('octane', function() {
    enableOctane();

    beforeEach(function() {
      return emberNew({ isModuleUnification: true });
    });

    it('adapter', function() {
      let args = ['adapter', 'foo'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/adapter.ts'))
            .to.contain("import DS from 'ember-data';")
            .to.contain('export default class FooAdapter extends DS.JSONAPIAdapter {');

          expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('adapter extends application adapter if it exists', function() {
      let args = ['adapter', 'foo'];

      return emberGenerate(['adapter', 'application'], { isModuleUnification: true }).then(() =>
        emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/adapter.ts'))
              .to.contain("import ApplicationAdapter from '../application/adapter';")
              .to.contain('export default class FooAdapter extends ApplicationAdapter {');

            expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
              fixture('adapter-test/rfc232.ts')
            );
          },
          { isModuleUnification: true }
        )
      );
    });

    it('adapter with --base-class', function() {
      let args = ['adapter', 'foo', '--base-class=bar'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/adapter.ts'))
            .to.contain("import BarAdapter from '../bar/adapter';")
            .to.contain('export default class FooAdapter extends BarAdapter {');

          expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('adapter when is named "application"', function() {
      let args = ['adapter', 'application'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/application/adapter.ts'))
            .to.contain("import DS from 'ember-data';")
            .to.contain('export default class ApplicationAdapter extends DS.JSONAPIAdapter {');

          expect(_file('src/data/models/application/adapter-test.ts')).to.equal(
            fixture('adapter-test/application-default.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('adapter-test', function() {
      let args = ['adapter-test', 'foo'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
            fixture('adapter-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    describe('adapter-test with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', delete: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('adapter-test-test foo', function() {
        return emberGenerateDestroy(
          ['adapter-test', 'foo'],
          _file => {
            expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
              fixture('adapter-test/foo-default.ts')
            );
          },
          { isModuleUnification: true }
        );
      });
    });

    describe('with ember-cli-mocha v0.12+', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.12.0');
      });

      it('adapter-test for mocha v0.12+', function() {
        let args = ['adapter-test', 'foo'];

        return emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
              fixture('adapter-test/foo-mocha-0.12.ts')
            );
          },
          { isModuleUnification: true }
        );
      });
    });

    describe('with ember-mocha v0.14+', function() {
      beforeEach(function() {
        modifyPackages([{ name: 'ember-qunit', delete: true }, { name: 'ember-mocha', dev: true }]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('adapter-test for mocha v0.14+', function() {
        let args = ['adapter-test', 'foo'];

        return emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/adapter-test.ts')).to.equal(
              fixture('adapter-test/mocha-rfc232.ts')
            );
          },
          { isModuleUnification: true }
        );
      });
    });
  });
});
