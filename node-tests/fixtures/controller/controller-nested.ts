import Controller from '@ember/controller';

export default class FooBarController extends Controller {}

// Required for TypeScript.
declare module '@ember/controller' {
  interface Registry {
    'foo/bar': FooBarController;
  }
}
