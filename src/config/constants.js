import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD2XvY7c04ZLJzE-kpOQLB4KLWZVr9D5ck",
    authDomain: "practicum-office-hours.firebaseapp.com",
    databaseURL: "https://practicum-office-hours.firebaseio.com",
    projectId: "practicum-office-hours",
    storageBucket: "practicum-office-hours.appspot.com",
    messagingSenderId: "634188879040"
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth