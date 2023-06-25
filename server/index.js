//  <<--- Validator --->>
const validator = require("validator");

//  <<--- Argon2 --->>
const argon = require("argon2");

//  <<--- DotENV --->>
require("dotenv").config();

//  <<--- Express Server --->>
const express = require("express");
const app = express();
const cors = require("cors");
app.listen(5000);
app.use(cors());
console.log("App started");

//  <<--- Mongo DB --->>
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO;
const accountsSchema = require("./schema");
mongoose.connect(mongoDB, {}).then(() => {
  console.log("Connected to MongoDB");
});

//  <<--- Signup --->>
app.post("/signup", async (req, res) => {
  try {
    const email = req.get("email");
    const username = req.get("username");
    const password = req.get("password");

    if (!email) return res.json({ Error: "No email provided." });
    if (!username) return res.json({ Error: "No username provided." });
    if (!password) return res.json({ Error: "No password provided." });

    const EmailCheck = validator.default.isEmail(email);
    const passCheck = validator.default.isStrongPassword(password);

    if (EmailCheck === false) return res.json({ Error: "Invalid Email." });
    if (!passCheck === false)
      return res.json({ Error: "Weak Password detected." });

    if (username.length > 10) return res.json({ Error: "Username too long." });
    if (password.length <= 7)
      return res.json({ Error: "Password length must be greater then 7." });

    const credentials = {
      accountID: `${Math.floor(Math.random() * 2000)}${Date.now()}${
        username.length
      }`,
      hashedPassword: await argon.hash(password),
    };

    const data = await accountsSchema.findOne({
      User: username,
    });
    if (data) {
      if (data.Username === username)
        return res.json({ Error: "Username already exists." });
      if (data.Email === email)
        return res.json({ Error: "Email is already in use." });
      if (data.UserID === credentials.accountID)
        return res.json({ Error: "ID already exists." });
    }

    await accountsSchema.create({
      Username: username,
      Password: credentials.hashedPassword,
      Email: email,
      UserID: credentials.accountID,
      Websites: ["none"],
      Premium: false,
    });
    return res.json({ Success: credentials.accountID });
  } catch (err) {
    return res.json({ Error: "Error 500 - Unable to process your request!" });
  }
});

//  <<--- Dashboard --->>
app.post("/login", async (req, res) => {
  const email = req.get("email");
  const password = req.get("password");

  if (!email) return res.json({ Error: "No email provided." });
  if (!password) return res.json({ Error: "No password provided." });

  const emailCheck = validator.default.isEmail(email);

  if (emailCheck === false) return res.json({ Error: "Invalid Email Format." });

  const data = await accountsSchema.findOne({
    Email: email,
  });

  if (data) {
    const passCheck = await argon.verify(data.Password, password)
    if(passCheck === false) return res.json({Error: "Invalid Password."})
    else {
      return res.json({Success: data.userID})
    }
  } else return res.json({Error: "Email not found."})
});
