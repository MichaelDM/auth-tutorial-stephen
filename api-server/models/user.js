const mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true }, //makes sure email is a string and it is unique (needed for unique ID). However, MongoDB checks for case in strings. so Mike@bu different from mike@bu. so that's why convert it to lowercase
  password: String
});

//on Save Hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err ) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
}

//Create the model class
const User = mongoose.model('User', userSchema);

//Export the model
module.exports = User;
