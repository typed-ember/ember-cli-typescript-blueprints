'use strict';

module.exports = {
  description: 'Generates a simple utility module/function.',
  normalizeEntityName: function (entityName) {
    return entityName.replace(/\.[jt]s$/, ''); //Prevent generation of ".js.js" files
  },
};
