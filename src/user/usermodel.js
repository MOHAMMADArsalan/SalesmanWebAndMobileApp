var mongoose = require("mongoose");
var SALT_FACTOR = 10;
var saleman2Schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firebaseToken: String
});
// var noop = function(){};
//  saleman2Schema.pre("save",function(done){
//      var user = this;
//      if(!user.isModified("password")){
//          return done();
//      }
//      bcrypt.genSalt(SALT_FACTOR,function(err , salt){ 
//          if(err) { return done(err);}
//          bcrypt.hash(user.password ,salt , noop ,function(err , hashedPassword){
//            if(err) {return done(err);}
//            user.password = hashedPassword;
//            done();  
//          });
//      });
//  });
//  saleman2Schema.methods.checkPassword = function(guess, done) {
// bcrypt.compare(guess, this.password, function(err, isMatch) {
// done(err, isMatch);
// });
// };
var saleman2Model = mongoose.model("saleman2", saleman2Schema);
exports.saleman2Model = saleman2Model;
