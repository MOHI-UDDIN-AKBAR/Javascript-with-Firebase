// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdgJVb-Vi2V1pfP4zbyBS5CwSm7NyUTg4",
    authDomain: "clone-6d19b.firebaseapp.com",
    projectId: "clone-6d19b",
    storageBucket: "clone-6d19b.appspot.com",
    messagingSenderId: "576630036250",
    appId: "1:576630036250:web:e4ca65f10ee7f9aaebbea3",
    measurementId: "G-84D91HH0YB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();