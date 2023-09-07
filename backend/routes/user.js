// route1.js
const express = require("express");
const router = express.Router();
const {
  register,
  activateAccount,
  login,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
} = require("../controllers/user");
const authUser = require("../middlwares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/activate", authUser, activateAccount);
router.post("/sendVerification", authUser, sendVerification);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.get("/getProfile/:username", authUser, getProfile);

module.exports = router;
