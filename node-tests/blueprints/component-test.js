'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const fs = require('fs-extra');

const expect = require('ember-cli-blueprint-test-helpers/chai').expect;

describe('Acceptance: ember generate and destroy component', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    it('component foo-bar', function() {
      let args = ['component', 'foo-bar'];

      // pass any additional command line options in the arguments array
      return emberGenerateDestroy(args, (file) => {
        expect(file('app/components/foo-bar.ts')).to.contain('export default class FooBar extends Component.extend');
        expect(file('app/templates/components/foo-bar.hbs')).to.equal('{{yield}}');
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' });
    });

    it('addon component foo-bar', function() {
      let args = ['component', 'foo-bar'];

      return emberGenerateDestroy(args, (file) => {
        expect(file('addon/components/foo-bar.ts'))
          .to.contain('// @ts-ignore: Ignore import of compiled template\nimport layout from \'../templates/components/foo-bar\';\n');
        expect(file('addon/components/foo-bar.ts'))
          .to.contain('layout = layout;');
        expect(file('addon/templates/components/foo-bar.hbs')).to.equal('{{yield}}');
      });
    });
  });

  describe('in app - module unification', function() {
    beforeEach(function() {
      return emberNew().then(() => fs.ensureDirSync('src'));
    });

    it('component x-foo', function() {
      return emberGenerateDestroy(['component', 'x-foo'], _file => {
        expect(_file('src/ui/components/x-foo/component.ts')).to.contain('export default class XFoo extends Component.extend');
        expect(_file('src/ui/components/x-foo/template.hbs')).to.equal('{{yield}}');
      });
    });

    it('component foo/x-foo', function() {
      return emberGenerateDestroy(['component', 'x-foo/x-bar'], _file => {
        expect(_file('src/ui/components/x-foo/x-bar/component.ts')).to.contain('export default class XFooXBar extends Component.extend');
        expect(_file('src/ui/components/x-foo/x-bar/template.hbs'))
          .to.equal("{{yield}}");
      });
    });

  });
});
