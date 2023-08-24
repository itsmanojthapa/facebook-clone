const fs = require("fs");

exports.uploadImages = async (req, res) => {
  try {
    res.json({ message: "Hello Image" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
