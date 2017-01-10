var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport) {
  // Passport session setup
  // ===========================================================================

  // Serialize User
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize User
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });


  var localSettings = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  };


  // Local Signup
  // ===========================================================================

  passport.use('local-signup', new LocalStrategy(localSettings, function(req, email, password, done) {
    // console.log("looking for user...");
    // See if a user with the submitted email already exists
    User.findOne({ 'local.email': email })
    .then(function(user) {
      if (user) {
        // console.log("found user:", user.local.email);
        return done(null, false, req.flash('signupFlash', 'Email taken.'));
      } else {
        // If there is no existing user with the submitted email,
        // we're all good to create the user
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if (err) {
            return done(err);
          } else {
            return done(null, newUser);
          }
        });
      }
    })
    .catch(function(err) {
      console.log("[error]:", err);
      return done(err, false);
    });
  }));


  // Local Login
  // ===========================================================================
  passport.use('local-login', new LocalStrategy(localSettings, function(req, email, password, done) {
    console.log("looking for users...");
    User.findOne({ 'local.email': email })
    .then(function(user){
      // If the user doesn't exist
      if (!user) {
        return done(null, false, req.flash('loginFlash', 'No user found.'))
      }

      // If the user is found, but the email is wrong
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginFlash', 'Incorrect password.'));
      }

      // Else, everything went according to plan
      return done(null, user);
    })
    .catch(function(err){
      console.log("[error]:", err);
      return done(err, false);
    })
  }));
}
