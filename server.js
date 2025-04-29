// server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

let latestOtp = "";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// OTP receive करने वाला endpoint
app.post("/receive-otp", (req, res) => {
  const otp = req.body.otp;
  console.log("Received OTP:", otp);
  latestOtp = otp;
  fs.writeFileSync("last_otp.txt", otp);
  res.send("OTP received successfully");
});

// ब्राउज़र में latest OTP दिखाने वाला पेज
app.get("/", (req, res) => {
  res.send(`<h2>Latest OTP:</h2><pre>${latestOtp}</pre>`);
});

// Render पर चलाने के लिए पोर्ट सेटअप
const listener = app.listen(process.env.PORT, () => {
  console.log("App is live on port " + listener.address().port);
});
