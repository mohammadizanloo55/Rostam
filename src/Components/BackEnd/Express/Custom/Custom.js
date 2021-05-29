const fs = require("fs");
const path = require("path");

const { GitInit, CreateGitIgnore, GitAdd, GitCommit } = require(path.join(
  __dirname,
  "../../../../Scripts/Git"
));

const RunGitInit = async () => {
  const { UseGit } = global.Config;
  if (UseGit) {
    await GitInit();
  }
};
const RunCreateGitIgnore = async (Path) => {
  console.log(Path);
  const { UseGit, GitForConfig } = global.Config;
  if (UseGit) {
    const Gitignore = await fs.readFileSync(
      path.join(__dirname, "GitignoreTemplate.txt")
    );
    await CreateGitIgnore(Path, Gitignore);
    if (GitForConfig) {
      await GitAdd(".");
      await GitCommit("Added .gitignore file");
    }
  }
};
module.exports = async () => {
  const { ProjectName } = global.Config;
  const ProjectDirectory = path.join(process.cwd(), ProjectName);
  await fs.mkdirSync(ProjectDirectory);
  process.chdir(ProjectDirectory);
  await RunGitInit();
  await RunCreateGitIgnore(ProjectDirectory);
};
