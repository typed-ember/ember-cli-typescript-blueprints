import { moduleForComponent, test } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';

moduleForComponent('<%= path =%><%= component =%>', 'Integration | Component | <%= component =%>', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{<%= path =%><%= component =%>}}`);

  assert.equal(this.element.text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#<%= path =%><%= component =%>}}
      template block text
    {{/<%= path =%><%= component =%>}}
  `);

  assert.equal(this.element.text().trim(), 'template block text');
});
