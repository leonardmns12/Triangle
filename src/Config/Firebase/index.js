import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
var firebaseConfig = {
    apiKey: "AIzaSyCB7_bDbW6YCfj_o24d5OxpnS_KjgM7rQ8",
    authDomain: "triangle-chat-apps.firebaseapp.com",
    databaseURL: "https://triangle-chat-apps.firebaseio.com",
    projectId: "triangle-chat-apps",
    storageBucket: "triangle-chat-apps.appspot.com",
    messagingSenderId: "142077199441",
    appId: "1:142077199441:web:a609d6c99a7e5d7302a470"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 

  export const database = firebase.database();
  export default firebase;