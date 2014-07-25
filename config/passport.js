//loads all the things we need

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

//load the user model
var User = require('../models/index').User;

//load the authentication API keys, etc.
var configAuth = require('./auth')

//expose this function to our app using module.exports

module.exports = function(passport){
  /********************************
  *   PASSPORT SESSION SETUP
  *********************************/

  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /******************************
  *   LOCAL SIGNUP
  *******************************/
  // we are using name strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {
    console.log('foooo')
    process.nextTick(function() {
      // we are checking to see if the user trying to login already exists
      console.log(email,password,'auth section')
      User.findOne({'local.email': email}, function(err, user){
        // return the error if there are errors
        console.log('user',user)
        if(err)
          return done(err);
        if(user){
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        else {
          // if there is no user with that email, create the user
          var newUser = new User();
          //set user's local credentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          // save the user
          newUser.save(function(err){
            console.log('saving new user');
            if(err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  /********************************
  *   LOCAL LOGIN
  *********************************/
  // we are using named strategies since we have one for login and one for signup
  // by default, it would be just called 'local' if there was no name

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // this will allow us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email & password from our form. This is an anonymous function.
    console.log('in local-login passport function now');
    console.log(email,password)
    // find user whose email is same as forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({'local.email': email}, function(err, user) {
      // if errors, return error before anything else
      console.log('user',user);
      console.log('has succefully found previous user db');
      if (err)
        return done(err);
      // if user not found, return message
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash sets flashdata using connect-flash
      if (!user.validPassword(password)) {
        console.log('password is invalid!!')
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));  //create loginMessage and save it so session as flashdata
      }
      return done(null, user);
    });
  }));
};//closes module.exports