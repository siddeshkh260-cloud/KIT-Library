// ================================================================
//  firebase-messaging-sw.js
//  Place this file at the ROOT of your GitHub Pages repo
//  (same level as index.html, manifest.json, sw.js)
// ================================================================

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// ── Your Firebase config (must match index.html) ──────────────
firebase.initializeApp({
  apiKey:            "AIzaSyBDlN87xrd8NP_PQ4CIsV5q-P78w8k80Ms",
  authDomain:        "library-5015d.firebaseapp.com",
  projectId:         "library-5015d",
  storageBucket:     "library-5015d.firebasestorage.app",
  messagingSenderId: "25135880670",
  appId:             "1:25135880670:web:0885d13d72ee38061ae54f"
});

const messaging = firebase.messaging();

// ── Background message handler ─────────────────────────────────
// Fires when a push arrives and the KIT Library tab is closed / in background
messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw] Background message:', payload);

  const { title, body, icon } = payload.notification || {};

  const notifTitle = title || '📚 KIT Library';
  const notifBody  = body  || 'You have a new notification.';

  const options = {
    body:    notifBody,
    icon:    icon || '/KIT-Library/logo.png',   // adjust path if your logo is named differently
    badge:   '/KIT-Library/logo.png',
    tag:     'kit-library-notif',               // replaces previous notification of the same tag
    vibrate: [200, 100, 200],
    data:    payload.data || {},
    actions: [
      { action: 'open',    title: '📖 Open Library' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  self.registration.showNotification(notifTitle, options);
});

// ── Notification click handler ─────────────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  // Open / focus the KIT Library tab
  const url = 'https://siddeshkh260-cloud.github.io/KIT-Library/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.startsWith(url) && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
