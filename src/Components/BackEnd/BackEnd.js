const path = require("path");
const { Select } = require("enquirer");

const Custom = require(path.join(__dirname, "./Express/Custom/Custom"));
const Questions = {
  FrameWorks: {
    initial: "Express",
    message: "Choose your framework",
    choices: ["Express"],
  },
};
const BackEnd = async () => {
  const FrameWork = await new Select(Questions.FrameWorks).run();
  switch (FrameWork) {
    case "Express": {
      await Custom();
      break;
    }
    default: {
      throw Error("You did not specify your FrameWork");
    }
  }
};
module.exports = BackEnd;
