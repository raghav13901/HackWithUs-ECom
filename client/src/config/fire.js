// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK1A5GMe1jXO8jbUJ0UPM_znWKWbdwLyU",
  authDomain: "hackwithus-ecom.firebaseapp.com",
  projectId: "hackwithus-ecom",
  storageBucket: "hackwithus-ecom.appspot.com",
  messagingSenderId: "49880422609",
  appId: "1:49880422609:web:f24c79bc12264dc5048df0",
  measurementId: "G-YW01VJG2WR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage().ref();
export { storage, firebase as default };