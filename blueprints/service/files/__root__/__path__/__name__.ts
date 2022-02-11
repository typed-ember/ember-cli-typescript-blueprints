import Service from '@ember/service';

export default class <%= classifiedModuleName %>Service extends Service {}

// Required for TypeScript.
declare module '@ember/service' {
  interface Registry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Service;
  }
}
