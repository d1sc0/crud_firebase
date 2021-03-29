// Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBL_X_SkJIIbBh4VWmBEeDIyo8SxGGANlE",
    authDomain: "crud-firebase-c1897.firebaseapp.com",
    projectId: "crud-firebase-c1897",
    storageBucket: "crud-firebase-c1897.appspot.com",
    messagingSenderId: "524459799519",
    appId: "1:524459799519:web:d8a944e951fd0177d90a6a",
    measurementId: "G-PXFE0FZ6S9"
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore()
    const auth = firebase.auth()
    const storage = firebase.storage()
    db.settings({ timestampsInSnapshots: true })