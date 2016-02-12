/// <reference path="../../typings/tsd.d.ts" />
import bcrypt = require("bcrypt-nodejs");
import mongoose = require("mongoose");
 let SALT_FACTOR = 10;

 //Admin Schema
let AdminSchema = new mongoose.Schema({
    username        : {type : String , required : true},
    firstname       : {type : String , required : true},
    lastname        : {type : String , required : true},
    email           : {type : String , required : true, unique : true},
    password        : {type : String , required : true},
    firebaseToken   : String,
    usersIds        :  { type  : [] },
    companyId       : String,
    adminId         : String,
    role_admin      : {type : Boolean , default : true},
    createdOn       : { type  : Date, default: Date.now()}
 });

let companySchema = new mongoose.Schema({
   companyName     :  { type : String , unique : true , required : true },
   address         :  { type : String , unique : true , required : true },
   usersIds        :  { type  : [] },
   adminId         :  String,
   createdOn       :  { type  : Date, default: Date.now()}
});
let noop = function(){};
 AdminSchema.pre("save", function(done){
     let user = this;
     if (!user.isModified("password")) {
         return done();
     }
     bcrypt.genSalt(SALT_FACTOR, function(err , salt) {
         if (err) { return done(err); }
         bcrypt.hash(user.password , salt , noop , function(err , hashedPassword){
           if (err) {return done(err); }
           user.password = hashedPassword;
           done();
         });
     });
 });




let AdminModel = mongoose.model("saleman2" , AdminSchema);
let companyModel  = mongoose.model("companyData" , companySchema);
export {AdminModel , companyModel}
