const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWT_SECRET = 'our-biggest-secret'

passport.use('signin', new LocalStrategy(function (username, password, done){
  if ( username !== 'typo' || password !== 'something'){
    return done(null, false);
  }
  return done(null, {username: username});
}));

passport.use('token', new JWTStrategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    function(token,done){
        return done(null, {username: token.username})
    }
))

// POST signin
router.post('/signin',
    passport.authenticate('signin', {session: false}),
    function(req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.json({
            token: jwt.sign(req.user, JWT_SECRET, { expiresIn: 3600 })
        });
    }
);

//GET whoami
router.get('/whoami',
    passport.authenticate('token', { session: false}),
    function (req,res, next) {
        res.json({user: req.user});
    }
);

module.exports = router;
