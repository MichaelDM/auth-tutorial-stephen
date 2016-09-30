const jwt = require('jwt-simple'),
      config = require('../config'),
      User = require('../models/user');

// function for creating a JWT
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({  sub: user.id, iat: timestamp }, config.secret); //jwt is a convention. they have a sub property (subject) meaning who this token belongs to. We set it to this user. iat is another convention meaning issued at time
}

//SIGNUP
exports.signup = function(req, res, next) {
  //See if a user with the given email exists
  const email = req.body.email,
        password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  User.findOne({ email: email }, function(err, existingUser){
    if (err) {
      return next(err);
    }
    //If user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({error: 'Email is in use yep' }); //.status sets the HTTP code on our response
    } else {
      //if a user with email does not exist, create and save user record

      const newUser = new User ({
        email: email,
        password: password
      });
      newUser.save(function(err) {
        if (err) { return next(err); }
        else {
          //respond to request indicating the user was created
          res.json({ token: tokenForUser(newUser) });
        }
      });
    }
  });
}

//SIGNIN
exports.signin = function(req, res, next) {
   //User has already had their email and password auth'd, we just need to give them a token
   res.send({ token: tokenForUser(req.user)});
}
