'use strict';

module.exports = {
  description: 'Generates a mixin.',
  normalizeEntityName: function (entityName) {
    return entityName.replace(/\.ts$/, ''); //Prevent generation of ".ts.ts" files
  },
};
