const fs = require("fs");
const path = require("path");

const { GitInit } = require(path.join(__dirname, "../../../../Scripts/Git"));

const RunGitInit = async () => {
  const { UseGit } = global.Config;
  if (UseGit) {
    await GitInit();
  }
};

module.exports = async () => {
  const { ProjectName } = global.Config;
  const ProjectDirectory = path.join(process.cwd(), ProjectName);
  await fs.mkdirSync(ProjectDirectory);
  process.chdir(ProjectDirectory);
  await RunGitInit();
};
