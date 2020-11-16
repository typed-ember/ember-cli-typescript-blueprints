import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import { run } from '@ember/runloop';

describe('Unit | Model | foo', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let store = this.owner.lookup('service:store');
    let model = run(() => store.createRecord('foo', {}));

    expect(model).to.be.ok;
  });
});
