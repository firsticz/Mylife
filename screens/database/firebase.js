// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDCUQLwQq-hmkhqOA_w3okVO87f7tXt0qM",
    authDomain: "mylife-b4dc6.firebaseapp.com",
    databaseURL: "https://mylife-b4dc6.firebaseio.com",
    projectId: "mylife-b4dc6",
    storageBucket: "mylife-b4dc6.appspot.com",
    messagingSenderId: "1065466200083",
    appId: "1:1065466200083:web:cfacb364812356efd7bfe6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;