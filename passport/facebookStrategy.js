const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models');

const clientID = process.env.FACEBOOK_ID
const clientSecret = process.env.FACEBOOK_CLIENT_SECRET
const callbackURL = 'http://localhost:8001/auth/facebook/callback'

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID,
        clientSecret,
        callbackURL,
        profileFields: ['id', 'displayName', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'facebook' } });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'facebook'
                });
                done(null, newUser);
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
}