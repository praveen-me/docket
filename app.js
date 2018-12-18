const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './server/views'))

//Connecting To Mongodb
mongoose.connect('mongodb://localhost/docket', { useNewUrlParser: true } ,(err, done) => {
  if (err) throw err;
  console.log('Connected to mongodb');
})

// Webpack config
if(process.env.NODE_ENV === 'development') {
  console.log('in webpack hot middleware')
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(session({
  secret : 'docket session',
  saveUninitialized : false,
  resave : false,
  cookie : {
    maxAge : 360000
  }
}))
app.use(passport.initialize());
app.use(passport.session());
require('./server/modules/passport')(passport);

//Essential Middleware
app.use(bodyParser.json())
app.use('/api', require('./server/routers/api'))


//Requiring routes
app.use(require('./server/routers/index'));

app.listen(8001, (err, done) => {
  console.log(`Server is running on http://localhost:8001`)
})