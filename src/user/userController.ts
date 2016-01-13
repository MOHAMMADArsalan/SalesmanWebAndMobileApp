/// <reference path="../../typings/tsd.d.ts" />

import express = require("express");
import {saleman2Model}  from "./usermodel";
var Firebase = require("firebase");
export function userSignin(req, res) {

    saleman2Model.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            res.send(err);
        }
        else if (user != null) {
            if (req.body.password === user.password) {
                console.log(user)
                res.send("User Signin Successfully")
            } else {
                res.send("No User Found!");
            }
        }
        else {
            res.send("User does not exist")
        }

    });
}
export function userSignup(req, res) {
    var ref = new Firebase("https://salesmanhybirdapp.firebaseio.com/user")
    ref.createUser({
        email: req.body.email,
        password: req.body.password
    }, function(err, userData) {
        if (err) {
            res.send("Error to save user: " + err)
        } else {
            let user = new saleman2Model(req.body);
                user.firebaseToken = userData.uid;
            
            user.save(function(err, success) {
            
                if (err) {
                     res.send(err);
                } else {
                    
                    res.send({ message: "Inserted Successfully", data: success });
                }

            })
        }
    })
   

}
