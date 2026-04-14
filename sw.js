// sw.js — KIT Library Service Worker
// Place this file in the SAME folder as kit_library_v7.html on GitHub

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// ── Firebase config (same as in the HTML) ──
firebase.initializeApp({
  apiKey: "AIzaSyBDlN87xrd8NP_PQ4CIsV5q-P78w8k80Ms",
  authDomain: "library-5015d.firebaseapp.com",
  projectId: "library-5015d",
  storageBucket: "library-5015d.firebasestorage.app",
  messagingSenderId: "25135880670",
  appId: "1:25135880670:web:0885d13d72ee38061ae54f"
});

const messaging = firebase.messaging();

// ── Handle background push messages ──
// This fires when the app is CLOSED or in the BACKGROUND
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'KIT Library';
  const body  = payload.notification?.body  || '';
  const icon  = payload.notification?.icon  ||
    'https://collegesdirectory.in/World/MasterAdmin/College-Master/College_Logo/Logo-303131703.png';

  self.registration.showNotification(title, {
    body,
    icon,
    badge: icon,
    tag: 'kit-library-push-' + Date.now(),
    vibrate: [200, 100, 200, 100, 200],
    requireInteraction: true,   // stays until user taps it
    data: { url: self.location.origin + self.location.pathname.replace('sw.js', '') }
  });
});

// ── Notification click: open/focus the app ──
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const appUrl = event.notification.data?.url || self.location.origin;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // If app is already open, focus it
      for (const client of windowClients) {
        if (client.url.includes(appUrl.split('/').pop()) && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open it
      return clients.openWindow(appUrl);
    })
  );
});

// ── Cache app shell for offline support ──
const CACHE = 'kit-library-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
