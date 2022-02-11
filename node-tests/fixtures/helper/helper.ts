import { helper } from '@ember/component/helper';

export default helper(function fooBarBaz(positional: unknown[] /*, named:Dict<unknown>*/) {
  return positional;
});
