// import firebase from '../../Firebase/index.js';
import database from '@react-native-firebase/database';
// import { database } from '../../Firebase/';
import { useDispatch , useSelector } from 'react-redux';
import { Receiver } from '../../../Component';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { AsyncStorage } from 'react-native';

export const createNewUser = (data) => {
    return new Promise((resolve,reject) => {
      auth().createUserWithEmailAndPassword(data.email,data.password)
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
      auth().signInWithEmailAndPassword(email, password)
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
      auth().signOut().then(function() {
        resolve(true);
      }).catch(function(error) {
        reject(false);
      });
    })
  }

  export const onAuthUser = () => {
    return new Promise((resolve, reject) => {
      auth().onAuthStateChanged(function(user) {
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
    var user = auth().currentUser;

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
      var user = auth().currentUser;
      var username;
  
      if (user != null) {
        username = user.displayName;
        resolve(username);
      }
      reject(false);
    })
  }
  export const checkfriend = (username , namekey) => {
    const friend = database().ref('users/' + username + '/friend')
    .once('value').then(function(snapshot){
        if(snapshot.val() === null || snapshot.val() === undefined){
        }else{
          const data = []
          Object.keys(snapshot.val()).map(key => {
            data.push({
                id: key,
                data: snapshot.val()[key]
            })
          })
          const res = search(namekey,data)
          if(res){
            return true
          }else{
            return false
          }
        }
    })
    return friend
  }
  function search(nameKey , myArray){
    for(var i = 0; i < myArray.length; i++){
        if(myArray[i].data.friend === nameKey){
            return true;
        }
    }
  }
  export const addtofriend = (receiver , sender , receiverid, senderid ) => {
    database().ref('users/' + receiver + '/friend').push({
      friend : sender
    })
    database().ref('users/' + sender + '/friend').push({
      friend : receiver
    })
  }

  export const addtofriend1 = (receiver , sender ,receiverid ,senderid ) => {
    console.log('users/' + sender + '/pendingFriend/' + receiverid)
    database().ref('users/' + receiver + '/incomingFriend/' + senderid).remove()
    database().ref('users/' + sender + '/pendingFriend/' + receiverid).remove()
  }

  export const removeFriends = (usera , userb , ida, idb) => {
    console.log('users/' + usera + '/friend/' + ida)
    console.log('users/' + userb + '/friend/' + idb)
    database().ref('users/' + usera + '/friend/' + ida).remove()
    database().ref('users/' + userb + '/friend/' + idb).remove()
  }

  export const checkIncoming = (username , namekey) => {
    const incoming = database().ref('users/' + username + '/incomingFriend')
    .once('value').then(function(snapshot){
      if(snapshot.val() === null || snapshot.val() === undefined){
      }else{
        const data = []
        Object.keys(snapshot.val()).map(key => {
          data.push({
              id: key,
              data: snapshot.val()[key]
          })
        })
        const res = search(namekey,data)
        if(res){
          return true
        }else{
          return false
        }
      }
    })
    return incoming
  }

  export const checkPending = (username , namekey) => {
    return new Promise((resolve,reject)=> {
      const findData = database().ref('users/' + username + '/pendingFriend');
      findData.on('value' ,async function(snapshot){
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
         const res = await search(namekey , data);
         console.log('namekey = '+namekey)
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
    database().ref('users/' +data.receiver +'/incomingFriend').push({
      friend: data.sender
    });
    database().ref('users/' +data.sender +'/pendingFriend').push({
      friend: data.receiver
    });
  }

  export const sendMessage = (data,msgid) => {
        database().ref('messages/' + msgid).push({
          sender: data.sender,
          receiver: data.receiver,
          message : data.message,
          timestamp : data.timestamp,
          token : data.token,
          image : data.image,
          downloaduri : data.downloaduri
        });
  }

  export const createUser = (data) => {
    database().ref('users/' +data.username).push({
      username : data.username,
      email : data.email
    });
  }


export const simpanData = (data) => {
    database().ref('users/' + data.userId + '/data').push({
      data1  : data.name,
      data2 : data.email
    })
}

export const checkMessage = (sender) => {
  return new Promise((resolve, reject)=>{
    const checkmsg = database().ref('users/' + sender + '/chat')
    checkmsg.on('value' , function(snapshot){
      if(snapshot.val() === null || snapshot.val() === undefined){
        resolve(true)
      }
    })
  })
}

export const addChatDatabase = (data) => {
  database().ref('users/' + data.sender + '/chat/' + data.receiver).set({
    friend : data.receiver,
    message : data.message,
    realtime : data.realtime,
    timestamp : data.timestamp,
    isRead : true,
    isGroup : data.isGroup
  })
}

export const checkPermission = () => {
  const data = ''
  messaging().getToken()
  .then(async(token) => {
    if (token){
      const username = await AsyncStorage.getItem('username');
      database().ref('users/' + username + '/token').set({
        key : token
      })
    }else{
      alert('token not found!')
    }
  })
}

export const saveDisplayName = (username , displayname) => {
  database().ref('users/' + username + '/displayname').set({
    displayname : displayname
  })
}

export const saveStatusMessage = (username ,statusmessage) => {
  database().ref('users/' + username + '/statusmessage').set({
    statusmessage : statusmessage
  })
}

export const setEditProfile = (username , data , path) => {
  database().ref('users/' + username + '/' + path).set({
  [path] : data,
  })
}

export const getDisplayName = (username , type) => {
  const displayname = database()
  .ref('users/' + username + '/' + type +'/' +type)
  .once('value').then(function(snapshot){
    return snapshot.val()
  })
  return displayname
}

export const updateRead = (username , friend , a) => {
  database().ref('users/' + username + '/chat/' + friend).update({
    isRead : true,
    isGroup : a
  })
}
function search2(nameKey , myArray){
  for(var i = 0; i < myArray.length; i++){
      if(myArray[i].data.friend === nameKey){
          return myArray[i].id;
      }
  }
}
export const getId = (username , from , key ) => {
  console.log('users/' + username + '/' + from + '/' + key)
 const getdata =  database().ref('users/' + username + '/' + from).once('value').then(async function(snapshot){
     const data1 = []
     if(snapshot.val() === undefined || snapshot.val() === null){
       // crid('')
       // csid('')
       console.log('kosong ' +from)
     }
     else{
         Object.keys(snapshot.val()).map(key => {
             data1.push({
                 id: key,
                 data: snapshot.val()[key]
             })
         })
             return search2(key,data1)
     }
 })
 console.log('getdata = '+getdata)
 return getdata;
 
}
function search3(nameKey , myArray){
  for(var i = 0; i < myArray.length; i++){
      if(myArray[i].id === nameKey){
          return true;
      }
  }
}
export const checkusername = (username) => {
  const getuser = database().ref('users/').once('value').then(function(snapshot){
    const data = []
    console.log(snapshot.val())
    if(snapshot.val() === null || snapshot.val()=== undefined){

    }else{
      Object.keys(snapshot.val()).map(key => {
        data.push({
            id: key,
            data: snapshot.val()[key]
        })
      })
      const res = search3(username,data)
      console.log(res)
      if(res){
        return true;
      }else{
        return false
      }
      
    }
  })
  return getuser;
}

export const clearToken = (username) => {
    const data = database().ref('users/' + username + '/token').set({
      key : ''
    })
}

export const deleteChatlist = (username , friend) => {
  database().ref('users/' + username + '/chat/' + friend).remove()
}

export const createNewGroup = (data) => {
  const data1 = database().ref('group/').push({
    admin : data.username,
    name : data.groupname,
    groupimg : null
  }).key
  return data1;
}

export const addGroupMember = (username,group) => {
  database().ref('group/' + group.id + '/member/' + username).set({
    member : username
  })
  database().ref('users/' + username + '/group/' + group.id).set({
    groupName : group.name
  })
}

export const inviteGroupMember = (username, group) => {
  database().ref('users/' + username + '/incomingFriend/' + group.id).set({
    group : group.name
  })
  database().ref('group/' + group.id + '/pendingMember').push({
    member : username
  })
}

export const getGroupName = (groupid) => {
    const data = database().ref('group/' + groupid + '/name').once('value').then(async function(snapshot){
      return snapshot.val()
    })  
    return data
}

export const getMemberGroup = async (groupid) => {
  const data = database().ref('group/' + groupid +'/member').once('value').then(async function(snapshot){
    const data = []
    if(snapshot.val() === null || snapshot.val() === undefined){
      console.log('data kosong')
    }else{
      Object.keys(snapshot.val()).map(key => {
        data.push({
            id: key,
            data: snapshot.val()[key]
        })
      })
    }
    return data
  })
  return data
}

export const getPendingGroup = (groupid) => {
  const data = database().ref('group/' + groupid +'/pendingMember').once('value').then(async function(snapshot){
    const data = []
    if(snapshot.val() === null || snapshot.val() === undefined){
      console.log('data kosong')
    }else{
      Object.keys(snapshot.val()).map(key => {
        data.push({
            id: key,
            data: snapshot.val()[key]
        })
      })
    }
    return data
  })
  return data
}

export const newPost = (username, text) => {
  database().ref('post').push({
    value: text,
    username : username,
    timestamp : new Date().getHours()+':'+ new Date().getMinutes()
  })
}

export const getPostReply = (id) => {
  const res = database().ref('post/' + id).once('value').then(function(snapshot){
    const data = []

    if(snapshot.val() === null || snapshot.val() === undefined){
      console.log('data kosong')
    }else{
      Object.keys(snapshot.val()).map(key => {
        data.push({
            id: key,
            data: snapshot.val()[key]
        })
      })
    }

    return data;
  })
  return res
}

export const getPostName = (id) => {
  const res = database().ref('post/' + id + '/username').once('value').then(function(snapshot){
    return snapshot.val()
  })
  console.log('waktu2 : ' + res)
  return res
  // return res;
}

export const getPostTimestamp = (id) => {
  const res = database().ref('post/' + id + '/timestamp').once('value').then(function(snapshot){
    return snapshot.val()
  })
  console.log('waktu : ' + res)
  return res
}

export const getPostValue = (id) => {
  const res = database().ref('post/' + id + '/value').once('value').then(function(snapshot){
    return snapshot.val()
  })
  return res
}
 
export const sendReply = (id , data) => {
  database().ref('post/' + id  + '/comment').push({
    sender : data.sender,
    value : data.value,
    timestamp : data.timestamp
  })
}