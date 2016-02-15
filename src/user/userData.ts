/// <reference path="../../typings/tsd.d.ts" />

import express = require("express");
import {AdminModel, companyModel, productModel, OrderModel}  from "./usermodel";
let router =  express.Router();

//Get comapny Detail
router.get("/getcompany", function(req,res){
    console.log(req.query.token)
     companyModel.find({$or:[{ adminId: req.query.token }, {usersIds : req.query.token}]},function(err ,data){
        if(err){
            res.send("Error to load Company")
        } else if(!data){ 
            res.send("Company not found")
        }else{
            res.send(data);
        }
    })
})

//Add product
router.post("/addproduct",function(req, res) {
     console.log(req.query.token);
    console.log(req.body)
    let product = new productModel(req.body);
   // product.adminId = req.query.token;
    product.save(function(err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to add product" });
            return;
        };
        console.log(success,"kjhskhjkljs");
        companyModel.update({ adminId: req.query.token }, { $push: { productId: req.query.token} }, function(error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to update company" });
            } else {
                res.send({ message: true, data: "product add Successfully" });
            }
        });
    });
});

//Add product
router.post("/takeorder",function(req, res) {
     console.log(req.query.token);
     console.log(req.body)
    let order = new OrderModel(req.body);
   // req.body.saleman = req.query.token;
    order.save(function(err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to add order" });
            return;
        };
        companyModel.update({ adminId: req.query.token }, { $push: { orders: req.query.token }}, function(error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to update company" });
            } else {
                res.send({ message: true, data: "product add Successfully" });
            }
        });
    });
})
//Get Order detail
router.get("/getorder", function(req,res){
     OrderModel.find({ companyId: req.query.token} ,function(err ,data){
        if(err){
            res.send("Error to load Company")
        } else if(!data){ 
            res.send("Order not found")
        }else{
            res.send(data);
        }
    })
})
//Get Saleman detail
router.get("/getsaleman", function(req,res){
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
//Get product
router.get("/getproduct", function(req,res){
     productModel.find({ adminId: req.query.token} ,function(err ,data){
        if(err){
            res.send("Error to load Company")
        } else if(!data){ 
            res.send("product not found")
        }else{
            res.send(data);
        }
    })
})
//Get Admin
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