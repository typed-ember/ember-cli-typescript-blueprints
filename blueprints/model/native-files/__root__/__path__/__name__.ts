import Model<%= importedModules.length ? `, { ${importedModules} }` : '' %> from '@ember-data/model';
<%= importedTypes.length ? importedTypes.join('\n') : '' %>

export default class <%= classifiedModuleName %>Model extends Model {
<%= attrs.length ? attrs : '' %>
}

// DO NOT DELETE: this is how TypeScript knows how to look up your model.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Model;
  }
}
