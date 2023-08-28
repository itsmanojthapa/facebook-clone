const express = require("express");
const { createPost, getAllpost } = require("../controllers/post");
const authUser = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllpost", authUser, getAllpost);

module.exports = router;
