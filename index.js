const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const PORT = config.get('port') || 5000;
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
