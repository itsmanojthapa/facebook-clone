const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllpost = async (req, res) => {
  try {
    const allpost = await Post.find()
      .populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 });

    res.json(allpost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
