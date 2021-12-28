'use strict';

const extendFromApplicationEntity = require('../../lib/utilities/extend-from-application-entity');
const useEditionDetector = require('../edition-detector');

module.exports = useEditionDetector({
  description: 'Generates an ember-data adapter.',

  availableOptions: [
    { name: 'base-class', type: String }
  ],

  locals: function(options) {
    return extendFromApplicationEntity('adapter', 'JSONAPIAdapter', options);
  }
});
