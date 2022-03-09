<grey>You may generate models with as many attrs as you would like to pass. The following attribute types are supported:</grey>
<yellow><attr-name></yellow>
<yellow><attr-name></yellow>:array
<yellow><attr-name></yellow>:boolean
<yellow><attr-name></yellow>:date
<yellow><attr-name></yellow>:object
<yellow><attr-name></yellow>:number
<yellow><attr-name></yellow>:string
<yellow><attr-name></yellow>:your-custom-transform
<yellow><attr-name></yellow>:belongs-to:<yellow><model-name></yellow>
<yellow><attr-name></yellow>:has-many:<yellow><model-name></yellow>

For instance: <green>\`ember generate model taco filling:belongs-to:protein toppings:has-many:toppings name:string price:number misc\`</green> would result in the following model:

```ts
import Model, { belongsTo, hasMany, attr, type AsyncHasMany, type AsyncBelongsTo } from '@ember-data/model';
import type Protein from './protein';
import type Topping from './topping';

export default class TacoModel extends Model {
  @belongsTo('protein') declare filling: AsyncBelongsTo<Protein>;
  @hasMany('topping') declare toppings: AsyncHasMany<Topping>;
  @attr('string') declare name?: string;
  @attr('number') declare price?: number;
  @attr declare misc?: string;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    taco: TacoModel;
  }
}
```

The module and interface declaration at the end of the file is to support looking up models by name, rather than having to use type coercions.
