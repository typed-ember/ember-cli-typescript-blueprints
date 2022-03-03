import Model, { attr } from '@ember-data/model';
import type CustomTransform from '../transforms/custom-transform';

export default class FooModel extends Model {
  @attr('string')
  declare misc?: string;

  @attr('array')
  declare skills?: Array;

  @attr('boolean')
  declare isActive?: boolean;

  @attr('date')
  declare birthday?: Date;

  @attr('object')
  declare someObject?: Object;

  @attr('number')
  declare age?: number;

  @attr('string')
  declare name?: string;

  @attr('custom-transform')
  declare customAttr?: CustomTransform;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your model.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'foo': FooModel;
  }
}
