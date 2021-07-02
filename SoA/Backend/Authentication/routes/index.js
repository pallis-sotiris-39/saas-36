const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWT_SECRET = 'our-biggest-secret'

const {pool} = require('../bin/dbConfig')
const bcrypt = require('bcrypt')

passport.use('signin', new LocalStrategy(async function (username, password, done){
    try{
        const res = await pool.query('SELECT * FROM public.user WHERE username = $1', [username]);
        if(res.rows.length < 1){
            return done(null, false);
        }
        let passwordFromBase = res.rows[0].password;

        bcrypt.compare(password, passwordFromBase, function (err, result) {
            if(err){
                throw err
            }
            return result ?  done(null, {username: username}) : done(null, false)
        })
    }catch (e) {
        throw e
    }
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

//POST signup
router.post('/signup',
    async function (req, res){
        try{
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let birthday = req.body.birthday;
            let email = req.body.email;
            let username = req.body.username;
            let password = req.body.password;
            if(!first_name || !last_name || !birthday || !email || !username || !password){
                throw new Error('All fields are required.');
            }
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.match(validRegex)){
                throw new Error('Email is in wrong format.');
            }
            if(!/^([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([1-9]|0[1-9]|1[0-2])\/([1-2][0-9][0-9][0-9])$/.test(birthday)){
                throw new Error('Birthday is in wrong format.');
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            let test = await pool.query('SELECT FROM public.user WHERE username = $1 OR email = $2', [username, email])
            if(test.rows.length > 0){
                res.header('Access-Control-Allow-Origin', req.headers.origin);
                res.status(400).send({
                    message: 'User already exists!'
                })
            }
            else{
                let results = await pool.query('INSERT INTO public.user VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)', [first_name, last_name, birthday, username, email, hashedPassword]);
                res.header('Access-Control-Allow-Origin', req.headers.origin);
                res.json({username: username})
                res.send
            }
        }catch (e) {
            console.log(e.message);
            res.status(400).send({
                message: e.message
            })
        }
    }
)

//POST update
router.post('/update',
    passport.authenticate('token', { session: false}),
    function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);

    }
);

//GET whoami
router.get('/whoami',
    passport.authenticate('token', { session: false}),
    function (req,res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.json({user: req.user});
    }
);

module.exports = router;
