const passport = require('passport'),  // helps us authenticate a user when reaches a certain route (in a way similar to HOC with additional helpers of course)
      User = require('../models/user'),
      config = require('../config'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), //tells where the JWT is on the request, cause it could be in header, in body, or in URL...
  secretOrKey: config.secret, //this tells how to decode the token!
};

//Create Passport strategies
//login with JWT
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) { //payload is the decoded JWT token; done is a callback function
  //See if user ID and payload exists in our database
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }
    //If it does, call 'done' with that user
    if (user) {
      done(null, user);
    } else {
      //Otherwise, call done without a user object
      done(null, false);
    }
  });
});
//login with email and password (local strategy)
const localOptions = { usernameField: 'email' }; // localStrategy looks for a 'password' and 'username' keys automatically. Since I'm using 'email' here, need to specify that
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user){
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    //compare passwords - is 'password' equal to hashed password (user.password)?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user); // passport automatically assigns done (see line 31 to req.user, and that is our user object)
    });
  });
});


//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
