import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | foo', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:foo');
    assert.ok(adapter);
  });
});
