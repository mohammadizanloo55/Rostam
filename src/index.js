const { Select } = require("enquirer");
const { Confirm } = require("enquirer");

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
  Prettier: {
    name: "Prettier",
    initial: true,
    message: "do you want Prettier?",
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
      message: "do you want Git for javascript-starter configuration",
    },
  },
};

const App = async () => {
  const Side = await new Select(Questions.Side).run();

  const PackageManager = await new Select(Questions.PackageManager).run();

  const UseGit = await new Confirm(Questions.Git.UseGit).run();

  const GitForConfig = await new Confirm({
    ...Questions.Git.GitForConfig,
    skip: UseGit,
  }).run();

  const Prettier = await new Confirm({
    ...Questions.Prettier,
    skip: UseGit,
  }).run();

  global.Config = {
    Side,
    PackageManager,
    UseGit,
    Prettier,
    GitForConfig,
  };
};
App();
