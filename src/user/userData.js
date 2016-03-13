"use strict";
var express = require("express");
var usermodel_1 = require("./usermodel");
var router = express.Router();
router.get("/getcompany", function (req, res) {
    console.log(req.query.token);
    usermodel_1.companyModel.find({ $or: [{ adminId: req.query.token }, { usersIds: req.query.token }] }, function (err, data) {
        if (err) {
            res.send("Error to load Company");
        }
        else if (!data) {
            res.send("Company not found");
        }
        else {
            res.send(data);
        }
    });
});
router.post("/addproduct", function (req, res) {
    console.log(req.body);
    var product = new usermodel_1.productModel(req.body);
    product.save(function (err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to add product" });
            return;
        }
        ;
        usermodel_1.companyModel.update({ adminId: req.body.adminId }, { $push: { productId: req.body.companyId } }, function (error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to update company" });
            }
            else {
                res.send({ message: true, data: "product add Successfully" });
            }
        });
    });
});
router.post("/takeorder", function (req, res) {
    var order = new usermodel_1.OrderModel(req.body);
    console.log(req.body);
    order.save(function (err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to add order" });
            return;
        }
        ;
        usermodel_1.companyModel.update({ adminId: req.body.companyId }, { $push: { orders: req.query.token } }, function (error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to update company" });
            }
            else {
                res.send({ message: true, data: "product add Successfully" });
            }
        });
    });
});
router.get("/getorder", function (req, res) {
    usermodel_1.OrderModel.find({ companyId: req.query.token }, function (err, data) {
        if (err) {
            res.send("Error to load Company");
        }
        else if (!data) {
            res.send("Order not found");
        }
        else {
            res.send(data);
        }
    });
});
router.get("/getsaleman", function (req, res) {
    usermodel_1.AdminModel.find({ companyId: req.query.token, role_admin: false }, function (err, data) {
        if (err) {
            res.send("Error to load Company");
        }
        else if (!data) {
            res.send("saleman not found");
        }
        else {
            res.send(data);
        }
    });
});
router.get("/getOnesaleman/:firebaseToken", function (req, res) {
    console.log(req.params.firebaseToken);
    usermodel_1.AdminModel.findOne({ firebaseToken: req.params.firebaseToken, role_admin: false }, function (err, data) {
        if (err) {
            res.send("Error to load Company");
        }
        else {
            res.send(data);
        }
    });
});
router.get("/getproduct", function (req, res) {
    usermodel_1.productModel.find({ adminId: req.query.token }, function (err, data) {
        if (err) {
            res.send("Error to load Company");
        }
        else if (!data) {
            res.send("product not found");
        }
        else {
            res.send(data);
        }
    });
});
router.get("/token", function (req, res) {
    usermodel_1.AdminModel.find({ firebaseToken: req.query.token }, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.send({ message: false, Error: err });
            return;
        }
        res.send({ message: true, data: data });
    });
});
router.post("/deliveryOrder", function (req, res) {
    console.log(req.body);
    var delivery = new usermodel_1.DeliveryModel(req.body);
    delivery.save(function (err, success) {
        if (err) {
            res.send({ message: false, Error: err });
        }
        else {
            usermodel_1.OrderModel.findOneAndRemove({ companyId: req.body.companyId, productId: req.body.productId }, function (err, data) {
                if (err) {
                    res.send({ message: false, Error: err });
                }
                else {
                    usermodel_1.OrderModel.findOneAndRemove({ companyId: req.body.companyId, productId: req.body.productId });
                    res.send({ message: true, success: "order delivered" });
                }
            });
        }
    });
});
router.get("/deliveryOrder/:companyId", function (req, res) {
    usermodel_1.DeliveryModel.find({ companyId: req.params.companyId }, function (err, data) {
        if (err) {
            res.send({ message: false, Error: err });
        }
        else {
            if (!data) {
                res.send({ message: false, data: "Data nod found" });
            }
            else {
                console.log(data);
                res.send({ message: true, success: data });
            }
        }
    });
});
module.exports = router;
