import Model<%= importedModules.length ? `, { ${importedModules} }` : '' %> from '@ember-data/model';

export default class <%= classifiedModuleName %>Model extends Model {
<%= attrs.length ? attrs : '' %>
}

// Required for TypeScript.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Model;
  }
}
