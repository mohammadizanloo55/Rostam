const { rmdirSync, unlinkSync } = require("fs");
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
