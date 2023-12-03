const Profile = require("../modules/profileModule");
const User = require("../modules/userModule");
const utils = require("../utils/helperMethods");
// const e = require("express");

// function Response(status, msg) {
//   this.ok = status;
//   this.data = msg;
// }

function calculateForOption(optionData, ProfileData) {
  let result = 0;
  for (property in optionData) {
    result += Math.abs(Number(optionData[property]) - ProfileData[property]);
  }
  return result;
}

const calculateScore = async (req, res) => {
  const { userId, optionOne, optionTwo } = req.body;

  try {
    // const f = await User.findOne({ email: userId.userId });
    // const findProfile = await Profile.findOne({ user_id: f._doc._id });
    const findProfile = await Profile.findOne({ user_id: userId.userId });

    if (!findProfile) {
      res.send(new utils.Response(false, "user id doesnt exist"));
    } else {
      const optionOneFinal = calculateForOption(
        optionOne.scores,
        findProfile._doc
      );
      const optionTwoFinel = calculateForOption(
        optionTwo.scores,
        findProfile._doc
      );

      let responseObj = {};
      optionOneFinal > optionTwoFinel
        ? (responseObj = new utils.Response(true, optionTwo.name))
        : optionOneFinal < optionTwoFinel
        ? (responseObj = new utils.Response(true, optionOne.name))
        : (responseObj = new utils.Response(true, "equal"));

      res.send(responseObj);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = { calculateScore };
