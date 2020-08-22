// Enable ES6 Syntax
require('@babel/register')({
  plugins: ['dynamic-import-node'],
});

import express, { Request, Response } from 'express';
import expressStaticGzip from 'express-static-gzip';
import http from 'http';
import helmet from 'helmet';
import hpp from 'hpp';
import webpack from 'webpack';
import compression from 'compression';
import dotenv from 'dotenv';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
// @ts-ignore
import clientConfig from '../../webpack.client';
// @ts-ignore
import serverConfig from '../../webpack.server';
import { AddressInfo } from 'net';

// Load the .env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Use helmet to secure Express with various HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Prevent HTTP parameter pollution
app.use(hpp());

const shouldCompress = (req: Request, res: Response) => {
  // don't compress responses asking explicitly not to
  if (req.headers['x-no-compression']) {
    return false;
  }

  // use compression filter function
  return compression.filter(req, res);
};

// Apply GZIP Compression
app.use(compression({ filter: shouldCompress }));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const { publicPath } = clientConfig.output;
  const options = {
    publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: false,
    noInfo: false,
    writeToDisk: true,
    serverSideRender: true,
  };
  const instance = webpackDevMiddleware(compiler, options);

  app.use(instance);

  instance.waitUntilValid(() => {
    const url = `${process.env.UI_URL}:${PORT}`;
    console.info(`Listening at ${url}`);
  });

  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));
} else {
  const serverRenderer = require('./react/renderHtml').default;
  app
    .use(
      '/',
      expressStaticGzip('build/public', {
        index: false,
        enableBrotli: true,
        orderPreference: ['br', 'gz'],
        serveStatic: {
          setHeaders(res: Response) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
          },
        },
      })
    )
    .use(serverRenderer());
}

// Start HTTP Server
const server = http.createServer(app);
// @ts-ignore
server.listen(PORT, (err) => {
  if (err) throw err;
  const { port } = server.address() as AddressInfo;
  console.log(`Listening on ${port}`);
});
