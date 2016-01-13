/// <reference path="../../typings/tsd.d.ts" />

import express = require("express");
import * as usercontroller from "./usercontroller";
let api =  express.Router();


api.post("/signup" ,usercontroller.userSignup);
api.post("/signin" ,usercontroller.userSignin);

export = api