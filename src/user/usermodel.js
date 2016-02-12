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
    createdOn: { type: Date, default: Date.now() }
});
var companySchema = new mongoose.Schema({
    companyName: { type: String, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    usersIds: { type: [] },
    adminId: String,
    createdOn: { type: Date, default: Date.now() }
});
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
