// route1.js
const express = require("express");
const router = express.Router();
const { register, activateAccount, login } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.post("/activate", activateAccount);

module.exports = router;
