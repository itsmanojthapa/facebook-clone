const { sendVerificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/token");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address.",
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists, try with a different emial address.",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "Firstname must between 3 and 30 characters.",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Lastname must between 3 and 30 characters.",
      });
    }
    if (!validateLength(password, 6, 30)) {
      return res.status(400).json({
        message: "Password must between 6 and 30 characters.",
      });
    }
    const cryptPassword = await bcrypt.hash(password, 12);

    let newUsername = await validateUsername(first_name + last_name);
    const user = new User({
      first_name,
      last_name,
      email,
      password: cryptPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    });
    user.save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    // console.log("emailToken : " + emailVerificationToken);
    const encodedemailVerificationToken = Buffer.from(
      emailVerificationToken
    ).toString("base64");
    // console.log("Encoded : " + encodedemailVerificationToken);
    const url = `${process.env.BASE_URL}/activate/${encodedemailVerificationToken}`;
    sendVerificationEmail(email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.json({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your emial",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const decodedtoken = Buffer.from(token, "base64").toString();
    console.log("Deoc : " + decodedtoken);
    const user = jwt.verify(decodedtoken, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (validUser !== user.id) {
      return res
        .status(400)
        .json({
          message:
            "You dont have the authorization to complete this operation.",
        });
    }
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This email is already activated." });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: "Account has been activated." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "The email address you entered is not connected to an account.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: "Invalid creadentials. Please try again." });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.json({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.auth = (req, res) => {
  return res.status(200).json("welcom form auth");
};
