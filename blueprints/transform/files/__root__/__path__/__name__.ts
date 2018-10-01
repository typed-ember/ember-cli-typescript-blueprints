import DS from 'ember-data';

const <%= classifiedModuleName %> = DS.Transform.extend({
  deserialize(serialized) {
    return serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});

declare module 'ember-data/types/registries/transform' {
  export default interface TransformRegistry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>;
  }
}

export default <%= classifiedModuleName %>;
