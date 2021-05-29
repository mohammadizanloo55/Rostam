const { rmdirSync, unlinkSync } = require("fs");
const { execSync } = require("child_process");
const ora = require("ora");

module.exports.DeleteGitFolder = async () => {
  const Spinner = ora("Deleting Git Folder ...").start();
  try {
    await rmdirSync(".git", { recursive: true });
    Spinner.succeed("Git Directory Removed ");
  } catch (err) {
    Spinner.fail(err);
    console.error(err);
    process.exit();
  }
};
module.exports.DeleteGitIgnore = async () => {
  const Spinner = ora("Deleting GitIgnore file").start();
  try {
    await unlinkSync(".gitignore");
    Spinner.succeed(".gitignore File Removed");
  } catch (err) {
    Spinner.fail(err);
    console.error(err);
    process.exit();
  }
};
module.exports.GitChecker = async (
  message = "You do not have Git on your system, please install it to use it"
) => {
  const Spinner = ora("Checking that git is installed ...").start();
  try {
    await execSync("git --version");
    Spinner.succeed("git is install");
  } catch (err) {
    Spinner.fail("git is not install");
    console.error(message);
    process.exit();
  }
};
module.exports.GitAdd = async (WitchFiles) => {
  const Spinner = ora(`Adding ${WitchFiles} files ...`).start();
  try {
    await execSync(`git add ${WitchFiles}`);
    Spinner.succeed(`(${WitchFiles}) Files Added to git`);
  } catch (err) {
    Spinner.fail(`(${WitchFiles}) Files cant Added to git`);
    console.log(err);
    process.exit();
  }
};
module.exports.GitCommit = async (message) => {
  const Spinner = ora(` Committing  ${message} ...`).start();
  try {
    await execSync(`git commit -m '${message}'`);
    Spinner.succeed(`Committed  ${message}`);
  } catch (err) {
    Spinner.fail(`${message} not Committed `);
    console.log(err);
    process.exit();
  }
};
module.exports.GitInit = async () => {
  const Spinner = ora("git init").start();
  try {
    await execSync("git init");
    Spinner.succeed("git successfully init");
  } catch (err) {
    Spinner.fail("git init fail");
  }
};
