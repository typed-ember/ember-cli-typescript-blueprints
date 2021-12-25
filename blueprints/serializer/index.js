const extendFromApplicationEntity = require('../../lib/utilities/extend-from-application-entity');
const useEditionDetector = require('../edition-detector');

module.exports = useEditionDetector({
  description: 'Generates an ember-data serializer.',

  availableOptions: [{ name: 'base-class', type: String }],

  root: __dirname,

  locals(options) {
    return extendFromApplicationEntity('serializer', 'JSONAPISerializer', options);
  },
});
