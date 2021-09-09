#!/usr/bin/env node

require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const cron = require('node-cron');

var multipart = require('connect-multiparty');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const { MongoManager } = require("./db");

const indexRouter = require("./routes/index");



require("./globalFunctions");


const mongoManager = new MongoManager({
  useNewUrlParser: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoManager.connect();




app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multipart());



app.use("/api", indexRouter);
app.use("*", function (req, res) {
  res.json({ success: false, message: "Invalid route!" });
});


module.exports = app;