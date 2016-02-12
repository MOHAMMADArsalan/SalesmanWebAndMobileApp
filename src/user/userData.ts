/// <reference path="../../typings/tsd.d.ts" />

import express = require("express");
import {AdminModel, companyModel}  from "./usermodel";
let router =  express.Router();


router.get("/getcompany", function(req,res){
    console.log(req.query.token)
     companyModel.find({ adminId: req.query.token } ,function(err ,data){
        if(err){
            res.send("Error to load Company")
        } else if(!data){ 
            res.send("Company not found")
        }else{
            res.send(data);
        }
    })
})


router.get("/getsaleman", function(req,res){
    console.log(req.query.token)
     AdminModel.find({ companyId: req.query.token , role_admin : false} ,function(err ,data){
        if(err){
            res.send("Error to load Company")
        } else if(!data){ 
            res.send("saleman not found")
        }else{
            res.send(data);
        }
    })
})
router.get("/token", function(req,res){
      AdminModel.find({ firebaseToken: req.query.token }, function(err, data) {
        if (err) {
            console.log("Error", err);
            res.send({ message: false, Error: err });
            return;
        }
        res.send({ message: true, data: data });
    });
})

export = router;
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
// export function getCompany(req, res) {
//    companyModel.find({ firebaseToken: req.query.token } ,function(err ,data){
//         if(err){
//             res.send("Error to load Company")
//         } else if(!data){ 
//             res.send("Company not found")
//         }else{
//             res.send(data);
//         }
//     })
// }