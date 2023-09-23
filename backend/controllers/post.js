const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllpost = async (req, res) => {
  try {
    const allpost = await Post.find()
      .populate("user", "first_name last_name picture username gender")
      .populate({
        path: "comments.commentBy",
        select: "picture first_name last_name username",
      })
      .sort({ createdAt: -1 })
      .exec();

    res.json(allpost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.comment = async (req, res) => {
  try {
    const { comment, image, postId } = req.body;
    console.log("yoo");
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            image: image,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    ).populate("comments.commentBy", "picture first_name last_name username");
    let comBy = await User.find(newComments.comments.commentBy);
    console.log("yo");
    console.log(newComments);
    res.json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
