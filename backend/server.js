const express = require("express");
const { readdirSync } = require("fs");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const authUser = require("./middlwares/auth");
const jwt = require("jsonwebtoken");

let allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  "some other domain links",
];
function options(req, res) {
  let temp;
  let origin = req.headers("origin");
  if (allowedOrigins.indexOf(origin) > -1) {
    temp = { origin: true };
    optionSuccessStatus = 200;
  } else {
    temp = { origin: false };
  }
  res.json(temp);
}

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

//batabase
mongoose
  .connect(process.env.DATABASE_URL + "/facebook-clone", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("databse connected successfully");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.get("/", authUser, (req, res) => {
  res.send("Hello FaceBook Clone!");
});
app.post("/", (req, res) => {
  try {
    let tmp = req.header("Authorization");
    const token = tmp ? tmp.slice(7, tmp.length) : "";
    if (!token) {
      return res
        .status(400)
        .json({ val: "no", message: "Invalid Authentification" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ val: "no", message: err.message });
      }
      res.json({ val: "yes", user: user });
    });
  } catch (error) {
    return res.status(500).json({ val: "no", message: error.message });
  }
});

app.listen(process.env.SERVER_PORT || 8000, () =>
  console.log("Server running... on port " + (process.env.SERVER_PORT || 8000))
);
