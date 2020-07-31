import React, { useEffect, useContext, useState } from 'react';
import { View,  Text, StatusBar,ScrollView, FlatList} from 'react-native';
import firebase from 'react-native-firebase'
import Notification from '../Components/Notification'
import { Circle } from 'react-native-animated-spinkit';
import {Context as AuthContext} from '../Context/AuthContext'
const NotificationScreen = ({navigation}) => {
 const {state:{accounttype}} = useContext(AuthContext)
  const [loading , setLoading] = useState(true);
  const [Notifications, setNotification] =useState([]);
  useEffect(() =>{
      const unsubscribe = navigation.addListener('focus', () => {
        getnotificationdata();
    });
    return unsubscribe; 
  
  }, [navigation]);  

  const getnotificationdata = () =>{
    var query = ""
    const user =  firebase.auth().currentUser ;
    if(accounttype === "Mechanic"){
         query = firebase.database().ref('Notification').orderByChild('Mechanic_Id')
    }else if(accounttype === "Customer"){
         query = firebase.database().ref('Notification').orderByChild('userid')
    }
    query.equalTo(user.uid)
    .on('value' )
    .then(snapshot => {
      var items = [];
       snapshot.forEach((child) => {
         items.push({
            id: child.key,
            problemDescription: child.val().ProblemDescription,
            problemTitle: child.val().ProblemTitle,
            problemStatus: child.val().Problemstatus,
            Mechanic_Id:child.val().Mechanic_Id,
            Problem_Id:child.val().Problem_Id,
            userid:child.val().userid,
            timeanddate: child.val().timeanddate,
         });
      });
      setLoading(false);
      setNotification(items);
     // console.log(items, 'all notifcations data');
    })
  }

  const getupdateofnotification = () =>{
    var query = ""
    const user =  firebase.auth().currentUser ;
    if(accounttype === "Mechanic"){
         query = firebase.database().ref('Notification').orderByChild('Mechanic_Id')
    }else if(accounttype === "Customer"){
         query = firebase.database().ref('Notification').orderByChild('userid')
    }
    query.equalTo(user.uid)
    .on('child_changed',snapshot => {
      var items = [];
       snapshot.forEach((child) => {
         items.push({
            id: child.key,
            problemDescription: child.val().ProblemDescription,
            problemTitle: child.val().ProblemTitle,
            problemStatus: child.val().Problemstatus,
            Mechanic_Id:child.val().Mechanic_Id,
            Problem_Id:child.val().Problem_Id,
            userid:child.val().userid,
            timeanddate: child.val().timeanddate,
         });
      });
      setLoading(false);
      setNotification(items);
     // console.log(items, 'all notifcations data');
    })
  }
  if(loading){
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Circle color="#009783" size={32}/>
      </View>
    )
  }

  return (
      <View style={{marginTop:0,}}>
        <StatusBar  backgroundColor="#009387" barStyle="dark-content"/>
        <FlatList 
            data={Notifications}
            refreshing={loading}
            onRefresh={() =>getupdateofnotification()}
            keyExtractor={(item) =>{
                return item.id
            }}
            renderItem={({item}) =>{
                return(
                  <Notification 
                  accounttype={accounttype}
                  Notification_Id={item.id}
                  Mechanic_Id={item.Mechanic_Id}
                  userid={item.userid}
                  Problem_Id={item.Problem_Id}
                  title = {item.problemTitle}
                  description = {item.problemDescription}
                  status = {item.problemStatus}
                  timeanddate = {new Date(item.timeanddate)}
                  />
                )
            }}
           /> 
      </View>
    );
};

export default NotificationScreen;
