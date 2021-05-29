const fs = require("fs");
const path = require("path");

module.exports = async () => {
  const { ProjectName } = global.Config;
  const ProjectDirectory = path.join(process.cwd(), ProjectName);
  await fs.mkdirSync(ProjectDirectory);
  process.chdir(ProjectDirectory);
};
