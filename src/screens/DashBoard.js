import React,{useContext, useEffect} from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import styles from './Styles/Styles'
import MenuItem from '../Components/MeunItem'
import {Context as AuthContext} from '../Context/AuthContext'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import PushNotification from 'react-native-push-notification';
import * as geolib from 'geolib';
const HomeScreen = () => {
 const {state} = useContext(AuthContext);
 useEffect(() =>{
   if(state.accounttype === "Mechanic"){
  let startat =  firebase.database().ref('Problems').push().key;
  firebase.database().ref('Problems').orderByKey().startAt(startat).on('child_added', snapshot =>{
  console.log(AsyncStorage.getItem('@accounttype'))
    let pid = snapshot.key; 
    let plocation = snapshot.val();
    let user =  firebase.auth().currentUser
    console.log('user id', plocation.userid ,  'Mechanic id' , user.uid)
    firebase.database().ref('locations/' + user.uid).on('value', snapshot =>{
       let mloc = snapshot.val();
       if(pid && plocation !=='' && mloc !== ''){
         //////////////////////////////////////
         let r = geolib.isPointWithinRadius({
          latitude:mloc.position.coords.latitude, 
          longitude:mloc.position.coords.longitude
        },
        { 
          latitude:plocation.location.latitude, 
          longitude:plocation.location.longitude
        },995000);  
       let noti = {
        /* Android Only Properties */
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: "A Customer Has posted a Problem", // (optional) default: "message" prop
        color: "green", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: "group", // (optional) add group to message
        ongoing: false, // (optional) set whether this is an "ongoing" notification
 
        /* iOS and Android properties */
        title:plocation.problemTitle, // (optional)
        message: plocation.problemDescription, // (required)
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
      }
        if(r){
          PushNotification.localNotification(noti)
          var newnotificationkey = firebase.database().ref().child('Notification').push().key;
          firebase.database().ref('Notification/' + newnotificationkey).set({
           Mechanic_Id:user.uid,
           Problem_Id:pid,
           userid:plocation.userid,
           timeanddate:new Date(),
           mechanicstatus:'unread',
           customerstatus:'unread',
           ProblemDescription:plocation.problemDescription,
           ProblemTitle:plocation.problemTitle,
           problemstatus:plocation.problemstatus,
           });
        }
         //////////////////////////////////////
       }             
   }); 
});   
}
},[])

 const theme = useTheme();
  if(state.accounttype === "Customer"){
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
       
        <ScrollView> 
          <View style={styles.mainView}>  
           <MenuItem 
             name = "Add Problem"
             icon = "add"
             route = "AddProblemScreen"
           />

           <MenuItem 
             name = "Problems List"
             icon = "playlist-add"
             route = "ShowProblemsScreen"
           />
          </View>

          <View style={styles.mainView}>  
           <MenuItem 
             name = "Book Mechanic"
             icon = "playlist-add"
             route = "BookMechanicScreen"
           />

           <MenuItem 
             name = "Bookings List"
             icon = "playlist-add"
             route = "ShowAllBookings"
           />
          </View>

      </ScrollView>
      </View>
    )}
    else if(state.accounttype === 'Mechanic'){
      return(
        <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
       
        <ScrollView> 
          <View style={styles.mainView}>  
           <MenuItem 
             name = "Add Service"
             icon = "add"
             route = "AddServiceScreen"
           />

           <MenuItem 
             name = "Services List"
             icon = "playlist-add"
             route = "ShowAllServiceScreen"
           />
          </View>

          <View style={styles.mainView}>  
           <MenuItem 
             name = "Bookings"
             icon = "list"
             route = "ShowAllBookings"
           />

           <MenuItem 
             name = "Comming Soon"
             icon = "playlist-add"
             route = ""
           />
          </View>


      </ScrollView>
      </View>

      )
    }
};

export default HomeScreen;