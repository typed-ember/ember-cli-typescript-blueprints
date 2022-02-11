'use strict';

module.exports = {
  description: 'Generates a service.',
  normalizeEntityName: function (entityName) {
    return entityName.replace(/\.[jt]s$/, ''); //Prevent generation of ".js.js" files
  },
};
