/// <reference path="../../typings/tsd.d.ts" />
import bcrypt = require("bcrypt-nodejs");
import mongoose = require("mongoose");
 
 let SALT_FACTOR = 10;
  
let saleman2Schema = new mongoose.Schema({
    username      : {type : String , required : true , unique : true},
    firstname     : {type : String , required : true},
    lastname      : {type : String , required : true},
    email         : {type : String , required : true, unique : true},
    password      : {type : String , required : true},
    firebaseToken : String,
    company_id    : String,
    admin_id      : String,
    role_admin    : {type : Boolean , default : true}
});

var noop = function(){};
 saleman2Schema.pre("save",function(done){
     var user = this;
     if(!user.isModified("password")){
         return done();
     }
     bcrypt.genSalt(SALT_FACTOR,function(err , salt){ 
         if(err) { return done(err);}
         bcrypt.hash(user.password ,salt , noop ,function(err , hashedPassword){
           if(err) {return done(err);}
           user.password = hashedPassword;
           done();  
         });
     });
 });



 
  
let saleman2Model = mongoose.model("saleman2" ,saleman2Schema);
export {saleman2Model}