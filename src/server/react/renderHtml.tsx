/* eslint-disable compat/compat */
import path from 'path';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Request, Response, NextFunction } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import routes from 'client/routes';
import configureStore from 'client/redux/store';

const IS_DEV = process.env.NODE_ENV !== 'production';
const UI_URL = process.env.UI_URL ? process.env.UI_URL : '';

const getCssString = (extractor: any): Promise<string> => {
  return extractor.getCssString();
};

const render = (
  req: Request,
  store: any,
  context: object,
  extractor: any,
  css: string
): string => {
  const content = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
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
        <link rel="apple-touch-icon" sizes="180x180" href="${UI_URL}/img/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${UI_URL}/img/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${UI_URL}/img/favicon/favicon-16x16.png">
        <link rel="manifest" href="${UI_URL}/img/favicon/site.webmanifest">
        <link rel="mask-icon" href="${UI_URL}/img/favicon/safari-pinned-tab.svg" color="#cc2d32">
        <meta name="msapplication-TileColor" content="#cc2d32">
        <meta name="theme-color" content="#ffffff">
        ${helmet.title.toString()}
        ${helmet.base.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <meta property="og:locale" content="en_UK" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@quirksmode_uk" />
        <meta name="twitter:site" content="@quirksmode_uk" />
        <script>let docEl=document.documentElement;docEl.className=docEl.className.replace( /(?:^|s)no-js(?!S)/g , ' js' );let isTouch="ontouchstart"in docEl;isTouch?docEl.classList.add("touch"):docEl.classList.add("no-touch"),function(e){"use strict";function t(t){if(t){var s=e.documentElement;s.classList?s.classList.add("webp"):s.className+=" webp",window.sessionStorage.setItem("webpSupport",!0)}}!function(e){if(window.sessionStorage&&window.sessionStorage.getItem("webpSupport"))t(!0);else{var s=new Image;s.onload=s.onerror=function(){e(2===s.height)},s.src="data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA"}}(t)}(document);</script>
        ${IS_DEV ? extractor.getStyleTags() : `<style>${css}</style>`}
        ${extractor.getLinkTags()}
        <link rel="preconnect" href="${process.env.CMS_URL}">
        <link rel="preconnect" href="https://storage.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-106775674-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-106775674-1');
        </script>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(store.getState())}
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
export default () => (req: Request, res: Response, next: NextFunction) => {
  const store = configureStore();

  // Loop through the routes array and get the data for each route (page)
  const loadRouteData = () => {
    const promises = matchRoutes(routes, req.path)
      .map(({ route, match }) =>
        route.loadData ? route.loadData(store, match, req.query) : null
      )
      .map(promise =>
        promise
          ? new Promise(resolve => promise.then(resolve).catch(resolve))
          : null
      );
    return Promise.all(promises);
  };

  // eslint-disable-next-line consistent-return
  (async () => {
    try {
      // Load data from server-side first
      await loadRouteData();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
        console.trace();
      }
    } finally {
      // Get the stats file which contains references to all the generated assets
      const statsFile = path.resolve(
        process.cwd(),
        'build/public/loadable-stats.json'
      );

      // Get the Chunk Extractor
      const extractor = new ChunkExtractor({ statsFile });

      // Get the CSS chunks as a string
      let cssString: string = await getCssString(extractor);
      cssString = `<style>${cssString}</style>`;

      const context: any = {};

      /**
       * Render the Server Side code and return as a string
       *
       * @name content
       * @type {string}
       */
      const content: string = render(req, store, context, extractor, cssString);

      if (context.url) {
        return res.redirect(301, context.url);
      }
      if (context.notFound) {
        res.status(404);
      }
      res.send(content);
    }
  })();
};
