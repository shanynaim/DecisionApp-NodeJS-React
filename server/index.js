/*******/
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const decisionBotRoute = require("./routes/decisionBotRoute");
const profileRoute = require("./routes/usersRoute");
mongoose.set("debug", true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../client/build")));
const port = 4050;

app.use("/users", profileRoute);
app.use("/decision", decisionBotRoute);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

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
