const express = require("express");
const authUser = require("../middlwares/auth");
const { uploadImages, listImages } = require("../controllers/upload");
const imageUpload = require("../middlwares/imageUpload");

const router = express.Router();

router.post("/uploadImages", authUser, imageUpload, uploadImages);
router.post("/listImages", authUser, listImages);

module.exports = router;
