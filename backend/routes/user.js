// route1.js
const express = require("express");
const router = express.Router();
const {
  register,
  activateAccount,
  login,
  auth,
} = require("../controllers/user");
const authUser = require("../middlwares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/activate", activateAccount);
router.post("/auth", authUser, auth);

module.exports = router;
