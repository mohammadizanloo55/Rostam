const path = require("path");
const { Select } = require("enquirer");

const CreateReactApp = require(path.join(
  __dirname,
  "./React/CreateReactApp/CreateReactApp"
));
const None = require(path.join(__dirname, "./None/None"));
const Questions = {
  FrameWorks: {
    initial: "React",
    message: "Choose your framework",
    choices: ["React", "none"],
  },
};
const FrontEnd = async () => {
  const FrameWork = await new Select(Questions.FrameWorks).run();
  switch (FrameWork) {
    case "React": {
      await CreateReactApp();
      break;
    }
    case "None": {
      await None();
      break;
    }
    default: {
      throw Error("You did not specify your FrameWork");
    }
  }
};
module.exports = FrontEnd;
