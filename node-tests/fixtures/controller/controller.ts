import Controller from '@ember/controller';

export default class FooController extends Controller {}

// Required for TypeScript.
declare module '@ember/controller' {
  interface Registry {
    'foo': FooController;
  }
}
