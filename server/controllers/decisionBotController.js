const Profile = require("../modules/profileModule");

const utils = require("../utils/helperMethods");
const { requiresAuth } = require("express-openid-connect");

function calculateForOption(optionData, ProfileData) {
  let result = 0;
  for (property in optionData) {
    result += Math.abs(Number(optionData[property]) - ProfileData[property]);
  }
  return result;
}

const calculateScore = async (req, res) => {
  const { optionOne, optionTwo } = req.body;
  debugger;
  const isAuthenticated = req.oidc.isAuthenticated();
  if (!isAuthenticated) {
    res
      .status(401)
      .send(new utils.Response(false, "user is not authenticated"));
  }

  const id = req.oidc.user.sub;

  try {
    const findProfile = await Profile.findOne({ user_id: id });

    if (!findProfile) {
      res.send(new utils.Response(false, "user profile doesnt exist"));
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
