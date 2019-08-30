'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;
const setupPodConfig = blueprintHelpers.setupPodConfig;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

describe('Blueprint: component', function() {
  setupTestHooks(this);


  describe('classic ember component', function() {
    describe('in app', function() {
      beforeEach(function() {
        return emberNew().then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
      });

      it('component foo', function() {
        return emberGenerateDestroy(['component', 'foo'], _file => {
          expect(_file('app/components/foo.ts')).to.equal(fixture('component/component.ts'));

          expect(_file('app/templates/components/foo.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/foo-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo',
              },
            })
          );
        });
      });

      it('component x-foo', function() {
        return emberGenerateDestroy(['component', 'x-foo'], _file => {
          expect(_file('app/components/x-foo.ts')).to.equal(fixture('component/component-dash.ts'));

          expect(_file('app/templates/components/x-foo.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        });
      });

      it('component foo/x-foo', function() {
        return emberGenerateDestroy(['component', 'foo/x-foo'], _file => {
          expect(_file('app/components/foo/x-foo.ts')).to.equal(
            fixture('component/component-nested.ts')
          );

          expect(_file('app/templates/components/foo/x-foo.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/foo/x-foo-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
              },
            })
          );
        });
      });

      it('component x-foo --path foo', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--path', 'foo'], _file => {
          expect(_file('app/components/x-foo.ts')).to.equal(fixture('component/component-dash.ts'));

          expect(_file('app/templates/components/x-foo.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        });
      });

      it('component x-foo --pod', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--pod'], _file => {
          expect(_file('app/components/x-foo/component.ts')).to.equal(
            fixture('component/component-dash.ts')
          );

          expect(_file('app/components/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        });
      });

      it('component foo/x-foo --pod', function() {
        return emberGenerateDestroy(['component', 'foo/x-foo', '--pod'], _file => {
          expect(_file('app/components/foo/x-foo/component.ts')).to.equal(
            fixture('component/component-nested.ts')
          );

          expect(_file('app/components/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
              },
            })
          );
        });
      });

      it('component x-foo --pod --path foo', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--pod', '--path', 'foo'], _file => {
          expect(_file('app/foo/x-foo/component.ts')).to.equal(
            fixture('component/component-dash.ts')
          );

          expect(_file('app/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
                path: 'foo/',
              },
            })
          );
        });
      });

      it('component foo/x-foo --pod --path bar', function() {
        return emberGenerateDestroy(['component', 'foo/x-foo', '--pod', '--path', 'bar'], _file => {
          expect(_file('app/bar/foo/x-foo/component.ts')).to.equal(
            fixture('component/component-nested.ts')
          );

          expect(_file('app/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/bar/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
                path: 'bar/',
              },
            })
          );
        });
      });

      it('component x-foo --pod --path bar/foo', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--pod', '--path', 'bar/foo'], _file => {
          expect(_file('app/bar/foo/x-foo/component.ts')).to.equal(
            fixture('component/component-dash.ts')
          );

          expect(_file('app/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/bar/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
                path: 'bar/foo/',
              },
            })
          );
        });
      });

      it('component foo/x-foo --pod --path bar/baz', function() {
        return emberGenerateDestroy(
          ['component', 'foo/x-foo', '--pod', '--path', 'bar/baz'],
          _file => {
            expect(_file('app/bar/baz/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-nested.ts')
            );

            expect(_file('app/bar/baz/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/bar/baz/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo/x-foo',
                  path: 'bar/baz/',
                },
              })
            );
          }
        );
      });

      it('component x-foo --pod -no-path', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--pod', '-no-path'], _file => {
          expect(_file('app/x-foo/component.ts')).to.equal(fixture('component/component-dash.ts'));

          expect(_file('app/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        });
      });

      it('component foo/x-foo --pod -no-path', function() {
        return emberGenerateDestroy(['component', 'foo/x-foo', '--pod', '-no-path'], _file => {
          expect(_file('app/foo/x-foo/component.ts')).to.equal(
            fixture('component/component-nested.ts')
          );

          expect(_file('app/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
              },
            })
          );
        });
      });

      describe('with podModulePrefix', function() {
        beforeEach(function() {
          setupPodConfig({ podModulePrefix: true });
        });

        it('component foo --pod', function() {
          return emberGenerateDestroy(['component', 'foo', '--pod'], _file => {
            expect(_file('app/pods/components/foo/component.ts')).to.equal(
              fixture('component/component.ts')
            );

            expect(_file('app/pods/components/foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/components/foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo',
                },
              })
            );
          });
        });

        it('component x-foo --pod', function() {
          return emberGenerateDestroy(['component', 'x-foo', '--pod'], _file => {
            expect(_file('app/pods/components/x-foo/component.ts')).to.equal(
              fixture('component/component-dash.ts')
            );

            expect(_file('app/pods/components/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/components/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'x-foo',
                },
              })
            );
          });
        });

        it('component foo/x-foo --pod', function() {
          return emberGenerateDestroy(['component', 'foo/x-foo', '--pod'], _file => {
            expect(_file('app/pods/components/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-nested.ts')
            );

            expect(_file('app/pods/components/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/components/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo/x-foo',
                },
              })
            );
          });
        });

        it('component x-foo --pod --path foo', function() {
          return emberGenerateDestroy(['component', 'x-foo', '--pod', '--path', 'foo'], _file => {
            expect(_file('app/pods/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-dash.ts')
            );

            expect(_file('app/pods/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'x-foo',
                  path: 'foo/',
                },
              })
            );
          });
        });

        it('component foo/x-foo --pod --path bar', function() {
          return emberGenerateDestroy(['component', 'foo/x-foo', '--pod', '--path', 'bar'], _file => {
            expect(_file('app/pods/bar/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-nested.ts')
            );

            expect(_file('app/pods/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/bar/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo/x-foo',
                  path: 'bar/',
                },
              })
            );
          });
        });

        it('component x-foo --pod --path bar/foo', function() {
          return emberGenerateDestroy(['component', 'x-foo', '--pod', '--path', 'bar/foo'], _file => {
            expect(_file('app/pods/bar/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-dash.ts')
            );

            expect(_file('app/pods/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/bar/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'x-foo',
                  path: 'bar/foo/',
                },
              })
            );
          });
        });

        it('component foo/x-foo --pod --path bar/baz', function() {
          return emberGenerateDestroy(
            ['component', 'foo/x-foo', '--pod', '--path', 'bar/baz'],
            _file => {
              expect(_file('app/pods/bar/baz/foo/x-foo/component.ts')).to.equal(
                fixture('component/component-nested.ts')
              );

              expect(_file('app/pods/bar/baz/foo/x-foo/template.hbs')).to.equal('{{yield}}');

              expect(_file('tests/integration/pods/bar/baz/foo/x-foo/component-test.ts')).to.equal(
                fixture('component-test/default-template.ts', {
                  replace: {
                    component: 'foo/x-foo',
                    path: 'bar/baz/',
                  },
                })
              );
            }
          );
        });

        it('component x-foo --pod -no-path', function() {
          return emberGenerateDestroy(['component', 'x-foo', '--pod', '-no-path'], _file => {
            expect(_file('app/pods/x-foo/component.ts')).to.equal(
              fixture('component/component-dash.ts')
            );

            expect(_file('app/pods/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'x-foo',
                },
              })
            );
          });
        });

        it('component foo/x-foo --pod -no-path', function() {
          return emberGenerateDestroy(['component', 'foo/x-foo', '--pod', '-no-path'], _file => {
            expect(_file('app/pods/foo/x-foo/component.ts')).to.equal(
              fixture('component/component-nested.ts')
            );

            expect(_file('app/pods/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo/x-foo',
                },
              })
            );
          });
        });
      });
    });
  });

  describe('glimmer component', function() {
    describe('in app', function() {
      beforeEach(function() {
        return emberNew()
        .then(() => {
          modifyPackages([
            { name: '@glimmer/component', dev: true },
          ])
        })
        .then(() => generateFakePackageManifest('@glimmer/component', '^0.14.0-alpha.9'))
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
      });

      it('component foo', function() {
        return emberGenerateDestroy(['component', 'foo'], _file => {
          expect(_file('app/components/foo.ts')).to.equal(fixture('component/glimmer-component.ts'));

          expect(_file('app/templates/components/foo.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/foo-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo',
              },
            })
          );
        });
      });

      it('component x-foo', function() {
        return emberGenerateDestroy(['component', 'x-foo'], _file => {
          expect(_file('app/components/x-foo.ts')).to.equal(fixture('component/glimmer-component-dash.ts'));

          expect(_file('app/templates/components/x-foo.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        });
      });

      it('component foo/x-foo', function() {
        return emberGenerateDestroy(['component', 'foo/x-foo'], _file => {
          expect(_file('app/components/foo/x-foo.ts')).to.equal(
            fixture('component/glimmer-component-nested.ts')
          );

          expect(_file('app/templates/components/foo/x-foo.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/foo/x-foo-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
              },
            })
          );
        });
      });

      it('component x-foo --path foo', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--path', 'foo'], _file => {
          expect(_file('app/components/x-foo.ts')).to.equal(fixture('component/glimmer-component-dash.ts'));

          expect(_file('app/templates/components/x-foo.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        });
      });

      it('component x-foo --pod', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--pod'], _file => {
          expect(_file('app/components/x-foo/component.ts')).to.equal(
            fixture('component/glimmer-component-dash.ts')
          );

          expect(_file('app/components/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        });
      });

      it('component foo/x-foo --pod', function() {
        return emberGenerateDestroy(['component', 'foo/x-foo', '--pod'], _file => {
          expect(_file('app/components/foo/x-foo/component.ts')).to.equal(
            fixture('component/glimmer-component-nested.ts')
          );

          expect(_file('app/components/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/components/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
              },
            })
          );
        });
      });

      it('component x-foo --pod --path foo', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--pod', '--path', 'foo'], _file => {
          expect(_file('app/foo/x-foo/component.ts')).to.equal(
            fixture('component/glimmer-component-dash.ts')
          );

          expect(_file('app/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
                path: 'foo/',
              },
            })
          );
        });
      });

      it('component foo/x-foo --pod --path bar', function() {
        return emberGenerateDestroy(['component', 'foo/x-foo', '--pod', '--path', 'bar'], _file => {
          expect(_file('app/bar/foo/x-foo/component.ts')).to.equal(
            fixture('component/glimmer-component-nested.ts')
          );

          expect(_file('app/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/bar/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
                path: 'bar/',
              },
            })
          );
        });
      });

      it('component x-foo --pod --path bar/foo', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--pod', '--path', 'bar/foo'], _file => {
          expect(_file('app/bar/foo/x-foo/component.ts')).to.equal(
            fixture('component/glimmer-component-dash.ts')
          );

          expect(_file('app/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/bar/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
                path: 'bar/foo/',
              },
            })
          );
        });
      });

      it('component foo/x-foo --pod --path bar/baz', function() {
        return emberGenerateDestroy(
          ['component', 'foo/x-foo', '--pod', '--path', 'bar/baz'],
          _file => {
            expect(_file('app/bar/baz/foo/x-foo/component.ts')).to.equal(
              fixture('component/glimmer-component-nested.ts')
            );

            expect(_file('app/bar/baz/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/bar/baz/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo/x-foo',
                  path: 'bar/baz/',
                },
              })
            );
          }
        );
      });

      it('component x-foo --pod -no-path', function() {
        return emberGenerateDestroy(['component', 'x-foo', '--pod', '-no-path'], _file => {
          expect(_file('app/x-foo/component.ts')).to.equal(fixture('component/glimmer-component-dash.ts'));

          expect(_file('app/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        });
      });

      it('component foo/x-foo --pod -no-path', function() {
        return emberGenerateDestroy(['component', 'foo/x-foo', '--pod', '-no-path'], _file => {
          expect(_file('app/foo/x-foo/component.ts')).to.equal(
            fixture('component/glimmer-component-nested.ts')
          );

          expect(_file('app/foo/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('tests/integration/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
              },
            })
          );
        });
      });

      describe('with podModulePrefix', function() {
        beforeEach(function() {
          setupPodConfig({ podModulePrefix: true });
        });

        it('component foo --pod', function() {
          return emberGenerateDestroy(['component', 'foo', '--pod'], _file => {
            expect(_file('app/pods/components/foo/component.ts')).to.equal(
              fixture('component/glimmer-component.ts')
            );

            expect(_file('app/pods/components/foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/components/foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo',
                },
              })
            );
          });
        });

        it('component x-foo --pod', function() {
          return emberGenerateDestroy(['component', 'x-foo', '--pod'], _file => {
            expect(_file('app/pods/components/x-foo/component.ts')).to.equal(
              fixture('component/glimmer-component-dash.ts')
            );

            expect(_file('app/pods/components/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/components/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'x-foo',
                },
              })
            );
          });
        });

        it('component foo/x-foo --pod', function() {
          return emberGenerateDestroy(['component', 'foo/x-foo', '--pod'], _file => {
            expect(_file('app/pods/components/foo/x-foo/component.ts')).to.equal(
              fixture('component/glimmer-component-nested.ts')
            );

            expect(_file('app/pods/components/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/components/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo/x-foo',
                },
              })
            );
          });
        });

        it('component x-foo --pod --path foo', function() {
          return emberGenerateDestroy(['component', 'x-foo', '--pod', '--path', 'foo'], _file => {
            expect(_file('app/pods/foo/x-foo/component.ts')).to.equal(
              fixture('component/glimmer-component-dash.ts')
            );

            expect(_file('app/pods/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'x-foo',
                  path: 'foo/',
                },
              })
            );
          });
        });

        it('component foo/x-foo --pod --path bar', function() {
          return emberGenerateDestroy(['component', 'foo/x-foo', '--pod', '--path', 'bar'], _file => {
            expect(_file('app/pods/bar/foo/x-foo/component.ts')).to.equal(
              fixture('component/glimmer-component-nested.ts')
            );

            expect(_file('app/pods/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/bar/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo/x-foo',
                  path: 'bar/',
                },
              })
            );
          });
        });

        it('component x-foo --pod --path bar/foo', function() {
          return emberGenerateDestroy(['component', 'x-foo', '--pod', '--path', 'bar/foo'], _file => {
            expect(_file('app/pods/bar/foo/x-foo/component.ts')).to.equal(
              fixture('component/glimmer-component-dash.ts')
            );

            expect(_file('app/pods/bar/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/bar/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'x-foo',
                  path: 'bar/foo/',
                },
              })
            );
          });
        });

        it('component foo/x-foo --pod --path bar/baz', function() {
          return emberGenerateDestroy(
            ['component', 'foo/x-foo', '--pod', '--path', 'bar/baz'],
            _file => {
              expect(_file('app/pods/bar/baz/foo/x-foo/component.ts')).to.equal(
                fixture('component/glimmer-component-nested.ts')
              );

              expect(_file('app/pods/bar/baz/foo/x-foo/template.hbs')).to.equal('{{yield}}');

              expect(_file('tests/integration/pods/bar/baz/foo/x-foo/component-test.ts')).to.equal(
                fixture('component-test/default-template.ts', {
                  replace: {
                    component: 'foo/x-foo',
                    path: 'bar/baz/',
                  },
                })
              );
            }
          );
        });

        it('component x-foo --pod -no-path', function() {
          return emberGenerateDestroy(['component', 'x-foo', '--pod', '-no-path'], _file => {
            expect(_file('app/pods/x-foo/component.ts')).to.equal(
              fixture('component/glimmer-component-dash.ts')
            );

            expect(_file('app/pods/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'x-foo',
                },
              })
            );
          });
        });

        it('component foo/x-foo --pod -no-path', function() {
          return emberGenerateDestroy(['component', 'foo/x-foo', '--pod', '-no-path'], _file => {
            expect(_file('app/pods/foo/x-foo/component.ts')).to.equal(
              fixture('component/glimmer-component-nested.ts')
            );

            expect(_file('app/pods/foo/x-foo/template.hbs')).to.equal('{{yield}}');

            expect(_file('tests/integration/pods/foo/x-foo/component-test.ts')).to.equal(
              fixture('component-test/default-template.ts', {
                replace: {
                  component: 'foo/x-foo',
                },
              })
            );
          });
        });
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' }).then(() =>
        generateFakePackageManifest('ember-cli-qunit', '4.1.0')
      );
    });

    it('component foo', function() {
      return emberGenerateDestroy(['component', 'foo'], _file => {
        expect(_file('addon/components/foo.ts')).to.equal(fixture('component/component-addon.ts'));

        expect(_file('addon/templates/components/foo.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/foo.js')).to.contain(
          "export { default } from 'my-addon/components/foo';"
        );

        expect(_file('tests/integration/components/foo-test.ts')).to.equal(
          fixture('component-test/default-template.ts', {
            replace: {
              component: 'foo',
            },
          })
        );
      });
    });

    it('component x-foo', function() {
      return emberGenerateDestroy(['component', 'x-foo'], _file => {
        expect(_file('addon/components/x-foo.ts')).to.equal(
          fixture('component/component-addon-dash.ts')
        );

        expect(_file('addon/templates/components/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/x-foo.js')).to.contain(
          "export { default } from 'my-addon/components/x-foo';"
        );

        expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
          fixture('component-test/default-template.ts', {
            replace: {
              component: 'x-foo',
            },
          })
        );
      });
    });

    it('component foo/x-foo', function() {
      return emberGenerateDestroy(['component', 'foo/x-foo'], _file => {
        expect(_file('addon/components/foo/x-foo.ts')).to.equal(
          fixture('component/component-addon-nested.ts')
        );

        expect(_file('addon/templates/components/foo/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/foo/x-foo.js')).to.contain(
          "export { default } from 'my-addon/components/foo/x-foo';"
        );

        expect(_file('tests/integration/components/foo/x-foo-test.ts')).to.equal(
          fixture('component-test/default-template.ts', {
            replace: {
              component: 'foo/x-foo',
            },
          })
        );
      });
    });

    it('component x-foo --dummy', function() {
      return emberGenerateDestroy(['component', 'x-foo', '--dummy'], _file => {
        expect(_file('tests/dummy/app/components/x-foo.ts')).to.equal(
          fixture('component/component-addon-dash.ts')
        );

        expect(_file('tests/dummy/app/templates/components/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/x-foo.js')).to.not.exist;

        expect(_file('tests/unit/components/x-foo-test.ts')).to.not.exist;
      });
    });

    it('component foo/x-foo --dummy', function() {
      return emberGenerateDestroy(['component', 'foo/x-foo', '--dummy'], _file => {
        expect(_file('tests/dummy/app/components/foo/x-foo.ts')).to.equal(
          fixture('component/component-addon-nested.ts')
        );

        expect(_file('tests/dummy/app/templates/components/foo/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/foo/x-foo.js')).to.not.exist;

        expect(_file('tests/unit/components/foo/x-foo-test.ts')).to.not.exist;
      });
    });

    it('component x-foo --pod', function() {
      return emberGenerateDestroy(['component', 'x-foo', '--pod'], _file => {
        expect(_file('addon/components/x-foo/component.ts')).to.equal(
          fixture('component/component-addon-dash-pod.ts')
        );

        expect(_file('addon/components/x-foo/template.hbs')).to.equal('{{yield}}');

        expect(_file('app/components/x-foo/component.js')).to.contain(
          "export { default } from 'my-addon/components/x-foo/component';"
        );

        expect(_file('tests/integration/components/x-foo/component-test.ts')).to.equal(
          fixture('component-test/default-template.ts', {
            replace: {
              component: 'x-foo',
            },
          })
        );
      });
    });
  });

  describe('in in-repo-addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'in-repo-addon' }).then(() =>
        generateFakePackageManifest('ember-cli-qunit', '4.1.0')
      );
    });

    it('component foo --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(['component', 'foo', '--in-repo-addon=my-addon'], _file => {
        expect(_file('lib/my-addon/addon/components/foo.ts')).to.equal(
          fixture('component/component-addon.ts')
        );

        expect(_file('lib/my-addon/addon/templates/components/foo.hbs')).to.equal('{{yield}}');

        expect(_file('lib/my-addon/app/components/foo.js')).to.contain(
          "export { default } from 'my-addon/components/foo';"
        );

        expect(_file('tests/integration/components/foo-test.ts')).to.equal(
          fixture('component-test/default-template.ts', {
            replace: {
              component: 'foo',
            },
          })
        );
      });
    });

    it('component x-foo --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(['component', 'x-foo', '--in-repo-addon=my-addon'], _file => {
        expect(_file('lib/my-addon/addon/components/x-foo.ts')).to.equal(
          fixture('component/component-addon-dash.ts')
        );

        expect(_file('lib/my-addon/addon/templates/components/x-foo.hbs')).to.equal('{{yield}}');

        expect(_file('lib/my-addon/app/components/x-foo.js')).to.contain(
          "export { default } from 'my-addon/components/x-foo';"
        );

        expect(_file('tests/integration/components/x-foo-test.ts')).to.equal(
          fixture('component-test/default-template.ts', {
            replace: {
              component: 'x-foo',
            },
          })
        );
      });
    });

    it('component foo/x-foo --in-repo-addon=my-addon', function() {
      return emberGenerateDestroy(['component', 'foo/x-foo', '--in-repo-addon=my-addon'], _file => {
        expect(_file('lib/my-addon/addon/components/foo/x-foo.ts')).to.equal(
          fixture('component/component-addon-nested.ts')
        );

        expect(_file('lib/my-addon/addon/templates/components/foo/x-foo.hbs')).to.equal(
          '{{yield}}'
        );

        expect(_file('lib/my-addon/app/components/foo/x-foo.js')).to.contain(
          "export { default } from 'my-addon/components/foo/x-foo';"
        );

        expect(_file('tests/integration/components/foo/x-foo-test.ts')).to.equal(
          fixture('component-test/default-template.ts', {
            replace: {
              component: 'foo/x-foo',
            },
          })
        );
      });
    });

    it('component x-foo --in-repo-addon=my-addon --pod', function() {
      return emberGenerateDestroy(
        ['component', 'x-foo', '--in-repo-addon=my-addon', '--pod'],
        _file => {
          expect(_file('lib/my-addon/addon/components/x-foo/component.ts')).to.equal(
            fixture('component/component-addon-dash-pod.ts')
          );

          expect(_file('lib/my-addon/addon/components/x-foo/template.hbs')).to.equal('{{yield}}');

          expect(_file('lib/my-addon/app/components/x-foo/component.js')).to.contain(
            "export { default } from 'my-addon/components/x-foo/component';"
          );

          expect(_file('tests/integration/components/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'x-foo',
              },
            })
          );
        }
      );
    });

    it('component foo/x-foo --in-repo-addon=my-addon --pod', function() {
      return emberGenerateDestroy(
        ['component', 'foo/x-foo', '--in-repo-addon=my-addon', '--pod'],
        _file => {
          expect(_file('lib/my-addon/addon/components/foo/x-foo/component.ts')).to.equal(
            fixture('component/component-addon-nested-pod.ts')
          );

          expect(_file('lib/my-addon/addon/components/foo/x-foo/template.hbs')).to.equal(
            '{{yield}}'
          );

          expect(_file('lib/my-addon/app/components/foo/x-foo/component.js')).to.contain(
            "export { default } from 'my-addon/components/foo/x-foo/component';"
          );

          expect(_file('tests/integration/components/foo/x-foo/component-test.ts')).to.equal(
            fixture('component-test/default-template.ts', {
              replace: {
                component: 'foo/x-foo',
              },
            })
          );
        }
      );
    });
  });
});
