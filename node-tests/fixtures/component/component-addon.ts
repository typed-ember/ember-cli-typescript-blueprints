import Component from '@ember/component';
// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/foo';

export default class Foo extends Component.extend({
  // anything which *must* be merged to prototype here
}) {
  layout = layout;
  // normal class body definition here
};
