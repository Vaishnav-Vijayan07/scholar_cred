import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBWEJpPaJX2bmRavqCQjM5JaeL4TbrQyII",
  authDomain: "sample-cred-84e8b.firebaseapp.com",
  projectId: "sample-cred-84e8b",
  storageBucket: "sample-cred-84e8b.appspot.com",
  messagingSenderId: "384768726040",
  appId: "1:384768726040:web:3a0316e04786638eb55f6d",
  measurementId: "G-T1XMRB8968",
};

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

