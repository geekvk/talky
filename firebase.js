import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA3i6w2gC70bmUCcYVmiVj2eQ2_J5jtXBQ",
    authDomain: "talky-f39b1.firebaseapp.com",
    projectId: "talky-f39b1",
    storageBucket: "talky-f39b1.appspot.com",
    messagingSenderId: "578137065760",
    appId: "1:578137065760:web:b538ed06470c1a99c2af45",
    measurementId: "G-HK7P2BZH8Y"
  };

let app;

if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore(); // db access variable
const auth = firebase.auth(); // authentication varialbe

export { db, auth };
