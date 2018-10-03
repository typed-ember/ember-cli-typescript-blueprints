import DS from 'ember-data';

export default class <%= classifiedModuleName %> extends DS.Model.extend({
<%= attrs.length ? '  ' + attrs : '' %>
}) {
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>;
  }
}
