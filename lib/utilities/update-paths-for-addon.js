'use strict';

module.exports = function(paths, addonName, appName, options) {
  options = options || {};
  const addonNameStar = [addonName, '*'].join('/');
  const addonPath = [options.isLinked ? 'node_modules' : 'lib', addonName].join('/');
  const addonAddonPath = [addonPath, 'addon'].join('/');
  const addonAppPath = [addonPath, 'app'].join('/');
  const appNameStar = [appName, '*'].join('/');
  const addonTestSupportPath = [addonName, 'test-support'].join('/');
  const addonTestSupportStarPath = `${addonTestSupportPath}/*`;
  let appStarPaths;
  paths = paths || {};
  appStarPaths = paths[appNameStar] = paths[appNameStar] || [];

  if (options.removePaths) {
    if (Object.prototype.hasOwnProperty.call(paths, addonName)) {
      delete paths[addonName];
    }
    if (Object.prototype.hasOwnProperty.call(paths, addonNameStar)) {
      delete paths[addonNameStar]
    }
    let addonAppPathIndex = appStarPaths.indexOf([addonAppPath, '*'].join('/'));
    if (addonAppPathIndex > -1) {
      appStarPaths.splice(addonAppPathIndex, 1);
      paths[appNameStar] = appStarPaths;
    }
  } else {
    if (!Object.prototype.hasOwnProperty.call(paths, addonName)) {
      paths[addonName] = [ addonAddonPath ];
    }
    if (!Object.prototype.hasOwnProperty.call(paths, (addonNameStar)) {
      paths[addonNameStar] = [ [addonAddonPath, '*'].join('/') ];
    }
    if (!Object.prototype.hasOwnProperty.call(paths, addonTestSupportPath)) {
      paths[addonTestSupportPath] = [ [addonPath, 'addon-test-support'].join('/') ];
    }
    if (!Object.prototype.hasOwnProperty.call(paths, addonTestSupportStarPath)) {
      paths[addonTestSupportStarPath] = [ [addonPath, 'addon-test-support', '*'].join('/') ];
    }
    if (appStarPaths.indexOf(addonAppPath) === -1) {
      appStarPaths.push([addonAppPath, '*'].join('/'));
      paths[appNameStar] = appStarPaths;
    }
  }
}
