const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {validateEmail, 
    validLength,
    validateUsername
} = require('../helpers/validation.js');
const {generateToken} = require("../helpers/webtokens.js");
const { sendVerificationEmail } = require("../helpers/mailer");


exports.register = async (req, res) => {
    try{
        const {
            first_name, 
            last_name,
            username, 
            email, 
            password, 
            gender, 
            bYear, 
            bMonth, 
            bDay
        } = req.body;

        if(!validateEmail(email)){
            return res.status(500).json({message:"invalid email"})
        }

        const check = await User.findOne({ email });
            if (check) {
                return res.status(400).json({
                message:"This email address already exists,try with a different email address",}
                );
            }

        if (!validLength(first_name, 3, 30)) {
            return res.status(400).json({
              message: "first name must between 3 and 30 characters.",
            });
        }
        if (!validLength(username, 3, 30)) {
            return res.status(400).json({
              message: "username must between 3 and 30 characters.",
            });
        }
        if (!validLength(last_name, 3, 30)) {
            return res.status(400).json({
              message: "last name must between 3 and 30 characters.",
            });
        }
        if (!validLength(password, 6, 16)) {
            return res.status(400).json({
              message: "password must between 6 and 16 characters.",
            });
        }

        const cryptedPassword = await bcrypt.hash(password, 12);

        // let tempUsername = first_name + last_name;
        // let newUsername = await validateUsername(tempUsername);
        // console.log(newUsername);

        const user = await new User({
            first_name, 
            last_name,
            username, 
            email, 
            password : cryptedPassword, 
            gender, 
            bYear, 
            bMonth, 
            bDay
        }).save();

        const emailVerificationToken = generateToken(
            { id: user._id.toString() },
            "30m"
        );
        // console.log(emailVerificationToken);
        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
        sendVerificationEmail(user.email, user.first_name, url);
        const token = generateToken({ id: user._id.toString() }, "7d");
        res.send({
          id: user._id,
          username: user.username,
          picture: user.picture,
          first_name: user.first_name,
          last_name: user.last_name,
          token: token,
          verified: user.verified,
          message: "Register Success ! please activate your email to start",
        });
    }catch(err){
        res.status(500).json({ message: error.message });
    }
};

exports.activateAccount = async (req, res) => {
    try {
      const { token } = req.body;
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const check = await User.findById(user.id);
      if (check.verified == true) {
        return res
          .status(400)
          .json({ message: "this email is already activated" });
      } else {
        await User.findByIdAndUpdate(user.id, { verified: true });
        return res
  
  
        
          .status(200)
          .json({ message: "Account has beeen activated successfully." });
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
            "the email address you entered is not connected to an account.",
        });
      }
      const check = await bcrypt.compare(password, user.password);
      if (!check) {
        return res.status(400).json({
          message: "Invalid credentials.Please try again.",
        });
      }
      const token = generateToken({ id: user._id.toString() }, "7d");
      res.send({
        id: user._id,
        username: user.username,
        picture: user.picture,
        first_name: user.first_name,
        last_name: user.last_name,
        token: token,
        verified: user.verified,
        message: "Register Success ! please activate your email to start",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  