/// <reference path="../../typings/tsd.d.ts" />

import express = require("express");
import {AdminModel, companyModel, productModel, OrderModel, DeliveryModel}  from "./usermodel";
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

// Add product
router.post("/addproduct", function(req, res) {
     console.log(req.body)
    let product = new productModel(req.body);
   // product.adminId = req.query.token;
    product.save(function(err, success) {
        if (err) {

            res.send({ message: false, Error: "Error to add product" });
            return;
        };
        companyModel.update({ adminId: req.body.adminId }, { $push: { productId: req.body.companyId } }, function(error, data) {

            if (err) {
                res.send({ message: false, Error: "Error to update company" });
            } else {
                res.send({ message: true, data: "product add Successfully" });
            }
        });
    });
});

//Take Order
router.post("/takeorder",function(req, res) {
    let order = new OrderModel(req.body);
    console.log(req.body);
    order.save(function(err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to add order" });
            return;
        };
        companyModel.update({ adminId: req.body.companyId }, { $push: { orders: req.query.token }}, function(error, data) {
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

//Get only One Saleman detail
router.get("/getOnesaleman/:firebaseToken", function(req,res){
    console.log(req.params.firebaseToken)
     AdminModel.findOne({ firebaseToken: req.params.firebaseToken, role_admin : false } ,function(err ,data){
        if(err){
            res.send("Error to load Company")
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

//deleveryOrder request

router.post("/deliveryOrder",function(req, res) {
    console.log(req.body);
    let delivery = new DeliveryModel(req.body);
    delivery.save(function(err , success){
        if(err) {
            res.send({message : false,  Error :err });
        }else {
            OrderModel.findOneAndRemove({companyId : req.body.companyId , productId :req.body.productId}, function(err,data){
                if(err) {
                    res.send({message : false,  Error :err });
                }else{
                  OrderModel.findOneAndRemove({companyId : req.body.companyId ,productId :req.body.productId});
                  res.send({message: true , success: "order delivered"})
                }
            })
        }
    })
})
//Get deleveryOrder request

router.get("/deliveryOrder/:companyId",function(req, res) {
    DeliveryModel.find({companyId: req.params.companyId},function(err , data){
        if(err) {
            res.send({message : false,  Error :err });
        }else {
               if(!data) {
                    res.send({message : false,  data : "Data nod found"});
                } else{
                    console.log(data);
                  res.send({message: true , success: data })
                }
        }
    })
})
export = router;
