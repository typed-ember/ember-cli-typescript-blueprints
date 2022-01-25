const path = require('path');

const testInfo = require('ember-cli-test-info');
const useTestFrameworkDetector = require('../test-framework-detector');

module.exports = useTestFrameworkDetector({
  description: 'Generates a transform unit test.',

  root: __dirname,

  fileMapTokens() {
    return {
      __root__() {
        return 'tests';
      },
      __path__() {
        return path.join('unit', 'transforms');
      },
    };
  },

  locals(options) {
    return {
      friendlyTestDescription: testInfo.description(options.entity.name, 'Unit', 'Transform'),
    };
  },
});
