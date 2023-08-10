const express = require("express");
const app = express();
const cors = require("cors");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => console.log("Server running... on port 8000"));
