const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
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
      message: "Invalid email address",
    });
  }

  const check = await User.findOne({ email });
  if (check) {
    return res.status(400).json({
      message:
        "This email address already exists, try with a different emial address",
    });
  }

  if (!validateLength(first_name, 3, 30)) {
    return res.status(400).json({
      message: "firstname must between 3 and 30 characters.",
    });
  }
  if (!validateLength(last_name, 3, 30)) {
    return res.status(400).json({
      message: "lastname must between 3 and 30 characters.",
    });
  }
  if (!validateLength(password, 6, 30)) {
    return res.status(400).json({
      message: "firstname must between 6 and 30 characters.",
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
  res.json(user);
};
