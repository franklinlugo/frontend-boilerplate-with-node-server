const path = require('path');
const http = require('http');
const express = require('express');

const webpack = require('webpack');

function createServer() {
  // create express instance
  const app = express();

  // webpack compiler
  const config = require('./webpack.development.js');
  const compiler = webpack(config);

  // webpackDevMiddleware serves the files emitted from webpack
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
    publicPath: config.output.publicPath,
  });

  // Webpack hot reloading attached to express server
  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);

  app.use(express.static('public'));

  // App routes

  // home
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../src/views/index.html')));

  function startServer() {
    app.listen(3000, function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Listening at http://localhost:3000/');
    });
  }

  function reloadClient() {
    hotMiddleware.publish({ action: 'reload' });
  }

  return {
    start: startServer,
    reloadClient: reloadClient,
  };
}

module.exports = createServer();
