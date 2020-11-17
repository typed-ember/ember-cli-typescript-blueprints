<% if (testType == 'integration') { %>
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | <%= dasherizedModuleName %>', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<<%= templateInvocation %> />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <<%= templateInvocation %>>
        template block text
      </<%= templateInvocation %>>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
<% } else if (testType == 'unit') { %>
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | <%= dasherizedModuleName %>', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let component = this.owner.factoryFor('component:<%= dasherizedModuleName %>').create();
    assert.ok(component);
  });
});
<% } >