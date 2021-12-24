import Service from '@ember/service';

export default class FooService extends Service.extend({
  // Anything which *must* be merged to prototype here
}) {
  // Normal class body definition here
}

// DO NOT DELETE. Required for TypeScript to look up this service.
declare module '@ember/service' {
  interface Registry {
    'foo': FooService;
  }
}
