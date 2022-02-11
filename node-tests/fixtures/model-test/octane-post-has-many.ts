import Model, { hasMany } from '@ember-data/model';
import DS from 'ember-data';
import Comment from '../comment';

export default class PostModel extends Model {
  @hasMany('comment') declare comment: DS.PromiseManyArray<Comment>;
  @hasMany('comment') declare otherComments: DS.PromiseManyArray<Comment>;
}

