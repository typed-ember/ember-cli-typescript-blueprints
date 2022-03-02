import Model, { belongsTo, type AsyncBelongsTo } from '@ember-data/model';
import DS from 'ember-data';
import Post from '../post';
import User from '../user';

export default class CommentModel extends Model {
  @belongsTo('post') declare post: DS.PromiseObject<Post>
  @belongsTo('user') declare author: DS.PromiseObject<User>
}

