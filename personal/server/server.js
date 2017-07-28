// REQUIRE PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const socket = require('socket.io');
const socketWildCard = require('socketio-wildcard')();
const cloud = require('cloudinary');

// REQUIRE LOCAL FILES
const config = require('./../config');

cloud.config({ 
  cloud_name: 'be-the-bert', 
  api_key: config.cloud.apiKey, 
  api_secret: config.cloud.apiSecret 
});



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
    db.getUserInfo([profile.id]).then(user => {
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
app.get(config.auth0.callbackURL, passport.authenticate('auth0', {successRedirect: 'http://localhost:3000/dashboard'}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
app.get('/auth0/logout', function(req, res) {
  req.logout();
  res.redirect('http://localhost:3000/welcome');
})





// ENDPOINTS

app.post('/api/upload', (req, res) => {
  console.log(req.body.result);
  cloud.v2.uploader.upload(req.body.result, response => {
    res.status(200).send(response);
  })
});




app.get('/api/checkuser', (req, res) => {
  if (req.user) {
    res.status(200).send(true)
   } else {
     res.status(200).send(false)
   }
});
app.get('/api/userinfo', (req, res) =>{
  const db = req.app.get('db');
  db.getUserInfo([req.user.id]).then(data => res.status(200).send(data))
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
app.get('/api/sections/:id', (req, res) => {
  const db = req.app.get('db');
  db.getUserSections([req.params.id])
  .then(data => res.status(200).send(data))
})
app.get('/api/users', (req, res) => {
  const db = req.app.get('db');
  db.getUsers()
  .then(data => res.status(200).send(data))
})
app.get('/api/page/:dayid', (req, res) => {
  const db = req.app.get('db');
  db.getPage([req.params.dayid])
  .then(data => res.status(200).send(data))
})

app.post('/api/creategroup', (req, res) => {
  const db = req.app.get('db');
  db.postGroup([req.body.name])
  .then(data => res.status(200).send(data));
})
app.post('/api/addmember', (req, res) => {
  const db = req.app.get('db');
  const { groupid, userid, admin } = req.body;
  db.postMember([groupid, userid, admin])
  .then(res.status(200).send('added member'));
})
app.post('/api/addsection', (req, res) => {
  const db = req.app.get('db');
  const { groupid, name } = req.body;
  db.postSection([groupid, name])
  .then(data => res.status(200).send(data));
})
app.post('/api/addday', (req, res) => {
  const db = req.app.get('db');
  const { sectionid, date } = req.body;
  db.postDay([sectionid, date])
  .then(data => res.status(200).send('added day'));
})

// LISTEN
const io = socket(app.listen(config.port, () => console.log(`Server listening on port ${config.port}`)))
io.use(socketWildCard);

// SOCKETS

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // socket.on('*', () => {
  //   console.log('catch all was hit');
  //   socket.emit('please update')
  // })
  socket.on('join', data => {
    console.log('join was hit', data);
    socket.join(data.userid);
  })
  socket.on('leave', data => {
    console.log('leave was hit', data);
    socket.leave(data.userid)
  })
  socket.on('update check', data => {
    console.log('update check was hit', data);
    const db = app.get('db');
    db.getUserMedia([data.userid]).then(dbdata => {
      io.to(data.userid).emit('receive media data', dbdata)
    })
  })
  socket.on('force update check', () => {
    console.log('force update check was hit');
    socket.emit('please update');
  })
//LOL PUT THE UPDATE EMIT ON THE UPLOAD CATCHERS. ON ALL CREATES AN INFINITE LOOP


  // socket.on('group basket', data => {
  //   socket.join(data.basketid);
  //   // db.getUserMedia([data.userid]).then(dbdata => {
  //   //   console.log('db query for media', dbdata);
  //     // io.to('all').emit('update media', dbdata)
  //   // })
  // });
  // socket.on('basket', data => {
  //   console.log('I got a basket', data);
  //   socket.join(data.basket);
  // });
  // socket.on('upload', data => {
  //   console.log('i got an upload', data);
  //   // const db = app.get('db');
  //   // db.postGroup([data.testtext]).then(dbdata => {
  //   // })
  //     io.to(data.basket).emit('receive testtext', data.testtext)
  // })
  // socket.on('leave basket', data => {
  //   socket.leave(data.basket);
  // })
})