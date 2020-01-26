const helmet = require('helmet');
const hpp = require('hpp');
const logger = require('morgan');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const compression = require('compression');
const dotenv = require('dotenv');
const fs = require('fs');
const spdy = require('spdy');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../../webpack.client');
const serverConfig = require('../../webpack.server');

// Load the .env variables
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

// Use helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution
app.use(hpp());

// Use for http request debug (show errors only)
app.use(logger('dev', { skip: (req, res) => res.statusCode < 400 }));
// app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));


// create your own certificate with openssl for development
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '../../local.quirksmode.co.uk.quirksmode.key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../local.quirksmode.co.uk.quirksmode.cert.pem'))
};

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
    quiet: true, // Turn it on for friendly-errors-webpack-plugin
    noInfo: true,
    writeToDisk: true,
    stats: 'minimal',
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
  const publicPath = path.join(__dirname, '../../build/public');
  const serverRenderer = require('../../build/server.js').default;

  // Configuring HTTP caching behavior (https://web.dev/codelab-http-cache/)
  app.use(express.static(publicPath, {
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

// start the HTTP/2 server with express
spdy.createServer(sslOptions, app).listen(PORT, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  }
  console.log(`HTTP/2 server listening on port: ${PORT}`);
});

// app.listen(8080, () => {
//   console.log('Listening on port 8080');
// });
