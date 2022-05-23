import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
<%= hbsImportStatement %>

module('<%= friendlyTestDescription %>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function (val) { ... });

    await render(hbs`<%= selfCloseComponent(componentName) %>`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <%= openComponent(componentName) %>
        template block text
      <%= closeComponent(componentName) %>
    `);

    assert.dom().hasText('template block text');
  });
});
