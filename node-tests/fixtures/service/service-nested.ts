import Service from '@ember/service';

export default class FooBarService extends Service {}

// Required for TypeScript.
declare module '@ember/service' {
  interface Registry {
    'foo/bar': FooBarService;
  }
}
