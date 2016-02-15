
import express = require("express");
import {AdminModel, companyModel ,productModel}  from "./usermodel";
let Firebase = require("firebase");
import bcrypt = require("bcrypt-nodejs");

export function userSignin(req, res) {
    //  console.log(req.body)
    AdminModel.findOne({ email: req.body.username }, function(err, success) {
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
            res.send(success);
        }
    });
}
export function userSignup(req, res) {
    let ref = new Firebase("https://salesmanhybirdapp.firebaseio.com/user");
    ref.createUser({
        email: req.body.email,
        password: req.body.password
    }, function(err, userData) {
        if (err) {
            res.send("Error to save user: " + err);
        } else {
            req.body.firebaseToken = userData.uid;
            let user = new AdminModel(req.body);
            user.save(function(err, success) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: "Inserted Successfully", token: req.body.firebaseToken });
                }

            });
        }
    });
}

// export function addCompany(req,res) {
//     let company = new companyModel(req.body);
//     company.save(function(err ,success){
//         if(err){
//             res.send({message : false , Error : err});
//         }else{
//             res.send({message : true , data : success});
//         }
//     })
// }

export function addCompany(req, res) {
    console.log(req.query.token);
    console.log(req.body)
    let company = new companyModel(req.body);
    company.adminId = req.query.token;
    company.save(function(err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to create company" });
            return;
        };
        AdminModel.update({ firebaseToken: req.query.token }, { $set: { companyId: req.query.token } }, function(error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to create company" });
            } else {
                res.send({ message: true, data: "Company created Successfully" });
            }
        });
    });
}

export function addSalesman(req, res) {
    let ref = new Firebase("https://salesmanhybirdapp.firebaseio.com/user");
    //User create on firebase
    ref.createUser({
        email: req.body.email,
        password: req.body.password
        
    }, function(err, userData) {
        if (err) {
            //Error if donot save
            res.send("Error to save user: " + err);
            
        } else {
            //user save
            req.body.firebaseToken = userData.uid;
            req.body.companyId = req.query.token;
          
            let user = new AdminModel(req.body);
            console.log(req.body)
            user.companyName = req.body.companyName;
            user.save(function(err, success) {
                if (err) {
                    res.send(err);
                    return;
                } else {
                    //Update admin data
           AdminModel.update({ firebaseToken: req.query.token }, { $push: { usersIds:  userData.uid } }, function(error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to add saleman" });
                return;
            } else {
                companyModel.update({ adminId: req.query.token } , { $push: { usersIds:  userData.uid }} ,function(error ,data){
                    if (err) {
                        res.send({ message: false, Error: "Error to create company" });
                    } else {
                      res.send({ message: true, data: "Saleman add Successfully" });
            }
                  
                }
              

          }
       });
     }
   });
}



// export function getAdmin(req, res) {
//     AdminModel.find({ firebaseToken: req.query.token }, function(err, data) {
//         if (err) {
//             console.log("Error", err);
//             res.send({ message: false, Error: err });
//             return;
//         }
//         res.send({ message: true, data: data });
//     });
// }

/*
export function getCompany(req,res) {
    companyModel.find({ firebaseToken: req.query.token } ,function(err ,data){
        if(err){
            res.send("Error to load Company")
        } else if(!data){ 
            res.send("Company not found")
        }else{
            res.send(data);
        }
    })
}
*/