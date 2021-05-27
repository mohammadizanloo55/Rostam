const { execSync } = require("child_process");
const ora = require("ora");

module.exports.YarnChecker = async (
  message = "You do not have yarn on your system, please install it to use it"
) => {
  const Spinner = ora("Checking that yarn is installed ...").start();

  try {
    await execSync("yarn -v");
    Spinner.succeed("yarn is install");
  } catch (err) {
    Spinner.fail("yarn is not install");
    console.error(message);
    process.exit();
  }
};
