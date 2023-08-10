const express = require("express");
const { readdirSync } = require("fs");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
require("dotenv").config();

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

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
// app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.SERVER_PORT || 8000, () =>
  console.log("Server running... on port " + (process.env.SERVER_PORT || 8000))
);
