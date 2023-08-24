const express = require("express");
const { createPost } = require("../controllers/post.js");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);

module.exports = router;
