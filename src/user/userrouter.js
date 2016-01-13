/// <reference path="../../typings/tsd.d.ts" />
var express = require("express");
var usercontroller = require("./usercontroller");
var api = express.Router();
api.post("/signup", usercontroller.userSignup);
api.post("/signin", usercontroller.userSignin);
module.exports = api;
