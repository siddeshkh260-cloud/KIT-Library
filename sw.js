// sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBDlN87xrd8NP_PQ4CIsV5q-P78w8k80Ms",
  authDomain: "library-5015d.firebaseapp.com",
  projectId: "library-5015d",
  storageBucket: "library-5015d.firebasestorage.app",
  messagingSenderId: "25135880670",
  appId: "1:25135880670:web:0885d13d72ee38061ae54f"
});

const messaging = firebase.messaging();

// Handle background push messages (app is closed or in background)
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'kit-library-push',
    data: payload.data
  });
});
