<%= importStatement %>

export default class <%= classifiedModuleName %>Adapter extends <%= baseClass %> {
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Adapter;
  }
}
