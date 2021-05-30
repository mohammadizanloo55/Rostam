const fs = require("fs");
const ora = require("ora");
const validate = require("validate-npm-package-name");

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
module.exports.ProjectDirectoryChecker = async (Name) => {
  const Spinner = ora("Checking Project Name ...");
  try {
    const IsExists = await fs.existsSync(Name);
    if (IsExists) {
      throw Error(
        "Directory with this name is exists remove the Directory or change Project Name"
      );
    }
    if (Name.match(/([A-Z])(.*)/g)) {
      throw Error("name can no longer contain capital letters");
    }
    if (!validate(Name).validForNewPackages) {
      throw Error(validate(Name).errors);
    }
    Spinner.succeed("Project Name is ok");
  } catch (error) {
    Spinner.fail("There is a problem with the project name check the log");
    console.error(error);
    process.exit();
  }
};
