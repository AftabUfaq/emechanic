import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Alert, PermissionsAndroid , Platform,View,StyleSheet, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat'
import { IconButton , TextInput} from 'react-native-paper';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AudioRecorder, AudioUtils } from "react-native-audio";
import Sound from "react-native-sound";
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
  const [audioSettings, setAudioSettings] = useState({
    SampleRate: 22050,
    Channels: 1,
    AudioQuality: "Low",
    AudioEncoding: "aac",
    MeteringEnabled: true,
    IncludeBase64: true,
    AudioEncodingBitRate: 32000
  })

  const [audio, setAudio] = useState(false);
  const [startAudio, setStartaudio] = useState(false);
  const [playaudio,  setPlayaudio] = useState(false);
  const [audiopath, setAudiopath] = useState(AudioUtils.DocumentDirectoryPath +'/test.aac'); 
  const [haspremission , serHaspremisson] = useState('undefine');
  const [recording, setRecording]= useState(false);
  const [stoppedRecording, setStoppedRecording] = useState(false);
  const [finished , setFinished] = useState(false);
  const [paused, setPaused] = useState(false);

  const  messageIdGenerator = () =>{
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
   }
  
 const renderAudio = props => {
  return !props.currentMessage.audio ? (
        <View 
        />
    ) : (
            <FontAwesome
                name={playaudio?"stop-circle":'play'}
                size={35}
                color={playaudio ? "white" : "rgba(0,0,0,.8)"}
                style={{
                    left:90,
                    flex:1,
                    borderRadius:30,
                    marginTop:3,
                    paddingLeft:10,
                    position:'relative',
                    shadowColor: "black",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.5,
                    backgroundColor:"#009387"
                }}
                onPress={() => {
                  setPlayaudio(true);
                    const sound = new Sound(props.currentMessage.audio, "", error => {
                        if (error) {
                            console.log("failed to load the sound", error);
                        }
                        
                    
                        sound.play(success => {
                            console.log(success, "success play");
                            setPlayaudio(false);
                            if (!success) {
                                Alert.alert("There was an error playing this audio");
                            }
                        });
                    });
                }}
            />
        );
};

const renderBubble = (props)=>{
  return (
   <View style= {{flexDirection:'row', alignItems:'flex-end', position:'relative'}}>
       {renderAudio(props)}
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#009387'
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
//     console.log(filePath, 'file path')
  //  const filename = `${v4()}.acc`;
    const filename = `${nanoid()}.acc`;
    // const file = {
    //           uri: Platform.OS === "ios" ? audiopath : `${filePath}`,
    //           name: filename,
    //           type: `audio/aac`
    //   }
 //  console.log(file, 'file')

  firebase.storage().ref(`Audiochat/${filename}`)
      .putFile(filePath)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
            let   progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100  
                 console.log(progress , 'progress');
            //        dispatch({type:"IMAGE_UPLOADPROGRESS", payload:progress})
             if (firebase.storage.TaskState.SUCCESS) {
               console.log('upoadedd', snapshot.downloadURL);
       //         dispatch({type:"SETIMAGEURI", payload:snapshot.downloadURL})
              }
              const message = {};
              message._id = nanoid();
               message.createdAt = Date.now();
               message.user = {
                   sender
               };
               message.text = "";
               message.audio = snapshot.downloadURL;
               message.messageType = "audio"; 
            send(message);   
            },
        error => {
          console.log('error', error)
          // dispatch({type:"ADD_ERROR", payload:error.message})
        }
      );  
  
  }); 
 } 
 useEffect(() => {   
  console.log(audiopath)
  AudioRecorder.requestAuthorization().then((isAuthorized) => {
    serHaspremisson(isAuthorized);
    if(!isAuthorized)
      return;
    AudioRecorder.prepareRecordingAtPath(audiopath,audioSettings);
     var id = ""
     if(accounttype === "Mechanic")
     {
       id= route.params.data.userid;
     }else if(accounttype === "Customer"){
      id= route.params.data.mechanicid;
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

  get(messages => 
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  )
}, [])

const get  = callback =>{
  firebase.database().ref('Notification/'+route.params.data.notificationid+ '/chat/').on('child_added', snapshot => callback(parse(snapshot))) 

}
const   parse = message => {
  const {user,text, timestamp} = message.val();
  const {key: _id} = message;
  const createdAt = new Date(timestamp);
  return{
      _id, createdAt,text,user
  };
};

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

  const  send = messages =>{
    messages.forEach(item => {
       const message = {
           text:item.text,
           timestamp: firebase.database.ServerValue.TIMESTAMP,
           user:item.user
       }     
    firebase.database().ref('Notification/'+route.params.data.notificationid+ '/chat/').push(message);              
    });
};
  return (
    <GiftedChat
      messages={messages}
      onSend = {send}
      user={sender}
      messageIdGenerator={messageIdGenerator}
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
