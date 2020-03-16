/* global workbox, self */
/* eslint no-restricted-globals: "error" */

// Path prefix to load modules locally
workbox.setConfig({ debug: false });

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Inject the generated manifest from webpack
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate(),
);

workbox.routing.registerRoute(
  // Cache API Request
  new RegExp('/wp-json/(.*)'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'apiCache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 60 // 30 Minutes
      })
    ]
  })
);

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);

workbox.routing.registerRoute(
  '/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'page-home-cache',
  })
);

workbox.routing.registerRoute(
  '/about-me/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'page-about-cache',
  })
);

workbox.routing.registerRoute(
  '/portfolio/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'page-portfolio-cache',
  })
);

workbox.routing.registerRoute(
  '/blog/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'page-blog-cache',
  })
);

workbox.routing.registerRoute(
  '/contact/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'page-contact-cache',
  })
);

workbox.googleAnalytics.initialize();
