const express = require("express");
const { reactPost } = require("../controllers/react");
const authUser = require("../middlwares/auth");

const router = express.Router();

router.put("/getReacts", authUser, reactPost);

module.exports = router;
