import Model, { hasMany, type AsyncHasMany } from '@ember-data/model';
import type Comment from './comment';

export default class PostModel extends Model {
  @hasMany('comment')
  declare comments: AsyncHasMany<Comment>;

  @hasMany('comment')
  declare otherComments: AsyncHasMany<Comment>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your model.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'post': PostModel;
  }
}
