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
    usersIds        : { type  : [] },
    companyId       : String,
    adminId         : String,
    role_admin      : {type : Boolean , default : true},
    createdOn       : { type  : Date, default: Date.now()},
    companyName     :  String 
 });
 
//Company Schema

let companySchema = new mongoose.Schema({
   companyName     :  { type : String , unique : true , required : true },
   address         :  { type : String , unique : true , required : true },
   usersIds        :  { type  : [] },
   adminId         :  String,
   createdOn       :  { type  : Date, default: Date.now()},
   productId       :  { type  : [] },
   orders          :  { type  : [] }
});

//Product Schema

let productSchema = new mongoose.Schema({
    name           :  { type : String ,required : true },
    adminId        :  {type: String, required: true},
    companyId      :  {type: String, required: true},
    price          :  {type: Number, required: true},
    type           :  String,
    createdOn      : {type: Date, default: Date.now()} 
});
//Order Schema

let orderSchema = new mongoose.Schema({
    location       : { lat:  Number , long : Number},
    customerName   : { type: String , required : true },
    product        : { type: String , required : true },
    quantity       : { type: Number , required : true },
    price          : { type: Number , required : true },
    totalprice     : { type: Number , required : true },
    salemanId      : { type: String , required : true },
    companyId      : { type: String , required : true },
    productId      : Number             //Custom product id which is timestamp
});

let DeliverySchema = new mongoose.Schema({
     customerName   : { type: String ,required : true },
     product        : { type: String , required : true },
     totalprice     : { type: Number , required : true },
     deliveryDate   : { type: Date,    default: Date.now()},
     companyId      : { type: String , required : true },
     productId      : Number
})
//Bcrypt password 
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
let productModel  = mongoose.model("productData" , productSchema);
let OrderModel  = mongoose.model("orderData" , orderSchema);
let DeliveryModel  = mongoose.model("deliveryData" , DeliverySchema);
export {AdminModel , companyModel , productModel, OrderModel, DeliveryModel}
