/// <reference path="../typings/tsd.d.ts" />
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var firebase = require("firebase");
var app = express();
var connect = mongoose.connect("mongodb://localhost/saleman2");
var api = require("./user/userrouter");
var router = require("./user/userData");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use("/api", api);
app.use("/router", router);
app.listen(9000);
