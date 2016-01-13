/// <reference path="../typings/tsd.d.ts" />

import express = require("express");
import morgan = require("morgan");
import path = require("path");
import bodyParser = require("body-parser");
import mongoose = require("mongoose");
var firebase =  require("firebase");
let app = express();
let connect = mongoose.connect("mongodb://localhost/saleman2");
import api = require("./user/userrouter");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use("/api",api);

app.listen(9000);