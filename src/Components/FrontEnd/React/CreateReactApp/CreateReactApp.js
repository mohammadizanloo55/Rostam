const path = require("path");
const { DeleteGitFolder, DeleteGitIgnore } = require("../../../../Scripts/Git");
const { Npx } = require("../../../../Scripts/PackageManager");

const RunCreateReactAppNpx = async () => {
  const { PackageManager, ProjectName, Log } = global.Config;

  await Npx(`create-react-app ${ProjectName}`, "", PackageManager, {
    stdio: `${Log ? "inherit" : "pipe"}`,
  });
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
