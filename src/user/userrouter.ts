/// <reference path="../../typings/tsd.d.ts" />

import express = require("express");
import * as usercontroller from "./usercontroller";
let api =  express.Router();


api.post("/signup"    , usercontroller.userSignup);
api.post("/signin"    , usercontroller.userSignin);
api.post("/addcompany", usercontroller.addCompany);
api.post("/addSalesman", usercontroller.addSalesman);

export = api
