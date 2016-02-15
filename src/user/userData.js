/// <reference path="../../typings/tsd.d.ts" />
var express = require("express");
var usermodel_1 = require("./usermodel");
var router = express.Router();
//Get comapny Detail
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
//Add product
router.post("/addproduct", function (req, res) {
    console.log(req.query.token);
    console.log(req.body);
    var product = new usermodel_1.productModel(req.body);
    // product.adminId = req.query.token;
    product.save(function (err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to add product" });
            return;
        }
        ;
        console.log(success, "kjhskhjkljs");
        usermodel_1.companyModel.update({ adminId: req.query.token }, { $push: { productId: req.query.token } }, function (error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to update company" });
            }
            else {
                res.send({ message: true, data: "product add Successfully" });
            }
        });
    });
});
//Add product
router.post("/takeorder", function (req, res) {
    console.log(req.query.token);
    console.log(req.body);
    var order = new usermodel_1.OrderModel(req.body);
    // req.body.saleman = req.query.token;
    order.save(function (err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to add order" });
            return;
        }
        ;
        usermodel_1.companyModel.update({ adminId: req.query.token }, { $push: { orders: req.query.token } }, function (error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to update company" });
            }
            else {
                res.send({ message: true, data: "product add Successfully" });
            }
        });
    });
});
//Get Order detail
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
//Get Saleman detail
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
//Get product
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
//Get Admin
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
module.exports = router;
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
