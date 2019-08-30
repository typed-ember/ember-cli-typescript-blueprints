// @ts-check
const { writeFileSync } = require('fs');
const { ensureDirSync } = require('fs-extra');
const path = require('path');

/**
 * Create fake package manifests on the file system to use in ensuring that the
 * blueprint generator is well-behaved with different test environments (e.g.
 * qunit and mocha).
 *
 * @param {string} name
 * @param {string} version
 */
function generateFakePackageManifest(name, version) {
  const targetDir = path.join('node_modules', name);
  ensureDirSync(targetDir);

  const pkgFilePath = path.join(targetDir, 'package.json');
  writeFileSync(pkgFilePath, JSON.stringify({ version }));
}

module.exports = generateFakePackageManifest;
