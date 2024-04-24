// Requires
const passport = require('passport');
const localStartegy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const JWTstartegy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// Helper Functions

let createUser = async(username, password, cb) => {
    try{
        const user = await UserModel.create({username, password});
        return cb(null, user);
    } catch (err) {
        cb(err);
    }
}

let authenticateLogin = async (username, password, cb) => {
    UserModel.findOne({username})
    .then(async (user) => {
        if (!user) {
            return cb(null, false);
        }

        console.log("User found");

        const isValidPwd = await user.isValidPassword(password);

        if (isValidPwd) {
            return cb(null, user);
        } else {
            return cb(null, false);
        }

    })
    .catch((err) => {
        cb(err);
    });
};

let getUserFromToken = async (token, cb) => {
    try {
        return cb(null, token.payload);
    } catch(err) {
        cb(err);
    }
}


passport.use(
    'register',
    new localStartegy(
        {
            usernameField:'username',
            passwordField:'password'
        },
        createUser
    )
);

passport.use(
    'login',
    new localStartegy(
        {
            usernameField:'username',
            passwordField:'password'
        },
        authenticateLogin
    )
);

passport.use(
    new JWTstartegy(
        {
            secretOrKey: process.env.TOP_SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        getUserFromToken
    )
)