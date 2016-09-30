const passport = require('passport'),
      Authentication = require('./controllers/authentication'),
      passportService = require('./services/passport'); // pulls in passport-jwt, passport-local... which the authenticate methods 'jwt' comes from

const requireAuth = passport.authenticate('jwt', { session: false }); // by default JWT tries to make a cookie-based session
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {
  //GET
  app.get('/', function( req, res, err) {
    res.send('hi mike, this is a test ');
  });
  app.get('/sensitivedata', requireAuth, function( req, res, err) {
    res.send('this is sensitive data: Michael is 007');
  })
  //POST
  app.post('/signin', requireSignIn, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
