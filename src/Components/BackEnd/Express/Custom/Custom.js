const path = require("path");

const { AddPackage } = require(path.join(
  __dirname,
  "../../../../Scripts/PackageManager"
));

const { GitAdd, GitCommit } = require(path.join(
  __dirname,
  "../../../../Scripts/Git"
));

const RunExpressInstaller = async () => {
  const { PackageManager, GitForConfig } = global.Config;
  await AddPackage("express", "", PackageManager);
  if (GitForConfig) {
    await GitAdd(".");
    await GitCommit("Added express package");
  }
};

module.exports = async () => {
  await RunExpressInstaller();
};
