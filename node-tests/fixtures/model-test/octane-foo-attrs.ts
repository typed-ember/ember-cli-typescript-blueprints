import Model, { attr } from '@ember-data/model';
import CustomType from '../transforms/custom-transform';

export default class FooModel extends Model {
  @attr() declare misc: unknown;
  @attr('array') declare skills: Array;
  @attr('boolean') declare isActive: boolean;
  @attr('date') declare birthday: Date;
  @attr('object') declare someObject;
  @attr('number') declare age: number;
  @attr('string') declare name: string;
  @attr('custom-transform') declare customAttr: CustomType;
}
