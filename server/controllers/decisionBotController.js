const Profile = require("../modules/profileModule");
const User = require("../modules/userModule");
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

  const isAuthenticated = req.oidc.isAuthenticated();
  if (!isAuthenticated) {
    res
      .status(401)
      .send(new utils.Response(false, "user is not authenticated"));
  }

  const auth0User = req.oidc.user;

  /* TODO
   1. if !isAuthenticated then throw error 401
   2. find user: User.findOne({ email: req.oidc.email })
   3. if no profile is found, create profile or redirect to profile creation
   */
  try {
    const findProfile = await Profile.findOne({ user_id: userId });

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
