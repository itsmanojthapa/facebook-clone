// route1.js
const express = require("express");
const router = express.Router();
const { home } = require("../controllers/user");

router.get("/user", home);

module.exports = router;
