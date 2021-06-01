const path = require("path");
const fs = require("fs");
const ora = require("ora");

const { AddPackage } = require(path.join(__dirname, "./PackageManager"));

module.exports.InstallEslint = async (PackageManager) => {
  try {
    await AddPackage("eslint", "--dev", PackageManager);
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
module.exports.AddedEslintrc = async (Path, Configs) => {
  const Spinner = ora("Creating eslint Config file").start();
  try {
    await fs.writeFileSync(
      path.join(Path, ".eslintrc.json"),
      JSON.stringify(Configs, null, 2)
    );
    Spinner.succeed("eslint config file Created");
  } catch (error) {
    Spinner.fail("eslint config file Could not create");
    console.error(error);
    process.exit();
  }
};
