'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const setupPodConfig = blueprintHelpers.setupPodConfig;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

const setupTestEnvironment = require('../helpers/setup-test-environment');
const enableOctane = setupTestEnvironment.enableOctane;

const glimmerComponentContents = `import Component from '@glimmer/component';

interface FooComponentSignature {}

export default class FooComponent extends Component<FooComponentSignature> {}
`;

const templateOnlyContents = `import templateOnly from '@ember/component/template-only';

export default templateOnly();
`;

describe('Blueprint: component-class', function () {
  setupTestHooks(this);

  describe('in app - octane', function () {
    enableOctane();

    beforeEach(function () {
      return emberNew()
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.2.0'));
    });

    it('component-class foo', function () {
      return emberGenerateDestroy(['component-class', 'foo'], (_file) => {
        expect(_file('app/components/foo.ts')).to.equal(glimmerComponentContents);
      });
    });

    // classic default
    it('component-class foo --component-structure=classic --component-class=@ember/component', function () {
      return emberGenerateDestroy(
        [
          'component-class',
          'foo',
          '--component-structure',
          'classic',
          '--component-class',
          '@ember/component',
        ],
        (_file) => {
          expect(_file('app/components/foo.ts')).to.equal(
            glimmerComponentContents.replace(/@glimmer\//g, '@ember/')
          );
        }
      );
    });

    // Octane default
    it('component-class foo --component-structure=flat --component-class=@glimmer/component', function () {
      return emberGenerateDestroy(
        [
          'component-class',
          '--component-structure',
          'flat',
          '--component-class',
          '@glimmer/component',
          'foo',
        ],
        (_file) => {
          expect(_file('app/components/foo.ts')).to.equal(glimmerComponentContents);
        }
      );
    });

    it('component-class foo --component-structure=flat', function () {
      return emberGenerateDestroy(
        ['component-class', '--component-structure', 'flat', 'foo'],
        (_file) => {
          expect(_file('app/components/foo.ts')).to.equal(glimmerComponentContents);
        }
      );
    });

    it('component-class foo --component-structure=nested', function () {
      return emberGenerateDestroy(
        ['component-class', '--component-structure', 'nested', 'foo'],
        (_file) => {
          expect(_file('app/components/foo/index.ts')).to.equal(glimmerComponentContents);
        }
      );
    });

    it('component-class foo --component-structure=classic', function () {
      return emberGenerateDestroy(
        ['component-class', '--component-structure', 'classic', 'foo'],
        (_file) => {
          expect(_file('app/components/foo.ts')).to.equal(glimmerComponentContents);
        }
      );
    });

    it('component-class foo --component-class=@ember/component', function () {
      return emberGenerateDestroy(
        ['component-class', '--component-class', '@ember/component', 'foo'],
        (_file) => {
          expect(_file('app/components/foo.ts')).to.equal(
            glimmerComponentContents.replace(/@glimmer\//g, '@ember/')
          );
        }
      );
    });

    it('component-class foo --component-class=@glimmer/component', function () {
      return emberGenerateDestroy(
        ['component-class', '--component-class', '@glimmer/component', 'foo'],
        (_file) => {
          expect(_file('app/components/foo.ts')).to.equal(glimmerComponentContents);
        }
      );
    });

    it('component-class foo --component-class=@ember/component/template-only', function () {
      return emberGenerateDestroy(
        ['component-class', '--component-class', '@ember/component/template-only', 'foo'],
        (_file) => {
          expect(_file('app/components/foo.ts')).to.equal(templateOnlyContents);
        }
      );
    });

    it('component-class x-foo', function () {
      return emberGenerateDestroy(['component-class', 'x-foo'], (_file) => {
        expect(_file('app/components/x-foo.ts')).to.equal(
          glimmerComponentContents.replace(/FooComponent/g, 'XFooComponent')
        );
      });
    });

    it('component-class x-foo.ts', function () {
      return emberGenerateDestroy(['component-class', 'x-foo.js'], (_file) => {
        expect(_file('app/components/x-foo.ts.ts')).to.not.exist;
        expect(_file('app/components/x-foo.ts')).to.equal(
          glimmerComponentContents.replace(/FooComponent/g, 'XFooComponent')
        );
      });
    });

    it('component-class foo/x-foo', function () {
      return emberGenerateDestroy(['component-class', 'foo/x-foo'], (_file) => {
        expect(_file('app/components/foo/x-foo.ts')).to.equal(
          glimmerComponentContents.replace(/FooComponent/g, 'FooXFooComponent')
        );
      });
    });

    it('component-class foo/x-foo --component-class="@glimmer/component"', function () {
      return emberGenerateDestroy(
        ['component-class', 'foo/x-foo', '--component-class', '@glimmer/component'],
        (_file) => {
          expect(_file('app/components/foo/x-foo.ts')).to.equal(
            glimmerComponentContents.replace(/FooComponent/g, 'FooXFooComponent')
          );
        }
      );
    });

    describe('with podModulePrefix', function () {
      beforeEach(function () {
        setupPodConfig({ podModulePrefix: true });
      });

      it('component-class foo --pod', function () {
        return emberGenerateDestroy(['component-class', 'foo', '--pod'], (_file) => {
          expect(_file('app/pods/components/foo/component.ts')).to.equal(
            fixture('component/component.ts')
          );
        });
      });

      it('component-class x-foo --pod', function () {
        return emberGenerateDestroy(['component-class', 'x-foo', '--pod'], (_file) => {
          expect(_file('app/pods/components/x-foo/component.ts')).to.equal(
            fixture('component/component-dash.ts')
          );
        });
      });

      it('component-class foo/x-foo --pod', function () {
        return emberGenerateDestroy(['component-class', 'foo/x-foo', '--pod'], (_file) => {
          expect(_file('app/pods/components/foo/x-foo/component.ts')).to.equal(
            fixture('component/component-nested.ts')
          );
        });
      });

      it('component-class x-foo --pod --path foo', function () {
        return emberGenerateDestroy(
          ['component-class', 'x-foo', '--pod', '--path', 'foo'],
          (_file) => {
            expect(_file('app/pods/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-dash.ts')
            );
          }
        );
      });

      it('component-class foo/x-foo --pod --path bar', function () {
        return emberGenerateDestroy(
          ['component-class', 'foo/x-foo', '--pod', '--path', 'bar'],
          (_file) => {
            expect(_file('app/pods/bar/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-nested.ts')
            );
          }
        );
      });

      it('component-class x-foo --pod --path bar/foo', function () {
        return emberGenerateDestroy(
          ['component-class', 'x-foo', '--pod', '--path', 'bar/foo'],
          (_file) => {
            expect(_file('app/pods/bar/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-dash.ts')
            );
          }
        );
      });

      it('component-class foo/x-foo --pod --path bar/baz', function () {
        return emberGenerateDestroy(
          ['component-class', 'foo/x-foo', '--pod', '--path', 'bar/baz'],
          (_file) => {
            expect(_file('app/pods/bar/baz/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-nested.ts')
            );
          }
        );
      });

      it('component-class x-foo --pod -no-path', function () {
        return emberGenerateDestroy(['component-class', 'x-foo', '--pod', '-no-path'], (_file) => {
          expect(_file('app/pods/x-foo/component.ts')).to.equal(
            fixture('component/component-dash.ts')
          );
        });
      });

      it('component-class foo/x-foo --pod -no-path', function () {
        return emberGenerateDestroy(
          ['component-class', 'foo/x-foo', '--pod', '-no-path'],
          (_file) => {
            expect(_file('app/pods/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-nested.ts')
            );
          }
        );
      });
    });
  });

  describe('in addon - octane', function () {
    enableOctane();

    beforeEach(function () {
      return emberNew({ target: 'addon' })
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.2.0'));
    });

    it('component-class foo', function () {
      return emberGenerateDestroy(['component-class', 'foo'], (_file) => {
        expect(_file('addon/components/foo.ts')).to.equal(glimmerComponentContents);
        expect(_file('app/components/foo.js')).to.contain(
          "export { default } from 'my-addon/components/foo';"
        );
      });
    });

    it('component-class x-foo', function () {
      return emberGenerateDestroy(['component-class', 'x-foo'], (_file) => {
        expect(_file('addon/components/x-foo.ts')).to.equal(
          glimmerComponentContents.replace(/FooComponent/g, 'XFooComponent')
        );
        expect(_file('app/components/x-foo.js')).to.contain(
          "export { default } from 'my-addon/components/x-foo';"
        );
      });
    });

    it('component-class foo/x-foo', function () {
      return emberGenerateDestroy(['component-class', 'foo/x-foo'], (_file) => {
        expect(_file('addon/components/foo/x-foo.ts')).to.equal(
          glimmerComponentContents.replace(/FooComponent/g, 'FooXFooComponent')
        );
        expect(_file('app/components/foo/x-foo.js')).to.contain(
          "export { default } from 'my-addon/components/foo/x-foo';"
        );
      });
    });

    it('component-class x-foo --dummy', function () {
      return emberGenerateDestroy(['component-class', 'x-foo', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/components/x-foo.ts')).equal(
          glimmerComponentContents.replace(/FooComponent/g, 'XFooComponent')
        );
        expect(_file('app/components/x-foo.js')).to.not.exist;
      });
    });

    it('component-class foo/x-foo --dummy', function () {
      return emberGenerateDestroy(['component-class', 'foo/x-foo', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/components/foo/x-foo.ts')).to.equal(
          glimmerComponentContents.replace(/FooComponent/g, 'FooXFooComponent')
        );
        expect(_file('app/components/foo/x-foo.hbs')).to.not.exist;
      });
    });
  });

  describe('in in-repo-addon - octane', function () {
    enableOctane();

    beforeEach(function () {
      return emberNew({ target: 'in-repo-addon' })
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.2.0'));
    });

    it('component-class foo --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(
        ['component-class', 'foo', '--in-repo-addon=my-addon'],
        (_file) => {
          expect(_file('lib/my-addon/addon/components/foo.ts')).to.equal(glimmerComponentContents);
          expect(_file('lib/my-addon/app/components/foo.js')).to.contain(
            "export { default } from 'my-addon/components/foo';"
          );
        }
      );
    });

    it('component-class x-foo --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(
        ['component-class', 'x-foo', '--in-repo-addon=my-addon'],
        (_file) => {
          expect(_file('lib/my-addon/addon/components/x-foo.ts')).to.equal(
            glimmerComponentContents.replace(/FooComponent/g, 'XFooComponent')
          );
          expect(_file('lib/my-addon/app/components/x-foo.js')).to.contain(
            "export { default } from 'my-addon/components/x-foo';"
          );
        }
      );
    });
  });
});
