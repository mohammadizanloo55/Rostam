const path = require("path");
const fs = require("fs");
const ora = require("ora");

const { AddPackage, Npx } = require(path.join(__dirname, "./PackageManager"));
module.exports.InstallPrettier = async (PackageManager) => {
  try {
    await AddPackage("prettier", "--dev --exact", PackageManager);
  } catch (err) {
    console.err(err);
    process.exit();
  }
};
module.exports.MrmLintStaged = async (PackageManager) => {
  try {
    await Npx("mrm lint-staged", "", PackageManager);
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
module.exports.ChangeLintStagedConfig = async () => {
  const Spinner = ora("changing Package.json lint-staged config ... ");
  try {
    const PackageDotJson = JSON.parse(await fs.readFileSync("package.json"));
    PackageDotJson["lint-staged"] = {
      "*.*": "prettier '**/*' --write --ignore-unknown",
    };
    fs.writeFileSync("package.json", JSON.stringify(PackageDotJson, null, 2));

    Spinner.succeed("Package.json lint-staged will be Configured");
  } catch (err) {
    Spinner.fail("Package.json lint-staged Could not configure");
    console.log(err);
    process.exit();
  }
};
