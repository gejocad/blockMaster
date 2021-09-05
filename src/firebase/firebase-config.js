import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDLGiIO38yt9iWafIG_PZm4qFO8VjVSY3Q",
  authDomain: "block-master-c2e1c.firebaseapp.com",
  projectId: "block-master-c2e1c",
  storageBucket: "block-master-c2e1c.appspot.com",
  messagingSenderId: "897697643083",
  appId: "1:897697643083:web:149b92fda400a7dcfeabce"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export {
    db,
    googleAuthProvider,
    facebookAuthProvider,
    firebase
}