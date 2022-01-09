const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const PORT = config.get('port') || 5000;
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'randomstring',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, //2hours
    // secure: true
  },
  store: new MongoDBStore({ uri: config.get('mongoURL'), collection: 'sessions' })
}));

app.use(flash());

app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRouter);


const start = async() => {
  try {
    await mongoose.connect(config.get('mongoURL'))
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
