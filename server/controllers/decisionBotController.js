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

const profile = async (req, res) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  if (!isAuthenticated) {
    res
      .status(401)
      .send(new utils.Response(false, "user is not authenticated"));
  }
  const id = req.oidc.user.sub;

  const { profile } = req.body;
  if (!profile) {
    res.send(new utils.Response(false, "All fields required"));
  }

  const openness = "openness",
    conscientiousness = "conscientiousness",
    extraversion = "extraversion",
    agreeableness = "agreeableness",
    neuroticism = "neuroticism";
  try {
    await Profile.create({
      [openness]: profile[openness],
      [conscientiousness]: profile[conscientiousness],
      [extraversion]: profile[extraversion],
      [agreeableness]: profile[agreeableness],
      [neuroticism]: profile[neuroticism],

      user_id: id,
    });
    res.send(new utils.Response(true, { message: "profile created!" }));
  } catch (error) {
    console.log(error);
    res.send(new utils.Response(false, { message: "error" + error }));
  }
};

module.exports = { calculateScore, profile };
