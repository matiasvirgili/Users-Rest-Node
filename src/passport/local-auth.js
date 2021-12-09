const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserLogin = require('../Model/userLogin');

passport.serializeUser((user, done)=>{
  done(null, userlogin.id);
})

passport.deserializeUser(async (id, done)=>{
  const user = await UserLogin.findById(id);
  done(null, user);
})

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userExist = await UserLogin.findOne({email:email})
      if(userExist){
        return done(null, false, req.flash('singupMessage', 'The Email is already taken.'))
      } else{
      const newUser = new UserLogin();
      newUser.email = email;
      newUser.password = newUser.encryptPasswword(password);
      await newUser.save();
      done(null, newUser);
      }
    }
  )
);

passport.use('local.singin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done)=>{
  const existUser = await UserLogin.findOne({email:email});
  if(!existUser){
    return done(null, false, req.flash('singinMessage', 'No User found'))
  } 
  if(existUser.comparePassword(password)){
    return done(null, false, req.flash('singinMessage','Incorrect Password',))
  }
  done(null, existUser);
}));
