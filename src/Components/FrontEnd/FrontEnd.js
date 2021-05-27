const path = require("path");
const { Select } = require("enquirer");

const CreateReactApp = require(path.join(
  __dirname,
  "./React/CreateReactApp/CreateReactApp"
));
const Questions = {
  FrameWorks: {
    initial: "React",
    message: "Choose your framework",
    choices: ["React"],
  },
};
const FrontEnd = async () => {
  const FrameWork = await new Select(Questions.FrameWorks).run();
  switch (FrameWork) {
    case "React": {
      await CreateReactApp();
      break;
    }
    default: {
      throw Error("You did not specify your FrameWork");
    }
  }
};
module.exports = FrontEnd;
