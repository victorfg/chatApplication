const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'emailInput',
    passwordField: 'passwordInput',
    passReqToCallback: true
}, async (req,emailInput, passwordInput, done) => {
    const user = await User.findOne({emailInput: emailInput});
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
    } else {
        // Match Password's User
        const match = await User.findOne({passwordInput: passwordInput});
        if(match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'La contraseña es incorrecta' });
        }
    }
}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) => {
        done(err, user);
    })
});