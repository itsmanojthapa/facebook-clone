const express = require("express");
const { createPost, getAllpost, comment } = require("../controllers/post");
const authUser = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllpost", authUser, getAllpost);
router.put("/comment", authUser, comment);

module.exports = router;
