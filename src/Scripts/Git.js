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
  try {
    await execSync("git --version");
  } catch (err) {
    console.error(message);
    process.exit();
  }
};
