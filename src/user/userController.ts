/// <reference path="../../typings/tsd.d.ts" />

import express = require("express");
import {saleman2Model}  from "./usermodel";
var Firebase = require("firebase");
import bcrypt = require("bcrypt-nodejs");
export function userSignin(req, res) {
    //  console.log(req.body)
    saleman2Model.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] }, function(err, success) {
        if (success) {
            console.log(success);
            bcrypt.compare(req.body.password, success.password, function(err, isMatch) {
                done(err, isMatch);
            });
            function done(err2, isMatch) {
                isMatch ? res.send(success) : res.send(err);
            }
        }
        else {
            res.send(success)
        }
    });
    //         if (err) {
    //             res.send(err);
    //         }
    //         else if (user != null) {
    //             console.log(user)
    //             bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
    //                 done(err, isMatch);
    //                 // console.log(user)
    //             });
    //             function done(err2, isMatch) {
    //                 isMatch ? res.send(user) : res.send(err);
    //             }
    //         }
    //         else {
    //             console.log("alkjakla")
    //             res.send("User does not exist")
    //         }

    //     });
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
            req.body.firebaseToken = userData.uid;
            let user = new saleman2Model(req.body);
            user.save(function(err, success) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: "Inserted Successfully", token: req.body.firebaseToken });
                }

            })
        }
    })


}
