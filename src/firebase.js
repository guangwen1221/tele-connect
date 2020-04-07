import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyBdFly8-aqpuYsC0qxA5xE46SxWGQw3pEo",
  authDomain: "wellness-connect-86790.firebaseapp.com",
  databaseURL: "https://wellness-connect-86790.firebaseio.com",
  projectId: "wellness-connect-86790",
  storageBucket: "wellness-connect-86790.appspot.com",
  messagingSenderId: "12659843796",
  appId: "1:12659843796:web:50996ff58b0bdb941a9141",
  measurementId: "G-KQWJKW4GQT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const storage = firebase.storage()