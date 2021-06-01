const path = require("path");
const fs = require("fs");
const { Select, Confirm } = require("enquirer");

const Custom = require(path.join(__dirname, "./Express/Custom/Custom"));
const { GitInit, CreateGitIgnore, GitAdd, GitCommit } = require(path.join(
  __dirname,
  "../../Scripts/Git"
));
const { InitPackageManager, AddPackage } = require(path.join(
  __dirname,
  "../../Scripts/PackageManager"
));
const {
  InstallPrettier,
  MrmLintStaged,
  ChangeLintStagedConfig,
} = require(path.join(__dirname, "../../Scripts/Prettier"));
const { CreateProjectDirectory } = require(path.join(
  __dirname,
  "../../Scripts/ProjectDirectory"
));
const {
  InstallEslint,
  AddedEslintrc,
  AddedEslintToLintStaged,
  AddedLintScript,
} = require(path.join(__dirname, "../../Scripts/Eslint"));

const Questions = {
  FrameWorks: {
    initial: "Express",
    message: "Choose your framework",
    choices: ["Express"],
  },
  Eslint: {
    UseEslint: {
      name: "Eslint",
      initial: true,
      message: "do you want eslint?",
    },
    EslintConfig: {
      initial: "fullstacksjs",
      message: "Choose your eslintConfig",
      choices: [
        {
          name: "fullstacksjs",
          message:
            "@fullstacksjs/eslint-config : https://github.com/fullstacksjs/eslint-config",
        },
        {
          name: "airbnb",
          message:
            "eslint-config-airbnb : https://github.com/airbnb/javascript",
        },
        {
          name: "standard",
          message:
            "eslint-config-standard : https://github.com/standard/eslint-config-standard",
        },
      ],
    },
  },
};
const RunCreateProjectDirectory = async (Path) => {
  await CreateProjectDirectory(Path);
};
const RunGitInit = async () => {
  const { UseGit } = global.Config;
  if (UseGit) {
    await GitInit();
  }
};
const RunCreateGitIgnore = async (Path) => {
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
const RunPrettierInstaller = async () => {
  const { PackageManager, GitForConfig, UseGit, Prettier } = global.Config;
  if (UseGit && Prettier) {
    await InstallPrettier(PackageManager);
    if (GitForConfig) {
      await GitAdd(".");
      await GitCommit("Added Prettier Package");
    }
    await MrmLintStaged(PackageManager);
    await ChangeLintStagedConfig();
    if (GitForConfig) {
      await GitAdd(".");
      await GitCommit("lint-staged will be Configured");
    }
  }
};
const RunInstallEslint = async (UseEslint, EslintConfig, ProjectDirectory) => {
  const { PackageManager, GitForConfig, Prettier } = global.Config;
  const Eslintrc = {
    extends: [],
  };
  if (UseEslint) {
    await InstallEslint(PackageManager);
    if (GitForConfig) {
      await GitAdd(".");
      await GitCommit("Added eslint package");
    }
    switch (EslintConfig) {
      case "fullstacksjs": {
        await AddPackage(
          "@fullstacksjs/eslint-config prettier",
          "--dev",
          PackageManager
        );
        Eslintrc.extends.push("@fullstacksjs");
        break;
      }
      case "airbnb": {
        await AddPackage(
          "eslint-config-airbnb-base eslint-plugin-import",
          "--dev",
          PackageManager
        );
        Eslintrc.extends.push("airbnb-base");
        break;
      }
      default: {
        await AddPackage(
          "eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise",
          "--dev",
          PackageManager
        );
        Eslintrc.extends.push("standard");
        break;
      }
    }
    if (Prettier) {
      await AddPackage("eslint-config-prettier", "--dev", PackageManager);
      Eslintrc.extends.push("prettier");
      await AddedEslintToLintStaged();
    }
    await AddedEslintrc(ProjectDirectory, Eslintrc);
    if (GitForConfig) {
      await GitAdd(".");
      await GitCommit("eslint Configured");
    }
    await AddedLintScript();
    if (GitForConfig) {
      await GitAdd(".");
      await GitCommit("Added Lint script");
    }
  }
};
const BackEnd = async () => {
  const FrameWork = await new Select(Questions.FrameWorks).run();
  const { ProjectName, GitForConfig, UseGit } = global.Config;
  const UseEslint = await new Confirm(Questions.Eslint.UseEslint).run();
  const EslintConfig = await new Select({
    ...Questions.Eslint.EslintConfig,
    skip: !UseEslint,
  }).run();
  const ProjectDirectory = path.join(process.cwd(), ProjectName);
  await RunCreateProjectDirectory(ProjectDirectory);
  process.chdir(ProjectDirectory);
  await RunGitInit();
  await RunCreateGitIgnore(ProjectDirectory);
  await RunInitPackageManager(ProjectDirectory);
  await RunPrettierInstaller();
  switch (FrameWork) {
    case "Express": {
      await Custom();
      break;
    }
    default: {
      throw Error("You did not specify your FrameWork");
    }
  }
  await RunInstallEslint(UseEslint, EslintConfig, ProjectDirectory);
  if (UseGit && !GitForConfig) {
    await GitAdd(".");
    await GitCommit("Initialize project with Rostam");
  }
};
module.exports = BackEnd;
