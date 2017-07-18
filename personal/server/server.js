const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const config = require('./../config');

const app = express();

app.use(express.static(__dirname + './../build'));

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
  domain: config.auth0.domain,
  clientID: config.auth0.clientID,
  clientSecret: config.auth0.clientSecret,
  callbackURL: config.auth0.callbackURL
}, function(accessToken, refreshToken, extraParams, profile, done) {
    console.log(`Logged In: ${profile}`);
    //DO DATABASE STUFF HERE TO FIND/ADD A USER
  return done(null, profile);
}));


app.get('/auth0', passport.authenticate('auth0'));
app.get('/auth0/callback', passport.authenticate('auth0', {successRedirect: '/me'}));
app.get('/me', (req, res) => {
    res.send(req.user);
})

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))