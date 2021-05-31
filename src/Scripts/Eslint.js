const path = require("path");

const { AddPackage } = require(path.join(__dirname, "./PackageManager"));

module.exports.InstallEslint = async (PackageManager) => {
  try {
    await AddPackage("eslint", "--dev", PackageManager);
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
