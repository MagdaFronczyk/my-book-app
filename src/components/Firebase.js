import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyA9ZXFxzvGzcUGnqY5oLQCUwutGiXu-KmI",
    authDomain: "bookcase-app-220211.firebaseapp.com",
    databaseURL: "https://bookcase-app-220211.firebaseio.com",
    projectId: "bookcase-app-220211",
    storageBucket: "bookcase-app-220211.appspot.com",
    messagingSenderId: "382956583606"
};
firebase.initializeApp(config);

const fire = firebase.firestore();
fire.settings({ timestampsInSnapshots: true });

export const db = fire;