const { google } = require("googleapis");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Replace these values with your actual credentials
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const {
  EMAIL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_PLAYGROUND_REFRESH_TOKEN,
} = process.env;

// Send email using Nodemailer and OAuth2
exports.sendVerificationEmail = async (email, name, url) => {
  try {
    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      REDIRECT_URI
    );

    // Set refresh token
    oauth2Client.setCredentials({
      refresh_token: OAUTH_PLAYGROUND_REFRESH_TOKEN,
    });

    // Get an access token
    const accessToken = await oauth2Client.getAccessToken();

    // Create Nodemailer transporter with OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_PLAYGROUND_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Compose email
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Facebook-Clone email verification",
      html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action requise : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once refistered on facebook,you can share photos,organize events and much more.</span></div></div>`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
