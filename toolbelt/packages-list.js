const fs = require( 'fs' );

function isPackageDir(folderName) {
  return (
    folderName.indexOf('.') === -1 && // Exclude .DS_Store
    folderName.substr(0, 1) !== '_' // Exclude _folder
  );
}

function packageList() {

  return fs.readdirSync('./packages')
    .filter(isPackageDir);

}

module.exports = {
  packageList
};
