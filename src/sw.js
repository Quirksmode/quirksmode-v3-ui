import { setConfig, skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import * as googleAnalytics from 'workbox-google-analytics';

// Path prefix to load modules locally
//setConfig({ debug: false });

// Updating SW lifecycle to update the app after user triggered refresh
skipWaiting();
clientsClaim();

// Inject the generated manifest from webpack
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
  /\.(?:js|css)$/,
  new StaleWhileRevalidate(),
);

registerRoute(
  // Cache API Request
  new RegExp('/wp-json/(.*)'),
  new NetworkFirst({
    cacheName: 'apiCache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 60 // 30 Minutes
      })
    ]
  })
);

registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  new NetworkFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'page-home-cache',
  })
);

registerRoute(
  '/about-me/',
  new NetworkFirst({
    cacheName: 'page-about-cache',
  })
);

registerRoute(
  '/portfolio/',
  new NetworkFirst({
    cacheName: 'page-portfolio-cache',
  })
);

registerRoute(
  '/blog/',
  new NetworkFirst({
    cacheName: 'page-blog-cache',
  })
);

registerRoute(
  '/contact/',
  new NetworkFirst({
    cacheName: 'page-contact-cache',
  })
);

googleAnalytics.initialize();
