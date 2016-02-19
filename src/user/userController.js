var usermodel_1 = require("./usermodel");
var Firebase = require("firebase");
var bcrypt = require("bcrypt-nodejs");
function userSignin(req, res) {
    usermodel_1.AdminModel.findOne({ email: req.body.username }, function (err, success) {
        if (success) {
            bcrypt.compare(req.body.password, success.password, function (err, isMatch) {
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
exports.userSignin = userSignin;
function userSignup(req, res) {
    var ref = new Firebase("https://salesmanhybirdapp.firebaseio.com/user");
    ref.createUser({
        email: req.body.email,
        password: req.body.password
    }, function (err, userData) {
        if (err) {
            res.send("Error to save user: " + err);
        }
        else {
            req.body.firebaseToken = userData.uid;
            var user = new usermodel_1.AdminModel(req.body);
            user.save(function (err, success) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ message: "Inserted Successfully", token: req.body.firebaseToken });
                }
            });
        }
    });
}
exports.userSignup = userSignup;
function addCompany(req, res) {
    var company = new usermodel_1.companyModel(req.body);
    company.adminId = req.query.token;
    company.save(function (err, success) {
        if (err) {
            res.send({ message: false, Error: "Error to create company" });
            return;
        }
        ;
        usermodel_1.AdminModel.update({ firebaseToken: req.query.token }, { $set: { companyId: req.query.token } }, function (error, data) {
            if (err) {
                res.send({ message: false, Error: "Error to create company" });
            }
            else {
                res.send({ message: true, data: "Company created Successfully" });
            }
        });
    });
}
exports.addCompany = addCompany;
function addSalesman(req, res) {
    var ref = new Firebase("https://salesmanhybirdapp.firebaseio.com/user");
    //User create on firebase
    ref.createUser({
        email: req.body.email,
        password: req.body.password
    }, function (err, userData) {
        if (err) {
            //Error if donot save
            res.send("Error to save user: " + err);
        }
        else {
            //user save
            req.body.firebaseToken = userData.uid;
            req.body.companyId = req.query.token;
            var user = new usermodel_1.AdminModel(req.body);
            user.companyName = req.body.companyName;
            user.save(function (err, success) {
                if (err) {
                    res.send(err);
                    return;
                }
                else {
                    //Update admin data
                    usermodel_1.AdminModel.update({ firebaseToken: req.query.token }, { $push: { usersIds: userData.uid } }, function (error, data) {
                        if (err) {
                            res.send({ message: false, Error: "Error to add saleman" });
                            return;
                        }
                        else {
                            usermodel_1.companyModel.update({ adminId: req.query.token }, { $push: { usersIds: userData.uid } }, function (error, data) {
                                if (err) {
                                    res.send({ message: false, Error: "Error to create company" });
                                }
                                else {
                                    res.send({ message: true, data: "Saleman add Successfully" });
                                }
                            });
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
        */ });
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
    */ }
exports.addSalesman = addSalesman;
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
