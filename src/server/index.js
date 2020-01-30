const helmet = require('helmet');
const hpp = require('hpp');
const express = require('express');
const webpack = require('webpack');
const compression = require('compression');
const dotenv = require('dotenv');
const spdy = require('spdy');
const fs = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../../webpack.client');
const serverConfig = require('../../webpack.server');

// Load the .env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Use helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution
app.use(hpp());

// create your own certificate with openssl for development
// const spdyOptions = {
//   key: fs.readFileSync('local.quirksmode.co.uk.quirksmode.key.pem'),
//   cert: fs.readFileSync('local.quirksmode.co.uk.quirksmode.cert.pem'),
//   // spdy: {
//   //   plain: true,
//   //   ssl: false,
//   // }
// };

const shouldCompress = (req, res) => {
  // don't compress responses asking explicitly not
  if (req.headers['x-no-compression']) {
    return false;
  }

  // use compression filter function
  return compression.filter(req, res);
};

// Apply GZIP Compression
app.use(compression({ filter: shouldCompress }));

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const { publicPath } = clientConfig.output;
  const options = {
    publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: false, // Turn it on for friendly-errors-webpack-plugin
    noInfo: false,
    writeToDisk: true,
    stats: 'normal',
    serverSideRender: true
  };
  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler, {
    log: false // Turn it off for friendly-errors-webpack-plugin
  }));
  app.use(webpackHotServerMiddleware(compiler, {
    log: false // Turn it off for friendly-errors-webpack-plugin
  }));
} else {
  // eslint-disable-next-line global-require
  const serverRenderer = require('./render-html').default;

  // Configuring HTTP caching behavior (https://web.dev/codelab-http-cache/)
  app.use(express.static('build/public', {
    etag: true, // Just being explicit about the default.
    lastModified: true, // Just being explicit about the default.
    setHeaders: (res, thePath) => {
      const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

      if (thePath.endsWith('.html')) {
        // All of the project's HTML files end in .html
        res.setHeader('Cache-Control', 'no-cache');
      } else if (hashRegExp.test(thePath)) {
        // If the RegExp matched, then we have a versioned URL.
        res.setHeader('Cache-Control', 'max-age=31536000');
      }
    },
  }));

  app.use(serverRenderer());
}

// // start the HTTP/2 server with express
// spdy.createServer(spdyOptions, app).listen(PORT, (error) => {
//   if (error) {
//     console.error(error);
//     return process.exit(1);
//   }
//   console.log(`HTTP/2 server listening on port: ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`HTTP server listening on port: ${PORT}`);
});
