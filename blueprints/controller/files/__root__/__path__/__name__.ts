import Controller from '@ember/controller';

export default class <%= classifiedModuleName %>Controller extends Controller {}

// Required for TypeScript.
declare module '@ember/controller' {
  interface Registry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Controller;
  }
}
