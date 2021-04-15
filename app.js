var express = require("express");
var app = express();
var path = require("path");
require("dotenv").config();
var bodyParser = require("body-parser");
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
const a = "ACf6ce916375763b2ff10d7a156c9cb1e0";
const b = "f562529695d007e1fe538a1373ff6560";
const client = require("twilio")(a, b);
// viewed at http://localhost:8080

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.post("/submit", async function (req, res) {
  console.log(req.body);
  var sent;
  await client.messages
    .create({
      body:
        "Name: " +
        req.body.contact.name +
        " Email: " +
        req.body.contact.email +
        " Message: " +
        req.body.contact.message,
      from: "+15045078562",
      to: "+19087983194",
    })
    .then((message) => {
      sent = true;
      console.log(message.sid);
    })
    .catch((e) => {
      sent = false;
      console.log(e);
    });
  if (sent) {
    return res.status(200).send({ success: true });
  } else {
    return res.status(500).send({ success: false });
  }
});

// for parsing multipart/form-data
app.use(express.static("public"));

console.log("listening on port 3000...");
app.listen(3000);
