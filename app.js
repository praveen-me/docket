const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './server/views'))

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

//Essential Middleware
app.use(bodyParser.json())


//Requiring routes
app.use(require('./server/routers/index'));

app.listen(8001, (err, done) => {
  console.log(`Server is running on http://localhost:8001`)
})