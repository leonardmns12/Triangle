import firebase from '../../Firebase/';
import { database } from '../../Firebase/';
import { useDispatch , useSelector } from 'react-redux';
import { Receiver } from '../../../Component';

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

  export const updateUser = (data) =>{
    var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: data.username,
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
  } 
  
  export const getUsername = () => {
    return new Promise((resolve,reject) => {
      var user = firebase.auth().currentUser;
      var username;
  
      if (user != null) {
        username = user.displayName;
        resolve(username);
      }
      reject(false);
    })
  }

  function search(nameKey , myArray){
    for(var i = 0; i < myArray.length; i++){
        if(myArray[i].data.friend === nameKey){
            return true;
        }
    }
  }

  

  export const addtofriend = (receiver , sender , receiverid, senderid ) => {
    firebase.database().ref('users/' + receiver + '/friend').push({
      friend : sender
    })
    firebase.database().ref('users/' + sender + '/friend').push({
      friend : receiver
    })
  }

  export const addtofriend1 = (receiver , sender ,receiverid ,senderid ) => {
    console.log('users/' + sender + '/pendingFriend/' + receiverid)
    firebase.database().ref('users/' + receiver + '/incomingFriend/' + senderid).remove()
    firebase.database().ref('users/' + sender + '/pendingFriend/' + receiverid).remove()
  }

  export const checkPending = (username , namekey) => {
    return new Promise((resolve,reject)=> {
      const findData = firebase.database().ref('users/' + username + '/pendingFriend');
      findData.on('value' , function(snapshot){
        if(snapshot.val() === null || snapshot.val() === undefined){
          resolve(false)
        }else{
          const data = []
          Object.keys(snapshot.val()).map(key => {
            data.push({
                id: key,
                data: snapshot.val()[key]
            })
        })
         const res = search(namekey , data);
         if(res){
           resolve(true)
         }else{
           resolve(false)
         }
          
        }
    })
    })
  }
  export const addFriend = (data) => {
    firebase.database().ref('users/' +data.receiver +'/incomingFriend').push({
      friend: data.sender
    });
    firebase.database().ref('users/' +data.sender +'/pendingFriend').push({
      friend: data.receiver
    });
  }

  export const sendMessage = (data,msgid) => {
        firebase.database().ref('messages/' + msgid).push({
          sender: data.sender,
          receiver: data.receiver,
          message : data.message,
          timestamp : data.timestamp
        });
  }

  export const createUser = (data) => {
    firebase.database().ref('users/' +data.username).push({
      username : data.username,
      email : data.email
    });
  }


export const simpanData = (data) => {
    firebase.database().ref('users/' + data.userId + '/data').push({
      data1  : data.name,
      data2 : data.email
    })
}

export const checkMessage = (sender) => {
  return new Promise((resolve, reject)=>{
    const checkmsg = firebase.database().ref('users/' + sender + '/chat')
    checkmsg.on('value' , function(snapshot){
      if(snapshot.val() === null || snapshot.val() === undefined){
        resolve(true)
      }
    })
  })
}

export const addChatDatabase = (sender , receiver) => {
  firebase.database().ref('users/' + sender + '/chat').set({
    friend : receiver
  })
  firebase.database().ref('users/' + receiver + '/chat').set({
    friend : sender
  })
}
