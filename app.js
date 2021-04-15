var express = require("express");
var app = express();
var path = require("path");
require("dotenv").config();
// const accountSid = process.env.twilio_SID;
// const authToken = process.env.twilio_AUTH;
// const client = require("twilio")(accountSid, authToken);
// viewed at http://localhost:8080
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.post("/submit", function (req, res) {});

// for parsing multipart/form-data
app.use(express.static("public"));

console.log("listening on port 3000...");
app.listen(3000);
