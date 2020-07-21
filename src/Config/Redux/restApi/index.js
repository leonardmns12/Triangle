import firebase from '../../Firebase/';
import { database } from '../../Firebase/';

export const createNewUser = (data) => {
    return new Promise((resolve,reject) => {
      firebase.auth().createUserWithEmailAndPassword(data.email,data.password)
      .then(res => {
        const msg = "Register Success!"
        resolve(msg);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        reject(errorMessage);
      });
    })
  }

  export const signInUser = (email ,password) => {
    return new Promise((resolve,reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
          resolve(true);
        }
      ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        reject(errorMessage);
      });
    })
  }

  export const signOutUser = () => {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(function() {
        resolve(true);
      }).catch(function(error) {
        reject(false);
      });
    })
  }

  export const onAuthUser = () => {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          resolve(user);
          // ...
        } else {
          // User is signed out.
          // ...
          resolve(false);
        }
    })
    });
  }

  export const sendMessage = (data,userId) => {
        firebase.database().ref('messages/' + userId).push({
          sender: data.sender,
          receiver: data.receiver,
          message : data.message
        });
  }

  export const createUser = (data) => {
    firebase.database().ref('users/' +data.username).push({
      username : data.username,
      email : data.email
    });
  }

  export const getMessage = (userId) => {
    const getDataPost = database.ref('messages/' + userId);
    getDataPost.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
    console.log('data :',snapshot.val())
    });
}

