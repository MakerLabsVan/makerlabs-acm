import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyA4FlZ_UlSF7QL7aj2oOaCk8dRG_pYXQ18",
  authDomain: "makerlabs-acm-test.firebaseapp.com",
  databaseURL: "https://makerlabs-acm-test.firebaseio.com",
  projectId: "makerlabs-acm-test",
  storageBucket: "makerlabs-acm-test.appspot.com",
  messagingSenderId: "919145167196",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

export {auth, googleAuthProvider, database};
