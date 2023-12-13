/*******/
const cors = require("cors");
const express = require("express");
const Profile = require("./modules/profileModule");
const { authenticationMiddleware } = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const decisionBotRoute = require("./routes/decisionBotRoute");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
require("dotenv").config();
const utils = require("./utils/helperMethods");

mongoose.set("debug", true);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = 4050;
app.use(authenticationMiddleware);
app.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const id = req.oidc.user.sub;
    try {
      isProfileExist = await Profile.findOne({ user_id: id });

      if (isProfileExist) {
        res.redirect("http://localhost:3000/decision");
      } else {
        res.redirect("http://localhost:3000/profile");
      }
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send(new utils.Response(false, { message: "error" + error }));
    }
  } else {
    res.redirect("http://localhost:3000/");
  }
});

app.use("/decision", decisionBotRoute);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

async function connecting() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("connected to the db");
  } catch (error) {
    console.log("error in db conection");
  }
}
/*just for testing*/
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

connecting().then(() => {
  app.listen(port, () => {
    console.log(`listen on port ${port}`);
  });
});
