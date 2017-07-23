// REQUIRE PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


// REQUIRE LOCAL FILES
const config = require('./../config');


// INVOKE EXPRESS AND SET UP MIDDLEWARE
const app = express();
app.use(bodyParser.json());
// app.use(express.static(__dirname + './../build'));


// DATABASE CONNECTION
massive(config.connectionString)
.then( db => {
    app.set('db', db);
    console.log('successful db hookup')
  })
.catch( err => console.log(err));


// SESSIONS & AUTH0 & PASSPORT
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 14}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
  domain: config.auth0.domain,
  clientID: config.auth0.clientID,
  clientSecret: config.auth0.clientSecret,
  callbackURL: config.auth0.callbackURL
}, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    let flag = false;
    db.checkUser([profile.id]).then(user => {
      console.log('user', user);
      if (user.length) {
        console.log('found');
      } else {
        flag = true;
        console.log('lost');
      }
      if(flag) {
        db.createUser([profile.id, profile.emails[0].value.email, profile.nickname, profile.displayName, profile.picture]).then(console.log('creation')).catch(err => console.log('creation failed', err));
      } else {
        db.updateUser([profile.id, profile.emails[0].value.email, profile.nickname, profile.displayName, profile.picture]).then(console.log('update')).catch(err => console.log('update failed', err));
      }
    }).catch(err => console.log('check failed', err));

  return done(null, profile);
}));

app.get('/auth0', passport.authenticate('auth0'));
app.get(config.auth0.callbackURL, passport.authenticate('auth0', {successRedirect: 'http://localhost:3000/profile'}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// ENDPOINTS
app.get('/api/checkuser', (req, res) => {
  if (req.user) {
    res.status(200).send(true)
   } else {
     res.status(200).send(false)
   }
});
app.get('/api/userinfo', (req, res) =>{
  const db = req.app.get('db');
  db.checkUser([req.user.id]).then(data => res.status(200).send(data))
});
app.get('/api/media/:id', (req, res) => {
  const db = req.app.get('db');
  db.getUserMedia([req.params.id])
  .then(data => res.status(200).send(data))
});
app.get('/api/pages/:id', (req, res) => {
  const db = req.app.get('db');
  db.getUserPages([req.params.id])
  .then(data => res.status(200).send(data))
});
app.get('/api/groups/:id', (req, res) => {
  const db = req.app.get('db');
  db.getUserGroups([req.params.id])
  .then(data => res.status(200).send(data))
})


// LISTEN
app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))