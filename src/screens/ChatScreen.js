import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Alert, PermissionsAndroid , Platform,View,StyleSheet, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat'
import { IconButton , TextInput} from 'react-native-paper';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AudioRecorder, AudioUtils } from "react-native-audio";
import Sound from "react-native-sound";
import AudioMessageBubble from '../Components/AudioMessage'
import firebase from 'react-native-firebase'
import {Context as AuthContext} from '../Context/AuthContext'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
const ChatScreen = ({navigation, route}) => {
  const {state:{profiledata, accounttype}} = useContext(AuthContext);
  
  const [sender, setSender] = useState({
    ...sender,
    _id: profiledata.uid,
    name:profiledata.name,
    avatar: `${profiledata.photoURl}`,
  })
  
  const [reciever, Setreciever] = useState({
    ...reciever,
    _id:'',
    name:'',
    avatar:''
  }) 
  
  const [messages, setMessages] = useState([]);
  
  const [startAudio, setStartaudio] = useState(false);
  
  const [audiopath, setAudiopath] = useState(`${AudioUtils.DocumentDirectoryPath}/${nanoid()}test.aac`); 
  
  const [audioSettings, setAudioSettings] = useState({
    SampleRate: 22050,
    Channels: 1,
    AudioQuality: "Low",
    AudioEncoding: "aac",
    MeteringEnabled: true,
    IncludeBase64: true,
    AudioEncodingBitRate: 32000
  })
  
  const [haspremission , serHaspremisson] = useState('undefine');
  const [fetchchats,  setFetchchats] = useState(false);

  const [audio, setAudio] = useState(false);
  const [playaudio,  setPlayaudio] = useState(false);
  const [recording, setRecording]= useState(false);
  const [stoppedRecording, setStoppedRecording] = useState(false);
  const [finished , setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
   
  
  useEffect(() => {   
    AudioRecorder.requestAuthorization().then((isAuthorized) => {
      serHaspremisson(isAuthorized);
      if(!isAuthorized)
        return;
      AudioRecorder.prepareRecordingAtPath(audiopath,audioSettings);
       var id = ""
       if(accounttype === "Mechanic")
       {
         id = route.params.data.userid;
       }else if(accounttype === "Customer"){
         id = route.params.data.mechanicid;
       }
      firebase.database().ref('users/' +id).once('value', profiledata =>{ 
        let pd = profiledata.toJSON()     
        Setreciever({
          ...reciever,
          _id: pd.uid,
          name:pd.name,
          avatar: `${pd.photoURl}`,
        })
      })      
    });

    firebase.database().ref('Notification/'+route.params.data.notificationid+ '/chat').on('value', snapshot => {
      if(!snapshot.val()){
        setFetchchats(true);
        return;
      }
//      console.log(snapshot, 'sssssss')
      var message = [];
      snapshot.forEach((child) => {      
        message.push({ 
          _id: child.key,
          createdAt: child.val().createdAt,
          messageType: child.val().messageType,
          audio: child.val().audio,
          text: child.val().text,
          user:{
            _id:child.val().user._id,
            name:child.val().user.name,
            avatar:child.val().user.avatar,
          }
        });
     });
   setMessages(message.reverse()) 
    }) 
  
  }, [])
   
  
 
const  onSend = (messages = []) => {
    messages[0].messageType = "message";
    if(messages[0].text === ''){
      return ;
    }
    firebase.database().ref('Notification/'+route.params.data.notificationid+ '/chat/').push(messages[0])
}
  
const renderBubble = (props)=>{
  const {audio, text, _id}= props.currentMessage;
  console.log(audio, 'audio')
  return (
   <View>
       {text===''?<AudioMessageBubble uri={audio} id={_id}/>:null} 
      <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#009387'
        },
        left:{
          backgroundcolor:'rgba(0,0,0,.1)'
        }
      }}
    />
  </View>  
  );
}


const handleAudio = async () => {
    if(recording){
      console.warn("Already Recording");
      return;
    }
    if(!haspremission){
      console.warn('Can\'t record, no permission granted!');
        return;
    }

    setRecording(true)
    setPaused(false);
     try {
      AudioRecorder.prepareRecordingAtPath(audiopath,audioSettings);    
      const filePath = await AudioRecorder.startRecording();
     } catch(error){
     console.error(error)
   } 
};
  
  
 const stoppedRecordingfunction = () =>{
  setRecording(false);
  setStoppedRecording(true);
  AudioRecorder.stopRecording().then((filePath) => {
    console.log('stoop recording')
    const filename = `${nanoid()}.acc`;
    firebase.storage().ref(`Audiochat/${filename}`)
      .putFile(filePath)
      .then(
        snapshot => {
               console.log(snapshot, 'snnnnnaaaappppppp')
//            let   progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100  
  //            console.log(progress , 'progress');
             if (firebase.storage.TaskState.SUCCESS) {
//               console.log('upoaded complete', snapshot.downloadURL);
              }
              const message = {};
              message._id = nanoid();
               message.createdAt = Date.now();
               message.user = {
                  _id:sender._id,
                  name:sender.name,
                  avatar:sender.avatar
               };
               message.text = "";
               message.audio = snapshot.downloadURL;
               message.messageType = "audio";
       //       console.log(message , 'message ...............') 
    //           console.log('sending audio ############################################')
               if(snapshot.downloadURL !== null){
                 
                 firebase.database().ref('Notification/'+route.params.data.notificationid+ '/chat/').push(message)
               }
            },
        error => {
        ///  console.log('error', error)
        }
      );  
  
  }); 
 } 
 
//  const stoppedRecordingfunction = () =>{
//   setRecording(false);
//   setStoppedRecording(true);
//   AudioRecorder.stopRecording().then((filePath) => {
//     console.log('stoop recording')
//     const filename = `${nanoid()}.acc`;
//     firebase.storage().ref(`Audiochat/${filename}`)
//       .putFile(filePath)
//       .on(
//         firebase.storage.TaskEvent.STATE_CHANGED,
//         snapshot => {
//                console.log(snapshot, 'snnnnnaaaappppppp')
//             let   progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100  
//   //            console.log(progress , 'progress');
//              if (firebase.storage.TaskState.SUCCESS) {
// //               console.log('upoaded complete', snapshot.downloadURL);
//               }
//               const message = {};
//               message._id = nanoid();
//                message.createdAt = Date.now();
//                message.user = {
//                   _id:sender._id,
//                   name:sender.name,
//                   avatar:sender.avatar
//                };
//                message.text = "";
//                message.audio = snapshot.downloadURL;
//                message.messageType = "audio";
//        //       console.log(message , 'message ...............') 
//     //           console.log('sending audio ############################################')
//                if(progress === 100 && snapshot.downloadURL !== null){
                 
//                  firebase.database().ref('Notification/'+route.params.data.notificationid+ '/chat/').push(message)
//                }
//             },
//         error => {
//         ///  console.log('error', error)
//         }
//       );  
  
//   }); 
//  } 
 
const  renderSend = (props) => {
  if(props.text.trim().length === 0){
  return (
    <Send {...props}>
      <TouchableOpacity style={styles.sendingContainer} 
       onPressIn={handleAudio}
       onPressOut={stoppedRecordingfunction}
      >
        <IconButton icon='microphone' size={36} color='#009387' />
      </TouchableOpacity>
    </Send>
  );
}
else{
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send' size={36} color='#009387' />
        </View>
      </Send>
    );
  }
}

const scrollToBottomComponent = () => {
  return (
    <View style={styles.bottomComponentContainer}>
      <IconButton icon='chevron-double-down' size={36} color='#009387' />
    </View>
  );
}
  return (
    <GiftedChat
      messages={messages}
      onSend = {onSend}
      user={sender}
      renderBubble={renderBubble}
      placeholder='Type message or Tap To record'
      showUserAvatar
      showAvatarForEveryMessage
      alwaysShowSend
      isAnimated
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      minComposerHeight={55}
    />
  )
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  view: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor:'rgba(0,0,0,.2)',
    borderRadius:30,
    bottom:1,
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});
