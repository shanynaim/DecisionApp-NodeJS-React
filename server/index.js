/*******/
const cors = require("cors");
const express = require("express");
const Profile = require("./modules/profileModule");

const mongoose = require("mongoose");
const decisionBotRoute = require("./routes/decisionBotRoute");
const profileRoute = require("./routes/usersRoute");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

mongoose.set("debug", true);

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: "http://localhost:4050/",
  // redirectUri: "http://localhost:4050/callback",
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: "https://dev-lyojpo6vu545blai.us.auth0.com",
};

// if (
//   !authConfig.baseURL &&
//   !process.env.BASE_URL &&
//   process.env.PORT &&
//   process.env.NODE_ENV !== "production"
// ) {
//   authConfig.baseURL = `http://localhost:${port}`;
// } /*understand where it took it from*/
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
app.use(auth(authConfig));
app.get("/", async (req, res) => {
  debugger;
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
      res.send(new utils.Response(false, { message: "error" + error }));
    }
  }
});
// app.get('/logout', requiresAuth(), (req, res) => {
//   // The `id_token` and `access_token` are automatically cleared by `express-openid-connect`
//   // when the user is logged out.
//   res.redirect('/');
// });
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use("/decision", decisionBotRoute);
app.use("/users", profileRoute);

async function connecting() {
  try {
    await mongoose.connect(
      "mongodb+srv://shany215sn:9i6dpOi2qYODeMxp@cluster0.fk1u4fq.mongodb.net/decisionApp?retryWrites=true&w=majority"
    );
    console.log("connected to the db");
  } catch (error) {
    console.log("error in db conection");
  }
}

connecting().then(() => {
  app.listen(port, () => {
    console.log(`listen on port ${port}`);
  });
});
