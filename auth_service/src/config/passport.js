const { Strategy, ExtractJwt } = require('passport-jwt');
const { users } = require('../models'); // Adjust the path to your Sequelize models
const {JWT_SECRET_KEY} = require("../config/serverconfig");

const secretKey = JWT_SECRET_KEY; // Use an environment variable for the secret key

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await users.findOne({ where: { useremail: jwt_payload.email } });
        if (user) {
          return done(null, {
            id: user.id,
            email: user.useremail,
            usertype: user.usertype
          });
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
