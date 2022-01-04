import firebase from 'firebase/app';
import 'firebase/firestore';

var fire = firebase.initializeApp({
    apiKey: "AIzaSyDW9Gyin2T2iR_tFdH4Jh9HKP_gj7LqcOk",
    authDomain: "todoapp-with-firebase-d04b7.firebaseapp.com",
    projectId: "todoapp-with-firebase-d04b7",
    storageBucket: "todoapp-with-firebase-d04b7.appspot.com",
    messagingSenderId: "212329613117",
    appId: "1:212329613117:web:b0b4d43bb63c3e98792754",
    measurementId: "G-21REK1SKGG"

});
 var db= fire.firestore();
 export default db;