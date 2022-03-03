import Model, { belongsTo, type AsyncBelongsTo } from '@ember-data/model';
import type Post from './post';
import type User from './user';

export default class CommentModel extends Model {
  @belongsTo('post')
  declare post: AsyncBelongsTo<Post>;

  @belongsTo('user')
  declare author: AsyncBelongsTo<User>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your model.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'comment': CommentModel;
  }
}
