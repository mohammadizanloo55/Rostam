const path = require("path");
const { Select, Confirm, Input } = require("enquirer");

const { GitChecker } = require(path.join(__dirname, "./Scripts/Git"));
const { YarnChecker } = require(path.join(
  __dirname,
  "./Scripts/PackageManager"
));
const { ProjectDirectoryChecker } = require(path.join(
  __dirname,
  "./Scripts/ProjectDirectory"
));

const FrontEnd = require(path.join(
  __dirname,
  "./Components/FrontEnd/FrontEnd"
));
const BackEnd = require(path.join(__dirname, "./Components/BackEnd/BackEnd"));
const Questions = {
  Side: {
    initial: "FrontEnd",
    message: "Choose your side",
    choices: ["FrontEnd", "BackEnd"],
  },
  PackageManager: {
    initial: "Yarn",
    message: "Choose your Package Manager",
    choices: ["Yarn", "Npm"],
  },
  ProjectName: {
    initial: path.basename(process.cwd()),
    message: "Please enter the name of your project",
  },
  Prettier: {
    name: "Prettier",
    initial: true,
    message: "do you want Prettier?",
  },
  Log: {
    name: "Log",
    initial: false,
    message: "do you want Logs ?",
  },
  Git: {
    UseGit: {
      name: "UseGit",
      initial: true,
      message: "do you want Git",
    },
    GitForConfig: {
      name: "GitForConfig",
      initial: true,
      message: "do you want Git for Rostam configuration",
    },
  },
};

const RunGitChecker = async (UseGit) => {
  if (UseGit) {
    await GitChecker();
  }
};
const RunYarnChecker = async (PackageManager) => {
  if (PackageManager === "Yarn") {
    await YarnChecker();
  }
};
const App = async () => {
  const Side = await new Select(Questions.Side).run();

  const PackageManager = await new Select(Questions.PackageManager).run();
  await RunYarnChecker(PackageManager);

  const ProjectName = await new Input(Questions.ProjectName).run();
  await ProjectDirectoryChecker(ProjectName);

  const UseGit = await new Confirm(Questions.Git.UseGit).run();
  RunGitChecker(UseGit);

  const GitForConfig = await new Confirm({
    ...Questions.Git.GitForConfig,
    initial: UseGit,
    skip: !UseGit,
  }).run();
  const Prettier = await new Confirm({
    ...Questions.Prettier,
    initial: UseGit,
    skip: !UseGit,
  }).run();
  const Log = await new Confirm(Questions.Log).run();
  global.Config = {
    Side,
    PackageManager,
    ProjectName,
    UseGit,
    Prettier,
    GitForConfig,
    Log,
  };
  switch (Side) {
    case "FrontEnd": {
      await FrontEnd();
      break;
    }
    case "BackEnd": {
      await BackEnd();
      break;
    }
    default: {
      console.log("You did not specify your side");
      process.exit();
    }
  }
};
module.exports = App;
