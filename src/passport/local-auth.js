const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserLogin = require('../Model/userLogin');

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userlogin = new UserLogin();
      userlogin.email = email;
      userlogin.password = password;
      await userlogin.save();
      done(null, userlogin);
    }
  )
);
