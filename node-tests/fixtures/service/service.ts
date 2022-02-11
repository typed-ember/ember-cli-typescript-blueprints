import Service from '@ember/service';

export default class FooService extends Service {}

// Required for TypeScript.
declare module '@ember/service' {
  interface Registry {
    'foo': FooService;
  }
}
