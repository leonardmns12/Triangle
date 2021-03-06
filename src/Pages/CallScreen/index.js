/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  Image
} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';

import io from 'socket.io-client'

import Video from '../WebRtc/components/video'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendMessage } from '../../Config/Redux/restApi/';
import InCallManager from 'react-native-incall-manager';

const dimensions = Dimensions.get('window')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      localStream: null,    // used to hold local stream object to avoid recreating the stream everytime a new offer comes
      remoteStream: null,    // used to hold remote stream object that is displayed in the main screen

      remoteStreams: [],    // holds all Video Streams (all remote streams)
      peerConnections: {},  // holds all Peer Connections
      selectedVideo: null,

      status: 'Please wait...',

      pc_config: {
        "iceServers": [
          {
            urls : 'stun:stun.l.google.com:19302'
          },
          {
            "url" : 'turn:turn.indofolks.com',
            "username" : 'shodaimekaze',
            "credential" : 'gurame442'
          }
        ]
      },

      sdpConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': this.props.route.params.videoCall ? true : false
        }
      },
      peerCount : null,
      connected : false,
      messages: [],
      sendChannels: [],
      disconnected: false,
      room: null,
      connect: false,
      camera: true,
      mic: true,
      isSended : false,
      speaker : false,
      second : 0,
      minute : 0,
      hours : 0,
      days : 0,
    }

    // DONT FORGET TO CHANGE TO YOUR URL
    this.serviceIP = 'http://88.214.58.197:8082/webrtcPeer'

    // this.sdp
    this.socket = null
    // this.candidates = []
  }

  getLocalStream = () => {
    const success = (stream) => {
      console.log('localStream... ', stream.toURL())
      if(this.mount){
        this.setState({
          localStream: stream
        })
      }

      this.whoisOnline()
    }

    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      const constraints = {
        audio: true,
        video: this.props.route.params.videoCall ?  {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30
          },
          facingMode: (isFront ? "user" : "environment"),
          optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
        } : false
      }

      mediaDevices.getUserMedia(constraints)
        .then(success)
        .catch(failure);
    });
  }

  whoisOnline = () => {
    // let all peers know I am joining
    this.sendToPeer('onlinePeers', null, {local: this.socket.id})
  }

  sendToPeer = (messageType, payload, socketID) => {
    this.socket.emit(messageType, {
      socketID,
      payload
    })
  }

  createPeerConnection = (socketID, callback) => {

    try {
      let pc = new RTCPeerConnection(this.state.pc_config)

      // add pc to peerConnections object
      const peerConnections = { ...this.state.peerConnections, [socketID]: pc }
      this.setState({
        peerConnections
      })

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          this.sendToPeer('candidate', e.candidate, {
            local: this.socket.id,
            remote: socketID
          })
        }
      }

      pc.oniceconnectionstatechange = (e) => {
        // if (pc.iceConnectionState === 'disconnected') {
        //   const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== socketID)

        //   this.setState({
        //     remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
        //   })
        // }
      }

      pc.onaddstream = (e) => {
        debugger

        let _remoteStream = null
        let remoteStreams = this.state.remoteStreams
        let remoteVideo = {}

        // if (e.stream.getTracks().length === 2) alert(e.stream.getTracks()[0].kind)

        // let swappedStream = new MediaStream()
        // console.log('0...', swappedStream)
        // e.stream.getAudioTracks() && swappedStream.addTrack(e.stream.getAudioTracks()[0])
        // console.log('1...', swappedStream)
        // e.stream.getVideoTracks() && swappedStream.addTrack(e.stream.getVideoTracks()[0])
        // console.log('2...', swappedStream)

        // 1. check if stream already exists in remoteStreams
        // const rVideos = this.state.remoteStreams.filter(stream => stream.id === socketID)

        remoteVideo = {
          id: socketID,
          name: socketID,
          stream: e.stream,
        }
        remoteStreams = [...this.state.remoteStreams, remoteVideo]

        // 2. if it does exist then add track
        // if (rVideos.length) {
        //   _remoteStream = rVideos[0].stream
        //   _remoteStream.addTrack(e.track, _remoteStream)
        //   remoteVideo = {
        //     ...rVideos[0],
        //     stream: _remoteStream,
        //   }
        //   remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
        //     return _remoteVideo.id === remoteVideo.id && remoteVideo || _remoteVideo
        //   })
        // } else {
        //   // 3. if not, then create new stream and add track
        //   _remoteStream = new MediaStream()
        //   _remoteStream.addTrack(e.track, _remoteStream)

        //   remoteVideo = {
        //     id: socketID,
        //     name: socketID,
        //     stream: _remoteStream,
        //   }
        //   remoteStreams = [...this.state.remoteStreams, remoteVideo]
        // }



        // const remoteVideo = {
        //   id: socketID,
        //   name: socketID,
        //   stream: e.streams[0]
        // }

        this.setState(prevState => {

          // If we already have a stream in display let it stay the same, otherwise use the latest stream
          // const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.streams[0] }
          const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.stream }

          // get currently selected video
          let selectedVideo = prevState.remoteStreams.filter(stream => stream.id === prevState.selectedVideo.id)
          // if the video is still in the list, then do nothing, otherwise set to new video stream
          selectedVideo = selectedVideo.length ? {} : { selectedVideo: remoteVideo }

          return {
            // selectedVideo: remoteVideo,
            ...selectedVideo,
            // remoteStream: e.streams[0],
            ...remoteStream,
            remoteStreams, //: [...prevState.remoteStreams, remoteVideo]
          }
        })
      }

      pc.close = () => {
        // alert('GONE')
      }

      if (this.state.localStream && this.mount) {
        pc.addStream(this.state.localStream)

      //   // this.state.localStream.getTracks().forEach(track => {
      //   //   pc.addTrack(track, this.state.localStream)
      //   // })
      }
      // return pc
      callback(pc)

    } catch(e) {
      console.log('Something went wrong! pc not created!!', e)
      // return;
      callback(null)
    }
  }

  componentDidMount = () => {this.joinRoom()
  }

  convertTime = (val) => {
    const date = new Date(val)
    const hours = date.getHours();
    const minutes = this.leadingzero(date.getMinutes());
    return hours+':'+minutes 
  }

  leadingzero(num) {
    var s = num+"";
    while (s.length < 2) s = "0" + s;
    return s;
  }

  sendMissedCall = async () => {
    if(!this.state.connected && !this.props.route.params.isGroup){
      const data = {
        message : 'Missed call at ' + this.convertTime(new Date().getTime()),
        sender : await AsyncStorage.getItem('username'),
        receiver : this.props.route.params.receiver,
        timestamp : new Date().getTime(),
        realtime : this.convertTime(new Date().getTime()),
        isRead : false,
        token : this.props.route.params.token,
        isGroup : false,
        missed : true,
        image : 'none',
        call:false
      }
      await sendMessage(data,this.props.route.params.msgid)
    }
  }

  componentWillUnmount = () => { this.mount = false
    this.sendMissedCall()
    clearInterval(this.intervalId)
  }

  minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }


  joinRoom = async () => {
    this.mount = true
    if(this.mount){
      this.setState({
        connect: true,
        username : await AsyncStorage.getItem('username')
      })
    }

    const room = this.props.route.params.msgid || ''
    this.socket = io.connect(
      this.serviceIP,
      {
        path: '/io/webrtc',
        query: {
          room: `/${room}`, //'/',
        }
      }
    )

    this.socket.on('connection-success', data => {

      this.getLocalStream()
      console.log(data.success)
      const status = data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : this.state.status
      InCallManager.start({media: 'audio'});
      InCallManager.setSpeakerphoneOn(true)
      // InCallManager.startRingtone()
      this.setState({
        status,
        messages: data.messages,
        peerCount : data.peerCount,
        isSended : true
      })

      if(data.peerCount === 1 && this.state.isSended){
        InCallManager.startRingtone()
        const data = {
          message :'Has started a call',
          sender : this.state.username,
          receiver : this.props.route.params.receiver,
          timestamp : new Date().getTime(),
          realtime : this.convertTime(new Date().getTime()),
          isRead : false,
          token : this.props.route.params.token,
          isGroup : false,
          missed : true,
          image : 'none',
          call : true
        }
        sendMessage(data,this.props.route.params.msgid)
      }

    })

    this.socket.on('joined-peers', data => {
      console.log(data.peerCount)
      if(data.peerCount > 1){
        this.setState({
          connected : true
        })
      }
      this.setState({
        status: data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : 'Waiting for other peers to connect'
      })
      if(this.state.connected && data.peerCount > 1){
        InCallManager.stopRingtone()
        this.intervalId = setInterval(()=>{

          this.setState({
            second : this.state.second+1
          })
          if(this.state.second > 59){
            this.setState({
              second : 0,
              minute : this.state.minute+1
            })
          }
        },1000)
      }
    })

    this.socket.on('peer-disconnected', data => {
      console.log('peer-disconnected', data)

      const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== data.socketID)

      this.setState(prevState => {
        // check if disconnected peer is the selected video and if there still connected peers, then select the first
        const selectedVideo = prevState.selectedVideo.id === data.socketID && remoteStreams.length ? { selectedVideo: remoteStreams[0] } : null

        return {
          // remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
          remoteStreams,
          ...selectedVideo,
          status: data.peerCount > 1 ? `Total Connected Peers to room ${this.state.room}: ${data.peerCount}` : 'Waiting for other peers to connect'
        }
        }
      )
    })

    this.socket.on('online-peer', socketID => {
      debugger
      console.log('connected peers ...', socketID)

      // create and send offer to the peer (data.socketID)
      // 1. Create new pc
      this.createPeerConnection(socketID, pc => {
        // 2. Create Offer
        if (pc) {
      
          // Send Channel
          const handleSendChannelStatusChange = (event) => {
            console.log('send channel status: ' + this.state.sendChannels[0].readyState)
          }

          const sendChannel = pc.createDataChannel('sendChannel')
          sendChannel.onopen = handleSendChannelStatusChange
          sendChannel.onclose = handleSendChannelStatusChange
        
          this.setState(prevState => {
            return {
              sendChannels: [...prevState.sendChannels, sendChannel]
            }
          })

          // Receive Channels
          const handleReceiveMessage = (event) => {
            const message = JSON.parse(event.data)
            console.log(message)
            this.setState(prevState => {
              return {
                messages: [...prevState.messages, message]
              }
            })
          }

          const handleReceiveChannelStatusChange = (event) => {
            if (this.receiveChannel) {
              console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
            }
          }

          const receiveChannelCallback = (event) => {
            const receiveChannel = event.channel
            receiveChannel.onmessage = handleReceiveMessage
            receiveChannel.onopen = handleReceiveChannelStatusChange
            receiveChannel.onclose = handleReceiveChannelStatusChange
          }

          pc.ondatachannel = receiveChannelCallback


          pc.createOffer(this.state.sdpConstraints)
            .then(sdp => {
              pc.setLocalDescription(sdp)

              this.sendToPeer('offer', sdp, {
                local: this.socket.id,
                remote: socketID
              })
            })
        }
      })
    })

    this.socket.on('offer', data => {
      this.createPeerConnection(data.socketID, pc => {
        pc.addStream(this.state.localStream)

        // Send Channel
        const handleSendChannelStatusChange = (event) => {
          console.log('send channel status: ' + this.state.sendChannels[0].readyState)
        }

        const sendChannel = pc.createDataChannel('sendChannel')
        sendChannel.onopen = handleSendChannelStatusChange
        sendChannel.onclose = handleSendChannelStatusChange
        
        this.setState(prevState => {
          return {
            sendChannels: [...prevState.sendChannels, sendChannel]
          }
        })

        // Receive Channels
        const handleReceiveMessage = (event) => {
          const message = JSON.parse(event.data)
          console.log(message)
          this.setState(prevState => {
            return {
              messages: [...prevState.messages, message]
            }
          })
        }

        const handleReceiveChannelStatusChange = (event) => {
          if (this.receiveChannel) {
            console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
          }
        }

        const receiveChannelCallback = (event) => {
          const receiveChannel = event.channel
          receiveChannel.onmessage = handleReceiveMessage
          receiveChannel.onopen = handleReceiveChannelStatusChange
          receiveChannel.onclose = handleReceiveChannelStatusChange
        }

        pc.ondatachannel = receiveChannelCallback
debugger
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
          // 2. Create Answer
          pc.createAnswer(this.state.sdpConstraints)
            .then(sdp => {
              pc.setLocalDescription(sdp)

              this.sendToPeer('answer', sdp, {
                local: this.socket.id,
                remote: data.socketID
              })
            })
        })
      })
    })

    this.socket.on('answer', data => {
      // get remote's peerConnection
      const pc = this.state.peerConnections[data.socketID]
      // console.log(data.sdp)
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=>{})
    })

    this.socket.on('candidate', (data) => {
      // get remote's peerConnection
      const pc = this.state.peerConnections[data.socketID]

      if (pc)
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
    })
  }

  switchVideo = (_video) => {
    debugger
    // alert(_video)
    this.setState({
      selectedVideo: _video
    })
  }

  stopTracks = (stream) => {
    stream.getTracks().forEach(track => track.stop())
  }

  render() {
    const {
      localStream,
      remoteStreams,
      peerConnections,
      room,
      connect,
    } = this.state

    // debugger
    const remoteVideos = remoteStreams.map(rStream => {
      return (
      this.props.route.params.isGroup ?  <TouchableOpacity key={rStream.id} onPress={() => this.switchVideo(rStream)}>
          <View
            style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}>
            <Video

              mirror={true}
              style={{ ...styles.rtcViewRemote }}
              objectFit='contain'
              streamURL={rStream.stream}
              type='remote'
            />
          </View>
        </TouchableOpacity> : null
      )
    })

    const remoteVideo = this.state.selectedVideo ?
      (
        <Video

          mirror={true}
          style={{ width: dimensions.width, height: dimensions.height, }}
          objectFit='cover'
          streamURL={this.state.selectedVideo && this.state.selectedVideo.stream}
          type='remote'
        />
      ) :
      (
        <View style={{ padding: 15, }}>
          <Text style={{ fontSize:22, textAlign: 'center', color: 'white' }}>Waiting for the connection ...</Text>
        </View>
      )

    // if (!connect) 
        // <View style={{ flex: 1, }}>
        //   <StatusBar backgroundColor="blue" barStyle={'dark-content'}/>
        //   <View style={{
        //     ...styles.buttonsContainer,
        //     // backgroundColor: 'teal',
        //     paddingHorizontal: 15
        //   }}>
        //     <TextInput
        //       // editable
        //       maxLength={10}
        //       slectionColor={'green'}
        //       placeholderTextColor = "lightgrey"
        //       placeholder='e.g. room1'
        //       style={{
        //         width: 200,
        //         color: 'black',
        //         fontSize: 18,
        //         backgroundColor: 'white',
        //         borderColor: '#000000',
        //         borderWidth: 1,
        //         paddingHorizontal: 10,
        //       }}
        //       value={room}
        //       onChangeText={text => this.setState({room: text})}
        //     />
        //     <Button
        //       onPress={this.joinRoom}
        //       title="Join Room"
        //       color="black"
        //     />
        //   </View>
        // </View>

      const videoActionButtons = (
        <View style={{
          ...styles.buttonsContainer,
          justifyContent: 'space-between', alignItems: 'center',
          paddingHorizontal: 40,
          height:'auto'
        }}>
          <TouchableOpacity
          style={{backgroundColor:'#FFFFFF' , height:50, width:50, borderRadius:60 , justifyContent:'center',alignItems:'center'}}
            onPress={() => {
              debugger
              const videoTrack = localStream.getTracks().filter(track => track.kind === 'video')
              videoTrack[0].enabled = !videoTrack[0].enabled
              this.setState({
                camera: videoTrack[0].enabled
              })
            }}
            // title={`camera ${ this.state.camera && '(on)' || '(off)'}`}
            color={`${ this.state.camera && 'black' || 'red'}`}
          ><Icon name={this.state.camera ? 'camera' : 'camera-off'} size={25} color={'black'}/></TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor:'#FF0000' , height:50, width:50, borderRadius:60 , justifyContent:'center',alignItems:'center'}}
            onPress={() => {
              // disconnect socket
              this.socket.close()
              InCallManager.stopRingtone()
              // localStream.stop()
              this.stopTracks(localStream)

              // stop all remote audio & video tracks
              remoteStreams.forEach(rVideo => this.stopTracks(rVideo.stream))

              // stop all remote peerconnections
              peerConnections && Object.values(peerConnections).forEach(pc => pc.close())

              if(this.mount){
                this.setState({
                  peerConnections: {},
                  remoteStreams: [],
                  localStream: null,
                  remoteStream: null,
                  selectedVideo: null,
                })
              }
              this.props.navigation.goBack(null)
            }}
            // title='X DISCONNECT'
            color='red'
          ><Icon name="phone-hangup" size={25} color={'white'} /></TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor:'#FFFFFF' , height:50, width:50, borderRadius:60 , justifyContent:'center',alignItems:'center'}}
            onPress={() => {
              debugger
              const audioTrack = localStream.getTracks().filter(track => track.kind === 'audio')
              audioTrack[0].enabled = !audioTrack[0].enabled
              this.setState({
                mic: audioTrack[0].enabled
              })
            }}
            // title={`mic ${ this.state.mic && '(on)' || '(off)'}`}
            color={`${ this.state.mic && 'black' || 'red'}`}
          ><Icon name={this.state.mic ? 'microphone' : 'microphone-off'} size={25} color={'black'} /></TouchableOpacity>
        </View>
      )

      const videoActionButtons2 = (
        <View style={{
          ...styles.buttonsContainer,
          justifyContent: 'space-between', alignItems: 'center',
          paddingHorizontal: 40,
          height:'auto',
          marginTop:'10%',
        }}>
          <TouchableOpacity
            style={[styles.input,{backgroundColor:'#FFFFFF' , height:50, width:50, borderRadius:60 , justifyContent:'center',alignItems:'center'}]}
            onPress={() => {
              this.setState({
                speaker : !this.state.speaker
              })
              InCallManager.setSpeakerphoneOn(this.state.speaker)
            }}
            // title='X DISCONNECT'
          ><Icon name="volume-high" size={25} color={`${this.state.speaker ? 'green' : 'black' }`} /></TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor:'#FF0000' , height:50, width:50, borderRadius:60 , justifyContent:'center',alignItems:'center'}}
            onPress={() => {
              // disconnect socket
              this.socket.close()
              InCallManager.stopRingtone()
              // localStream.stop()
              this.stopTracks(localStream)

              // stop all remote audio & video tracks
              remoteStreams.forEach(rVideo => this.stopTracks(rVideo.stream))

              // stop all remote peerconnections
              peerConnections && Object.values(peerConnections).forEach(pc => pc.close())

              if(this.mount){
                this.setState({
                  peerConnections: {},
                  remoteStreams: [],
                  localStream: null,
                  remoteStream: null,
                  selectedVideo: null,
                })
              }
              this.props.navigation.goBack(null)
            }}
            // title='X DISCONNECT'
            color='red'
          ><Icon name="phone-hangup" size={25} color={'white'} /></TouchableOpacity>
          <TouchableOpacity
            style={[styles.input,{backgroundColor:'#FFFFFF' , height:50, width:50, borderRadius:60 , justifyContent:'center',alignItems:'center'}]}
            onPress={() => {
              debugger
              const audioTrack = localStream.getTracks().filter(track => track.kind === 'audio')
              audioTrack[0].enabled = !audioTrack[0].enabled
              this.setState({
                mic: audioTrack[0].enabled
              })
            }}
            // title={`mic ${ this.state.mic && '(on)' || '(off)'}`}
            color={`${ this.state.mic && 'black' || 'red'}`}
          ><Icon name={this.state.mic ? 'microphone' : 'microphone-off'} size={25} color={'black'} /></TouchableOpacity>
        </View>
      )

    return (

      <View style={{ flex: 1,backgroundColor:'black' }}>
        {/* <StatusBar backgroundColor="transparent" barStyle={'dark-content'}/> */}

        {
          this.props.route.params.videoCall ? (
            <View style={{ ...styles.videosContainer, }}>
            <View style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 10,
              left: 10,
              width: 100,
              // height: 150,
              backgroundColor: 'black', //width: '100%', height: '100%'
            }}>
                <View style={{flex: 1 }}>
                  <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()}>
                    <View>
                      {
                        this.state.camera ? (
                          <Video
  
                          zOrder={1}
                          objectFit='cover'
                          style={{ ...styles.rtcView }}
                          streamURL={localStream}
                          type='local'
                        />
                        ) : null
                      }
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
              <View
                onPress={() => alert('hello')}
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                { remoteVideo }
              </View>
            <ScrollView horizontal={true} style={{ ...styles.scrollView }}>
              { remoteVideos }
            </ScrollView>
            
            </View>
          ) : (
            <View style={{flex:1}}>
                <View style={{flex:1 , backgroundColor:'gray'}}>
                    {
                      this.props.route.params.profileImg !== 'null' ? (
                        <Image source={this.props.route.params.profileImg} style={{flex:1}} />
                      ) : null
                    }
                  
                </View>
                <View style={{flex:1 , backgroundColor:'#FFFFFF'}}>
                    <View style={{flex: 1,justifyContent:'center' , alignItems:'center'}}>
                        <Text>Leonard</Text>
                        {
                          this.state.connected ? (
                            <Text>{
                              this.state.minute
                            } : {this.state.second < 10 ? '0' + this.state.second : '' + this.state.second}
                            </Text>
                          ) : (
                            <Text>Connecting...</Text>
                          )
                        }  
                    </View>
                    <View style={{flex: 1}}>
                    { videoActionButtons2 }
                    </View>
                   
                </View>
            </View>
          )
        }
          { this.props.route.params.videoCall ? videoActionButtons : null }
        </View>
      );
  }
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    backgroundColor: "transparent",
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  textContent: {
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
  videosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rtcView: {
    width: 100, //dimensions.width,
    height: 150,//dimensions.height / 2,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  scrollView: {
    // flex: 1,
    // // flexDirection: 'row',
    // backgroundColor: 'black',
    // padding: 15,
    position: 'absolute',
    zIndex: 0,
    top: 10,
    right: 0,
    left: 0,
    // width: 100, height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  rtcViewRemote: {
    width: 110, //dimensions.width,
    height: 110, //dimensions.height / 2,
    // backgroundColor: 'black',
    borderRadius: 5,
  },
  input : {
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    backgroundColor: 'white',
    elevation:8,
},
});

export default App;