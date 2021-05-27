const { execSync } = require("child_process");
const path = require("path");
const ora = require("ora");
const { DeleteGitFolder, DeleteGitIgnore } = require("../../../../Scripts/Git");

const RunCreateReactAppNpx = async () => {
  const Spinner = ora("Create React App is being installed ...").start();

  const { PackageManager, ProjectName, Log } = global.Config;

  const Command = `npx create-react-app ${ProjectName} ${
    PackageManager === "Yarn" ? "" : "--use-npm"
  }`;
  await execSync(Command, {
    stdio: `${Log ? "inherit" : "pipe"}`,
  });
  Spinner.succeed("Create React App Installed");
};
const RunGitRemover = async () => {
  const { UseGit } = global.Config;
  if (!UseGit) {
    await DeleteGitFolder();
    await DeleteGitIgnore();
  }
};
module.exports = async () => {
  const { ProjectName } = global.Config;
  await RunCreateReactAppNpx();
  process.chdir(path.join(process.cwd(), ProjectName));
  await RunGitRemover();
};
