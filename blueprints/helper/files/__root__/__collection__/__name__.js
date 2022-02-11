import { helper } from '@ember/component/helper';

export default helper(function <%= camelizedModuleName %>(positional: unknown[] /*, named:Dict<unknown>*/) {
  return positional;
});
