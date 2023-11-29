const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/decisionBotController");

router.post("/calculateScore", controller.calculateScore);

module.exports = router;
