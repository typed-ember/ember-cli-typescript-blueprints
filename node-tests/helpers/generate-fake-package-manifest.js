var fs = require('fs');
var path = require('path');

module.exports = function generateFakePackageManifest(name, version) {
  let targetDir = 'node_modules/' + name;

  let dir = '';
  targetDir.split('/').reduce((parentDir, childDir) => {
    const curDir = path.resolve(parentDir, childDir);

    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
    }

    return curDir;
  }, dir);


  fs.writeFileSync(targetDir + '/package.json', JSON.stringify({
    version: version,
  }));
};
