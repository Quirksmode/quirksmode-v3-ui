/* global workbox, self */
/* eslint no-restricted-globals: "error" */

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);
