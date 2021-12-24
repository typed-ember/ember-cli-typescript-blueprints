import Service from '@ember/service';

export default class <%= classifiedModuleName %>Service extends Service.extend({
  // Anything which *must* be merged to prototype here
}) {
  // Normal class body definition here
}

// DO NOT DELETE. Required for TypeScript to look up this service.
declare module '@ember/service' {
  interface Registry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Service;
  }
}
