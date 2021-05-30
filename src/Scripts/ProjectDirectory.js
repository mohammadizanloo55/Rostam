const fs = require("fs");
const ora = require("ora");

module.exports.CreateProjectDirectory = async (Path) => {
  const Spinner = ora("Creating Project Directory...");
  try {
    await fs.mkdirSync(Path);
    Spinner.succeed("Project Directory Created");
  } catch (error) {
    Spinner.fail("Project Directory not Created");
    console.error();
    process.exit();
  }
};
