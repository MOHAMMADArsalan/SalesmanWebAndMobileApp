/// <reference path="../../typings/tsd.d.ts" />
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;
//Admin Schema
var AdminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firebaseToken: String,
    usersIds: { type: [] },
    companyId: String,
    adminId: String,
    role_admin: { type: Boolean, default: true },
    createdOn: { type: Date, default: Date.now() },
    companyName: String
});
//Company Schema
var companySchema = new mongoose.Schema({
    companyName: { type: String, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    usersIds: { type: [] },
    adminId: String,
    createdOn: { type: Date, default: Date.now() },
    productId: { type: [] },
    orders: { type: [] }
});
//Product Schema
var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    adminId: { type: String, required: true },
    companyId: { type: String, required: true },
    price: { type: Number, required: true },
    type: String,
    createdOn: { type: Date, default: Date.now() }
});
var orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalprice: { type: Number, required: true },
    salemanId: { type: String, required: true },
    companyId: { type: String, required: true }
});
//Bcrypt password 
var noop = function () { };
AdminSchema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});
var AdminModel = mongoose.model("saleman2", AdminSchema);
exports.AdminModel = AdminModel;
var companyModel = mongoose.model("companyData", companySchema);
exports.companyModel = companyModel;
var productModel = mongoose.model("productData", productSchema);
exports.productModel = productModel;
var OrderModel = mongoose.model("orderData", orderSchema);
exports.OrderModel = OrderModel;
