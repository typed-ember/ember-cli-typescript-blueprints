import Service from '@ember/service';

export default class <%= classifiedModuleName %>Service extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Service;
  }
}
