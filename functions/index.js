const functions = require("firebase-functions");
const  admin = require("firebase-admin");
const firebaseHelper = require('firebase-functions-helper');
const express = require('express');
const bodyParser = require("body-parser");

const app = express()
app.get("/", (req, res) => {
  res.send("hello world!")
})
exports.app = functions.https.onRequest(app)
