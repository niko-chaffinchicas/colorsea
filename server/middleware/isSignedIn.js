function isSignedIn(req, res, next) {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // If user is not authenticated, send them back to home
  res.redirect('/');
}

module.exports = isSignedIn;
