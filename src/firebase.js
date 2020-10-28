import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "Your_Firebase_apiKey",
    authDomain: "Your_Firebase_authDomain",
    databaseURL: "Your_Firebase_databaseURL",
    projectId: "Your_Firebase_projectId",
    storageBucket: "Your_Firebase_storageBucket",
    messagingSenderId: "Your_Firebase_messagingSenderId",
    appId: "Your_Firebase_appId",
    measurementId: "Your_Firebase_measurementId",
});

const db = firebaseApp.firestore();

export default db;
