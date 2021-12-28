const path = require('path');

var testInfo = require('ember-cli-test-info');
var useTestFrameworkDetector = require('../test-framework-detector');

module.exports = useTestFrameworkDetector({
  description: 'Generates an ember-data adapter unit test',

  root: __dirname,

  fileMapTokens(options) {
    return {
      __root__() {
        return 'tests';
      },
      __path__() {
        return path.join('unit', 'adapters');
      },
    };
  },

  locals(options) {
    return {
      friendlyTestDescription: testInfo.description(options.entity.name, 'Unit', 'Adapter'),
    };
  },
});
