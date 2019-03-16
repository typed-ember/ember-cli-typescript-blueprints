import DS from 'ember-data';
const { <%= importedModules %> } = DS;

export default class <%= classifiedModuleName %>Model extends Model {
<%= attrs.length ? attrs : '' %>
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Model;
  }
}
