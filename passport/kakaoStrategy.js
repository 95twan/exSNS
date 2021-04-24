const KakaoStrategy = require('passport-kakao').Strategy
const { User } = require('../models');

const clientID = process.env.NODE_ENV === 'production' ? process.env.KAKAO_ID : process.env.DEV_KAKAO_ID;
const callbackURL = process.env.NODE_ENV === 'production' ? 'http://13.209.35.12/auth/kakao/callback' : 'http://localhost:8001/auth/kakao/callback';

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID,
        callbackURL,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' } });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao'
                });
                done(null, newUser);
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
}