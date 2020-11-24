import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

describe('<%= friendlyTestDescription %>', function() {
  setupRenderingTest();

  it('renders', async function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<%= selfCloseComponent(componentName) %>`);

    expect(this.element.textContent.trim()).to.equal('');

    // Template block usage:
    await render(hbs`
      <%= openComponent(componentName) %>
        template block text
      <%= closeComponent(componentName) %>
    `);

    expect(this.element.textContent.trim()).to.equal('template block text');
  });
});