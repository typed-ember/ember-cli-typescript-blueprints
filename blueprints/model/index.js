const EOL = require('os').EOL;

const inflection = require('inflection');
const stringUtils = require('ember-cli-string-utils');
const useEditionDetector = require('../edition-detector');
const { has } = require('@ember/edition-utils');

module.exports = useEditionDetector({
  description: 'Generates an ember-data model.',

  anonymousOptions: ['name', 'attr:type'],

  root: __dirname,

  locals(options) {
    let hasOctane = has('octane');
    let attrs = [];
    let needs = [];
    let importedTypes = [];
    let entityOptions = options.entity.options;
    let includeHasMany = false;
    let includeBelongsTo = false;
    let includeAttr = false;

    for (let name in entityOptions) {
      let attrType = entityOptions[name] || '';
      let foreignModel = name;
      if (attrType.indexOf(':') > -1) {
        foreignModel = attrType.split(':')[1];
        attrType = attrType.split(':')[0];
      }
      let dasherizedName = stringUtils.dasherize(name);
      let classifiedName = stringUtils.classify(inflection.singularize(foreignModel));
      let camelizedName = stringUtils.camelize(name);
      let dasherizedType = stringUtils.dasherize(attrType);
      let dasherizedForeignModel = stringUtils.dasherize(foreignModel);
      let dasherizedForeignModelSingular = inflection.singularize(dasherizedForeignModel);

      let attr;
      if (/has-many/.test(dasherizedType)) {
        includeHasMany = true;
        let camelizedNamePlural = inflection.pluralize(camelizedName);
        attr = {
          name: dasherizedForeignModelSingular,
          attrType: dasherizedType,
          propertyName: camelizedNamePlural,
          type: classifiedName,
        };
        importedTypes.push(importedType(attr));
      } else if (/belongs-to/.test(dasherizedType)) {
        includeBelongsTo = true;
        attr = {
          name: dasherizedForeignModel,
          attrType: dasherizedType,
          propertyName: camelizedName,
          type: classifiedName,
        };
        importedTypes.push(importedType(attr));
      } else {
        includeAttr = true;

        let type = dasherizedType;

        attr = {
          name: dasherizedName,
          attrType: dasherizedType,
          propertyName: camelizedName,
          type,
        };
      }

      if (customAttrType(attr)) {
        attr.type = stringUtils.classify(attr.attrType);
        if (!/^(Array|Date|Object||)$/.test(attr.type)) {
          importedTypes.push(importedTransformType(attr));
        }
      }

      attrs.push(attr);

      if (/has-many|belongs-to/.test(dasherizedType)) {
        needs.push("'model:" + dasherizedForeignModelSingular + "'");
      }
    }

    if (attrs.length) {
      let attrTransformer, attrSeparator;

      if (hasOctane && process.env.EMBER_EDITION === 'classic') {
        hasOctane = false; //forcible override
      }
      if (hasOctane) {
        attrTransformer = nativeAttr;
        attrSeparator = ';';
      } else {
        attrTransformer = classicAttr;
        attrSeparator = ',';
      }

      attrs = attrs.map(attrTransformer);
      attrs = attrs.map((attr) => `  ${attr}${attrSeparator}`);
      if (hasOctane) {
        attrs = attrs.join(EOL + EOL);
      } else {
        attrs = attrs.join(EOL);
      }
    }

    let needsDeduplicated = needs.filter(function (need, i) {
      return needs.indexOf(need) === i;
    });
    needs = '  needs: [' + needsDeduplicated.join(', ') + ']';

    let importedModules = [];

    if (includeAttr) {
      importedModules.push('attr');
    }
    if (includeBelongsTo) {
      importedModules.push('belongsTo');
      if (hasOctane) {
        importedModules.push('type AsyncBelongsTo');
      }
    }
    if (includeHasMany) {
      importedModules.push('hasMany');
      if (hasOctane) {
        importedModules.push('type AsyncHasMany');
      }
    }
    importedModules = importedModules.join(', ');

    importedTypes = [...new Set(importedTypes)];

    return {
      importedTypes,
      importedModules,
      attrs,
      needs,
    };
  },
});

function importedTransformType({ attrType, type }) {
  return `import type ${type} from '../transforms/${attrType}';`;
}

function importedType({ name, type }) {
  return `import type ${type} from './${name}';`;
}

function customAttrType({ attrType }) {
  // Ember data has a built in "date" type as well, but that
  // corresponds to the type Date.
  return !/(string|number|boolean|has-many|belongs-to)/.test(attrType);
}

function nativeAttr(attr) {
  let name = attr.name,
    attrType = attr.attrType,
    propertyName = attr.propertyName,
    type = attr.type,
    tail,
    result;

  if (attrType === 'belongs-to') {
    result = `@belongsTo('${name}')\n  declare`;
    tail = `: AsyncBelongsTo<${type}>`;
  } else if (attrType === 'has-many') {
    result = `@hasMany('${name}')\n  declare`;
    tail = `: AsyncHasMany<${type}>`;
  } else if (attrType === '') {
    result = `@attr('string')\n  declare`;
    tail = '?: string';
  } else {
    result = `@attr('${attrType}')\n  declare`;
    tail = `?: ${type}`;
  }
  return `${result} ${propertyName}${tail}`;
}

function classicAttr(attr) {
  let name = attr.name,
    type = attr.attrType,
    propertyName = attr.propertyName,
    result;

  if (type === 'belongs-to') {
    result = "belongsTo('" + name + "')";
  } else if (type === 'has-many') {
    result = "hasMany('" + name + "')";
  } else if (type === '') {
    //"If you don't specify the type of the attribute, it will be whatever was provided by the server"
    //https://emberjs.com/guides/models/defining-models/
    result = 'attr()';
  } else {
    result = "attr('" + type + "')";
  }
  return propertyName + ': ' + result;
}
