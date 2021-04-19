const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('signin', new LocalStrategy(function (username, password, done){
  if ( username !== 'typo' || password !== 'something'){
    return done(null, false);
  }
  return done(null, {username: username});
}));

// POST signin
router.post('/signin',
    passport.authenticate('signin', {session: false}),
    function(req, res, next) {
    res.json({
      user: req.user,
      timestamp: Date.now()
    });
});

module.exports = router;
