<% if (testType === 'integration') { %>import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { TestContext } from 'ember-test-helpers';
import { render } from '@ember/test-helpers';
<%= hbsImportStatement %>

type Context = TestContext & {
  <% if (testType === 'integration') { %>element: HTMLElement<% } %>
  // add your test properties here
}

module('<%= friendlyTestDescription %>', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(this: Context, assert: Assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<%= selfCloseComponent(componentName) %>`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <%= openComponent(componentName) %>
        template block text
      <%= closeComponent(componentName) %>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});<% } else if (testType === 'unit') { %>import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { TestContext } from 'ember-test-helpers';

type Context = TestContext & {
  // add your test properties here
}

module('<%= friendlyTestDescription %>', function(hooks) {
  setupTest(hooks);

  test('it exists', function(this: Context, assert: Assert) {
    let component = this.owner.factoryFor('component:<%= componentPathName %>').create();
    assert.ok(component);
  });
});<% } %>