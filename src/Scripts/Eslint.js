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
module.exports.AddedLintScript = async () => {
  const Spinner = ora("Adding lint Script to package.json").start();
  try {
    const PackageDotJson = await JSON.parse(fs.readFileSync("package.json"));
    PackageDotJson.scripts = {
      ...PackageDotJson.scripts,
      lint: "./node_modules/.bin/eslint . --fix",
    };
    await fs.writeFileSync(
      "package.json",
      JSON.stringify(PackageDotJson, null, 2)
    );
    Spinner.succeed("lint script added");
  } catch (error) {
    Spinner.fail("lint script Not added");
    console.error(error);
    process.exit();
  }
};
module.exports.AddedEslintToLintStaged = async () => {
  const Spinner = ora("Adding eslint to lintstaged ").start();
  try {
    const PackageDotJson = await JSON.parse(fs.readFileSync("package.json"));
    PackageDotJson["lint-staged"] = {
      ...PackageDotJson["lint-staged"],
      "*.js": "./node_modules/.bin/eslint --fix",
    };
    await fs.writeFileSync(
      "package.json",
      JSON.stringify(PackageDotJson, null, 2)
    );
    Spinner.succeed("eslint Added to lintstaged");
  } catch (error) {
    Spinner.fail("eslint Not added to lintstaged");
    console.error(error);
    process.exit();
  }
};
