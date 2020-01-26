/* eslint-disable compat/compat */
import path from 'path';
import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';
import chalk from 'chalk';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import routes from '../client/routes';
import createStore from '../client/redux/store';

const IS_DEV = process.env.NODE_ENV !== 'production';

const getCssString = extractor => extractor.getCssString();

const render = (req, store, context, extractor, css) => {
  const content = renderToString(
    <ChunkExtractorManager extractor={ extractor }>
      <Provider store={ store }>
        <StaticRouter location={ req.path } context={ context }>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    </ChunkExtractorManager>
  );
  const helmet = Helmet.renderStatic();

  const html = `
    <!DOCTYPE html>
    <html class="no-js" lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${helmet.title.toString()}
        ${helmet.base.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <script>let docEl=document.documentElement;docEl.className=docEl.className.replace( /(?:^|s)no-js(?!S)/g , ' js' );let isTouch="ontouchstart"in docEl;isTouch?docEl.classList.add("touch"):docEl.classList.add("no-touch"),function(e){"use strict";function t(t){if(t){var s=e.documentElement;s.classList?s.classList.add("webp"):s.className+=" webp",window.sessionStorage.setItem("webpSupport",!0)}}!function(e){if(window.sessionStorage&&window.sessionStorage.getItem("webpSupport"))t(!0);else{var s=new Image;s.onload=s.onerror=function(){e(2===s.height)},s.src="data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA"}}(t)}(document);</script>
        ${IS_DEV ? extractor.getStyleTags() : css}
        <link rel="preload" href="/portfolio" as="fetch" crossorigin>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        ${extractor.getScriptTags()}
        ${helmet.script.toString()}
      </body>
    </html>
  `;

  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true
  };

  // Minify html in production
  return IS_DEV ? html : minify(html, minifyConfig);
};

// Get all (fetchData) API data from components
export default () => (req, res) => {
  const store = createStore(req);

  // Loop through the routes array and get the data for each route (page)
  const loadRouteData = () => {
    const promises = matchRoutes(routes, req.path)
      .map(({ route, match }) => (route.loadData ? route.loadData(store, match, req.query) : null))
      .map((promise) => {
        if (promise) {
          return new Promise(resolve => promise.then(resolve).catch(resolve));
        }
        return Promise.resolve(null);
      });
    return Promise.all(promises);
  };

  // eslint-disable-next-line consistent-return
  (async () => {
    try {
      // Load data from server-side first
      await loadRouteData();

      // Get the stats file which contains references to all the generated assets
      const statsFile = path.resolve(process.cwd(), 'build/public/loadable-stats.json');

      // Get the Chunk Extractor
      const extractor = new ChunkExtractor({ statsFile });

      // Get the CSS chunks as a string
      let cssString = await getCssString(extractor);
      cssString = renderToString(
        <style
          dangerouslySetInnerHTML={ { __html: cssString } }
        />
      );

      const context = {};

      /**
       * Render the Server Side code and return as a string
       *
       * @name content
       * @type {string}
       */
      const content = render(req, store, context, extractor, cssString);

      if (context.url) {
        return res.redirect(301, context.url);
      }
      if (context.notFound) {
        res.status(404);
      }

      res.send(content);
    } catch (err) {
      res.status(404).send('Not Found');
      console.error(chalk.red(`Rendering routes error: ${err}`));
    }
  })();
};
