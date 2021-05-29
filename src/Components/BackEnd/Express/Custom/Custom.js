const fs = require("fs");
const path = require("path");

const { GitInit, CreateGitIgnore, GitAdd, GitCommit } = require(path.join(
  __dirname,
  "../../../../Scripts/Git"
));
const { InitPackageManager } = require(path.join(
  __dirname,
  "../../../../Scripts/PackageManager"
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
const RunInitPackageManager = async (Path) => {
  const { ProjectName } = global.Config;
  await InitPackageManager(Path, {
    name: ProjectName,
    version: "1.0.0",
    main: "src/index.js",
    license: "MIT",
  });
};
module.exports = async () => {
  const { ProjectName } = global.Config;
  const ProjectDirectory = path.join(process.cwd(), ProjectName);
  await fs.mkdirSync(ProjectDirectory);
  process.chdir(ProjectDirectory);
  await RunGitInit();
  await RunCreateGitIgnore(ProjectDirectory);
  await RunInitPackageManager(ProjectDirectory);
};
