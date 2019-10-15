const express = require('express');
const { config } = require('../config');
const webpack = require('webpack');

const app = express();

if (config.dev) {
  console.log('Cargando la configuración de desarrollo');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: `http://localhost${config.dev}`,
    port: config.port,
    publicPath: webpackConfig.output.path,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  res.send({ holamundo: true });
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`El servidor está corriendo en htpp://localhost:${config.port}`);
});