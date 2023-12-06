const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/decisionBotController");
const { requiresAuth } = require("express-openid-connect");

router.post("/calculateScore", requiresAuth(), controller.calculateScore);

module.exports = router;
