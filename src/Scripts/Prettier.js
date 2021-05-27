const path = require("path");

const { AddPackage, Npx } = require(path.join(__dirname, "./PackageManager"));
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
module.exports.MrmLintStaged = async (
  PackageManager = global.Config.PackageManager
) => {
  try {
    await Npx("mrm lint-staged", "", PackageManager);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
