// route1.js
const express = require("express");
const router = express.Router();
const {
  register,
  activateAccount,
  login,
  sendVerification,
} = require("../controllers/user");
const authUser = require("../middlwares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/activate", authUser, activateAccount);
router.post("/sendVerification", authUser, sendVerification);

module.exports = router;
