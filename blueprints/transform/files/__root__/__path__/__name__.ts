import DS from 'ember-data';

export default class <%= classifiedModuleName %>Transform extends Transform {
  deserialize(serialized) {
    return serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});

declare module 'ember-data/types/registries/transform' {
  export default interface TransformRegistry {
    '<%= dasherizedModuleName %>': <%= classifiedModuleName %>Transform;
  }
}
