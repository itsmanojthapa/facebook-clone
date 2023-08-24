const express = require("express");
const { readdirSync } = require("fs");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
  res.send("Hello FaceBook Clone!");
});

app.listen(process.env.SERVER_PORT || 8000, () =>
  console.log("Server running... on port " + (process.env.SERVER_PORT || 8000))
);
