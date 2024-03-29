const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const favicon = require('serve-favicon');
const messages = require('express-messages');

const MongoDBStore = require('connect-mongodb-session')(session);
const PORT = config.get('port') || process.env.PORT;
const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(fileUpload());

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

//ico
app.use(favicon(path.join(__dirname, 'public','favicon.ico')));

//messages
app.use(flash());

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
