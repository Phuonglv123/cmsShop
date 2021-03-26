const config = require('./config');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const User = require('../models/user');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;
module.exports = (passport) => passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload);
    User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user)
            }
        })
        .catch(err => console.log(err));
}));
