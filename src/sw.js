// /* global workbox, self */
// /* eslint no-restricted-globals: "error" */

// // workbox.core.skipWaiting();
// // workbox.core.clientsClaim();
// workbox.precaching.precacheAndRoute(self.__precacheManifest);
// workbox.routing.registerRoute(
//   /\.(?:js|css)$/,
//   new workbox.strategies.StaleWhileRevalidate(),
// );

// workbox.routing.registerRoute(
//   // Cache API Request
//   new RegExp('/wp-json/(.*)'),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'apiCache',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 100,
//         maxAgeSeconds: 30 * 60 // 30 Minutes
//       })
//     ]
//   })
// );

// workbox.routing.registerRoute(
//   // Cache Image File
//   /.*\.(?:png|jpg|jpeg|svg|gif)/,
//   workbox.strategies.cacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       })
//     ]
//   })
// );

// workbox.routing.registerRoute('/', workbox.strategies.cacheFirst({
//   cacheName: 'home',
// }));

// // workbox.googleAnalytics.initialize();
