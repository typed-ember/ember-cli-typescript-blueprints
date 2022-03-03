<%= importStatement %>

export default class <%= classifiedModuleName %>Serializer extends <%= baseClass %> {}

// DO NOT DELETE: this is how TypeScript knows how to look up your serializers.
declare module 'ember-data/types/registries/serializer' {
  export default interface SerializerRegistry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>;
  }
}
