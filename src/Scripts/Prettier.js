const path = require("path");

const { AddPackage } = require(path.join(__dirname, "./PackageManager"));
module.exports.InstallPrettier = async (
  PackageManager = global.Config.PackageManager
) => {
  try {
    await AddPackage("prettier", "--dev --exact", PackageManager);
  } catch (err) {
    console.err(err);
    process.exit();
  }
};
