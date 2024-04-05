// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
  apiKey: "AIzaSyBWEJpPaJX2bmRavqCQjM5JaeL4TbrQyII",
  authDomain: "sample-cred-84e8b.firebaseapp.com",
  projectId: "sample-cred-84e8b",
  storageBucket: "sample-cred-84e8b.appspot.com",
  messagingSenderId: "384768726040",
  appId: "1:384768726040:web:3a0316e04786638eb55f6d",
  measurementId: "G-T1XMRB8968",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
