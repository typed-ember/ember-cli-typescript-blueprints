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

describe('Acceptance: generate and destroy serializer blueprints', function() {
  setupTestHooks(this);

  describe('classic', function() {
    beforeEach(function() {
      return emberNew();
    });

    it('serializer', function() {
      let args = ['serializer', 'foo'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('app/serializers/foo.ts'))
          .to.contain("import DS from 'ember-data';")
          .to.contain('export default class FooSerializer extends DS.JSONAPISerializer.extend(');

        expect(_file('tests/unit/serializers/foo-test.ts')).to.equal(
          fixture('serializer-test/rfc232.ts')
        );
      });
    });

    it('serializer extends application serializer if it exists', function() {
      let args = ['serializer', 'foo'];

      return emberGenerate(['serializer', 'application']).then(() =>
        emberGenerateDestroy(args, _file => {
          expect(_file('app/serializers/foo.ts'))
            .to.contain("import ApplicationSerializer from './application';")
            .to.contain('export default class FooSerializer extends ApplicationSerializer.extend({');

          expect(_file('tests/unit/serializers/foo-test.ts')).to.equal(
            fixture('serializer-test/rfc232.ts')
          );
        })
      );
    });

    it('serializer with --base-class', function() {
      let args = ['serializer', 'foo', '--base-class=bar'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('app/serializers/foo.ts'))
          .to.contain("import BarSerializer from './bar';")
          .to.contain('export default class FooSerializer extends BarSerializer.extend({');

        expect(_file('tests/unit/serializers/foo-test.ts')).to.equal(
          fixture('serializer-test/rfc232.ts')
        );
      });
    });

    xit('serializer throws when --base-class is same as name', function() {
      let args = ['serializer', 'foo', '--base-class=foo'];

      return expect(emberGenerate(args)).to.be.rejectedWith(
        SilentError,
        /Serializers cannot extend from themself/
      );
    });

    it('serializer when is named "application"', function() {
      let args = ['serializer', 'application'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('app/serializers/application.ts'))
          .to.contain("import DS from 'ember-data';")
          .to.contain('export default class ApplicationSerializer extends DS.JSONAPISerializer.extend({');

        expect(_file('tests/unit/serializers/application-test.ts')).to.equal(
          fixture('serializer-test/application-default.ts')
        );
      });
    });

    it('serializer-test', function() {
      let args = ['serializer-test', 'foo'];

      return emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/serializers/foo-test.ts')).to.equal(
          fixture('serializer-test/rfc232.ts')
        );
      });
    });

    describe('serializer-test with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', delete: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('serializer-test-test foo', function() {
        return emberGenerateDestroy(['serializer-test', 'foo'], _file => {
          expect(_file('tests/unit/serializers/foo-test.ts')).to.equal(
            fixture('serializer-test/foo-default.ts')
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

      it('serializer-test for mocha v0.12+', function() {
        let args = ['serializer-test', 'foo'];

        return emberGenerateDestroy(args, _file => {
          expect(_file('tests/unit/serializers/foo-test.ts')).to.equal(
            fixture('serializer-test/foo-mocha-0.12.ts')
          );
        });
      });
    });

    describe('with ember-mocha v0.14+', function() {
      beforeEach(function() {
        modifyPackages([{ name: 'ember-qunit', delete: true }, { name: 'ember-mocha', dev: true }]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('serializer-test for mocha v0.14+', function() {
        let args = ['serializer-test', 'foo'];

        return emberGenerateDestroy(args, _file => {
          expect(_file('tests/unit/serializers/foo-test.ts')).to.equal(
            fixture('serializer-test/mocha-rfc232.ts')
          );
        });
      });
    });
  });

  describe('module unification', function() {
    beforeEach(function() {
      return emberNew({ isModuleUnification: true });
    });

    it('serializer', function() {
      let args = ['serializer', 'foo'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/serializer.ts'))
            .to.contain("import DS from 'ember-data';")
            .to.contain('export default class FooSerializer extends DS.JSONAPISerializer.extend(');

          expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
            fixture('serializer-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('serializer extends application serializer if it exists', function() {
      let args = ['serializer', 'foo'];

      return emberGenerate(['serializer', 'application'], { isModuleUnification: true }).then(() =>
        emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/serializer.ts'))
              .to.contain("import ApplicationSerializer from '../application/serializer';")
              .to.contain('export default class FooSerializer extends ApplicationSerializer.extend({');

            expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
              fixture('serializer-test/rfc232.ts')
            );
          },
          { isModuleUnification: true }
        )
      );
    });

    it('serializer with --base-class', function() {
      let args = ['serializer', 'foo', '--base-class=bar'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/serializer.ts'))
            .to.contain("import BarSerializer from '../bar/serializer';")
            .to.contain('export default class FooSerializer extends BarSerializer.extend({');

          expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
            fixture('serializer-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    xit('serializer throws when --base-class is same as name', function() {
      let args = ['serializer', 'foo', '--base-class=foo'];

      return expect(emberGenerate(args, { isModuleUnification: true })).to.be.rejectedWith(
        SilentError,
        /Serializers cannot extend from themself/
      );
    });

    it('serializer when is named "application"', function() {
      let args = ['serializer', 'application'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/application/serializer.ts'))
            .to.contain("import DS from 'ember-data';")
            .to.contain('export default class ApplicationSerializer extends DS.JSONAPISerializer.extend({');

          expect(_file('src/data/models/application/serializer-test.ts')).to.equal(
            fixture('serializer-test/application-default.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('serializer-test', function() {
      let args = ['serializer-test', 'foo'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
            fixture('serializer-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    describe('serializer-test with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', delete: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('serializer-test-test foo', function() {
        return emberGenerateDestroy(
          ['serializer-test', 'foo'],
          _file => {
            expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
              fixture('serializer-test/foo-default.ts')
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

      it('serializer-test for mocha v0.12+', function() {
        let args = ['serializer-test', 'foo'];

        return emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
              fixture('serializer-test/foo-mocha-0.12.ts')
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

      it('serializer-test for mocha v0.14+', function() {
        let args = ['serializer-test', 'foo'];

        return emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
              fixture('serializer-test/mocha-rfc232.ts')
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

    it('serializer', function() {
      let args = ['serializer', 'foo'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/serializer.ts'))
            .to.contain("import DS from 'ember-data';")
            .to.contain('export default class FooSerializer extends DS.JSONAPISerializer {');

          expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
            fixture('serializer-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('serializer extends application serializer if it exists', function() {
      let args = ['serializer', 'foo'];

      return emberGenerate(['serializer', 'application'], { isModuleUnification: true }).then(() =>
        emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/serializer.ts'))
              .to.contain("import ApplicationSerializer from '../application/serializer';")
              .to.contain('export default class FooSerializer extends ApplicationSerializer {');

            expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
              fixture('serializer-test/rfc232.ts')
            );
          },
          { isModuleUnification: true }
        )
      );
    });

    it('serializer with --base-class', function() {
      let args = ['serializer', 'foo', '--base-class=bar'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/serializer.ts'))
            .to.contain("import BarSerializer from '../bar/serializer';")
            .to.contain('export default class FooSerializer extends BarSerializer');

          expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
            fixture('serializer-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    xit('serializer throws when --base-class is same as name', function() {
      let args = ['serializer', 'foo', '--base-class=foo'];

      return expect(emberGenerate(args, { isModuleUnification: true })).to.be.rejectedWith(
        SilentError,
        /Serializers cannot extend from themself/
      );
    });

    it('serializer when is named "application"', function() {
      let args = ['serializer', 'application'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/application/serializer.ts'))
            .to.contain("import DS from 'ember-data';")
            .to.contain(
              'export default class ApplicationSerializer extends DS.JSONAPISerializer {'
            );

          expect(_file('src/data/models/application/serializer-test.ts')).to.equal(
            fixture('serializer-test/application-default.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    it('serializer-test', function() {
      let args = ['serializer-test', 'foo'];

      return emberGenerateDestroy(
        args,
        _file => {
          expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
            fixture('serializer-test/rfc232.ts')
          );
        },
        { isModuleUnification: true }
      );
    });

    describe('serializer-test with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', delete: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('serializer-test-test foo', function() {
        return emberGenerateDestroy(
          ['serializer-test', 'foo'],
          _file => {
            expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
              fixture('serializer-test/foo-default.ts')
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

      it('serializer-test for mocha v0.12+', function() {
        let args = ['serializer-test', 'foo'];

        return emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
              fixture('serializer-test/foo-mocha-0.12.ts')
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

      it('serializer-test for mocha v0.14+', function() {
        let args = ['serializer-test', 'foo'];

        return emberGenerateDestroy(
          args,
          _file => {
            expect(_file('src/data/models/foo/serializer-test.ts')).to.equal(
              fixture('serializer-test/mocha-rfc232.ts')
            );
          },
          { isModuleUnification: true }
        );
      });
    });
  });
});
