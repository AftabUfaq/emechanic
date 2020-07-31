import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, Modal,TextInput, StyleSheet,} from 'react-native';
import {Text, Button} from 'react-native-paper' 
import { useTheme,  useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase'
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {  AirbnbRating } from 'react-native-ratings';
const Notifcation = (props) => {
  const navigation = useNavigation();
  const data = {
    notificationid:props.Notification_Id, 
    userid:props.userid, 
    mechanicid:props.Mechanic_Id,
    desc:props.description,
    accounttype:props.accountype
  }

const [reportmodal , setReportmodal] = useState(false);
const [ratemodal, setRatemodal] = useState(false);
const [star, setStar] = useState(5);
const [feedback, setFeedback] = useState('He is Good In Doing His Job');


const commentshandler = (val) =>{
  setFeedback(val);
}

const ratinghandler = (rating) =>{
  setStar(rating);
}



const customerrateproblem = (id) =>{
 let rating = {
   stars:star,
   feedback:feedback
 }
 firebase.database().ref('Notification/'+data.notificationid).update({
  customerstatus:'rated',
  problemstatus:'rated'
})
 firebase.database().ref('users/'+id +"/Rating").push(rating);
}


const customerreportproblem = () =>{

}

const mechanicrateproblem = (id) =>{
  let rating = {
    stars:star,
    feedback:feedback
  }
  firebase.database().ref('Notification/'+data.notificationid).update({
   mechanicstatus:'rated',
   problemstatus:'rated'
 })
  firebase.database().ref('users/'+id +"/Rating").push(rating);
 }

  const  renderdate = (dateandtime) => {
    const d = new Date(dateandtime);
    const z = n => n.toString().length == 1 ? `0${n}` : n // Zero pad
    return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`
  }
  const returntime = (dateandtime) =>{
    const d = new Date(dateandtime);
    const z = n => n.toString().length == 1 ? `0${n}` : n // Zero pad
   return `${z(d.getHours())}:${z(d.getMinutes())}`
  }

  const acceptproblem = (id) =>{
    firebase.database().ref('Problems/'+props.Problem_Id).update({
      problemstatus="assigned"
    })

    firebase.database().ref('Notification/'+id).update({
       customerstatus:'accepted',
       mechanicstatus:'accepted',
       problemstatus:'accepted'
     })
  }

const  customercompleteproblem = (id) =>{
    firebase.database().ref('Notification/'+id).update({
      customerstatus:'completed',
      problemstatus:'completed'
    })
  } 

  const  mechaniccompleteproblem = (id) =>{
    firebase.database().ref('Notification/'+id).update({
      mechanicstatus:'completed',
      problemstatus:'completed'
    })
  }   


  
const naivgatetochtscreen = () => {
   if(props.status==='accepted'){ 
    navigation.navigate('ChatScreen', {data})
   }  
} 

  const { colors } = useTheme();
  const text = colors.placeholdertextcolor ;
    return (
      <TouchableOpacity style={styles.container}
       onPress={() => naivgatetochtscreen()}
      >
         <View style={{flexDirection:"row"}}>
          <Icon name="ios-notifications" color={'#009387'} size={32} style ={{alignSelf:'center'}} /> 
           <View style={{flexDirection:'column', marginHorizontal:10}}>
              <Text style={[styles.problemtitle, {color:colors.text,  backgroundColor:colors.background}]}>{props.title}</Text>
                <Text   
                    ellipsizeMode="tail"
                    numberOfLines={3} 
                    style={[styles.problemDesccription, {color:colors.text,  backgroundColor:colors.background , width:Dimensions.get("screen").width * 80/100,}]}>
                    {props.description}</Text>

                <View style={{flexDirection:'row', justifyContent:'flex-start',width:Dimensions.get("screen").width * 90/100,}}>
                  <Text style={[styles.date,{color:colors.text,  backgroundColor:colors.background}]}>{renderdate(props.timeanddate)}</Text>  
                  <Text style={[styles.time, {color:colors.text, marginLeft:'5%',  backgroundColor:colors.background}]}>{returntime(props.timeanddate)}</Text>
                
                  {props.accounttype === "Mechanic"? 
                  
                  
                   props.mechanicstatus === 'unread'?
                   <Button 
                   style={{height:22,width:100, marginTop:5,  paddingVertical:5, alignSelf:'baseline',marginLeft:'15%', backgroundColor:"green"}}  
                   contentStyle={{height:'100%'}} mode="contained" 
                   uppercase={false}
                   onPress={() => acceptproblem(props.Notification_Id)}>Accept</Button>
                   :
                   props.mechanicstatus==='accepted'?
                   <TouchableOpacity
                   style={{height:30,width:150, borderRadius:5, marginTop:5,  paddingVertical:5, alignSelf:'auto',marginLeft:'15%', backgroundColor:colors.background}}  
                   onPress={() => mechaniccompleteproblem(props.Notification_Id)}>
                     <Text style={{textAlign:"center",  fontWeight:'bold', color:colors.text}}>Mark as completed</Text></TouchableOpacity>:
                     <View>
                       <TouchableOpacity
                        style={{height:30,width:80, borderRadius:5, marginTop:5,  paddingVertical:5, alignSelf:'auto',marginLeft:'15%', backgroundColor:'red'}}  
                        onPress={() => mechanicreportproblem(props.Notification_Id)}>
                     <Text style={{textAlign:"center",  fontWeight:'bold', color:colors.text}}>Report</Text></TouchableOpacity>
                     <TouchableOpacity
                        style={{height:30,width:80, borderRadius:5, marginTop:5,  paddingVertical:5, alignSelf:'stretch',marginLeft:'15%', backgroundColor:'green'}}  
                        onPress={() => mechanicrateproblem(props.Notification_Id)}>
                     <Text style={{textAlign:"center",  fontWeight:'bold', color:colors.text}}>Rate</Text></TouchableOpacity>
                     </View>                   
                   :    // cusotmer  
                   props.customerstatus === 'unread'?
                   <Button 
                   style={{height:22,width:100, marginTop:5,  paddingVertical:5, alignSelf:'baseline',marginLeft:'15%', backgroundColor:"green"}}  
                   contentStyle={{height:'100%'}} mode="contained" 
                   uppercase={false}
                   >unread</Button>
                   :
                   props.customerstatus==='accepted'?
                   <TouchableOpacity
                   onPress={() => customercompleteproblem(props.Notification_Id)}
                   style={{height:30,width:150, borderRadius:5, marginTop:5,  paddingVertical:5, alignSelf:'auto',marginLeft:'15%', backgroundColor:colors.background}}  
                   >
                     <Text style={{textAlign:"center",  fontWeight:'bold', color:colors.text}}>Mark as completed</Text></TouchableOpacity>:
                     props.status ==="completed"?
                     <View>
                       <TouchableOpacity
                        style={{height:30,width:80, borderRadius:5, marginTop:5,  paddingVertical:5, alignSelf:'auto',marginLeft:'15%', backgroundColor:'red'}}  
                        >
                     <Text style={{textAlign:"center",  fontWeight:'bold', color:colors.text}}>Report</Text></TouchableOpacity>
                     <TouchableOpacity
                         onPress = {() => setRatemodal(!ratemodal)}
                        style={{height:30,width:80, borderRadius:5, marginTop:5,  paddingVertical:5, alignSelf:'stretch',marginLeft:'15%', backgroundColor:'green'}}  
                        >
                     <Text style={{textAlign:"center",  fontWeight:'bold', color:colors.text}}>Rate</Text></TouchableOpacity>
                     </View>:
                     props.customerstatus ==='rated'?
                     <TouchableOpacity             
                       style={{height:30,width:80, borderRadius:5, marginTop:5,  paddingVertical:5, alignSelf:'stretch',marginLeft:'15%', backgroundColor:'green'}}  
                       >
                     <Text style={{textAlign:"center",  fontWeight:'bold', color:colors.text}}>Rated </Text></TouchableOpacity>
                     :  <TouchableOpacity
                     style={{height:30,width:80, borderRadius:5, marginTop:5,  paddingVertical:5, alignSelf:'auto',marginLeft:'15%', backgroundColor:'red'}}  
                     >
                    <Text style={{textAlign:"center",  fontWeight:'bold', color:colors.text}}>Reportd</Text></TouchableOpacity>
                        
                   }
                </View>
           </View>  
         </View> 
       <Modal
         animation="zoomInUp"
         direction="alternate"
         animationType="slide"
         transparent={true}
         visible={ratemodal}
         onRequestClose={()=>{setRatemodal(false)}}
       >
        <View style={[styles.modal ,{backgroundColor:colors.background}]} >
        <Animatable.View   animation="fadeInUpBig" style={styles.container1}> 
             <Text style ={[styles.text,{color:colors.text}]}>
                <Text style={{color:'#009387',paddingVertical:100, fontSize:20, fontWeight:"bold", }}>Enjoying Serivce?{ '\n \n'} </Text>
               Tap a star to Rate Mechanic
               </Text>    
                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Good", "Very Good",  "Amazing"]}
                    defaultRating={5}
                    size={30}
                    showRating={false}
                     onFinishRating={ratinghandler}
                />
                <TextInput
                    style={[styles.textinput, {color:colors.text}]}
                    placeholder={'Describe your Experience'}
                    placeholderTextColor={colors.text}
                    multiline={true}
                   // numberOfLines={}
                     onChangeText={(text) => {commentshandler(text)}}
                /> 
                <View
                 style={{flexDirection:"row" , justifyContent:'space-between'}}
                  > 
                <TouchableOpacity  style={styles.bottombuttonleft} 
                 onPress={() => setRatemodal(false)}
                >
                    <Text style={{color:'white',textAlign:'center', fontSize:20, fontWeight:"bold", }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.bottombuttonright} 
                 onPress ={() => customerrateproblem(data.mechanicid)}
                >
                    <Text style={{color:'white',textAlign:'center', fontSize:20, fontWeight:"bold", }}>Submit</Text>
                </TouchableOpacity>
                </View> 
                </Animatable.View>
        </View>  
       </Modal>
      </TouchableOpacity>
    );
};

export default Notifcation;
const styles = StyleSheet.create({
  container: {
    borderBottomColor:'#009783',
    borderBottomWidth:0,
    borderRadius:10,
    paddingTop:2,
    minHeight:70,
    width:'100%',
    backgroundColor:'rgba(0, 151, 131,.2)',
    paddingLeft:'2.5%',
    margin:.5,
    paddingTop:'1.5%',
    paddingVertical:'2.8%'
  },
  problemtitle:{
      backgroundColor:'black',
      fontSize:16,
      justifyContent:'flex-start',
      alignContent:'flex-start',
      alignSelf:'flex-start',
      paddingHorizontal:20,
      borderRadius:5,
  },
  modal:{
    width:'90%', 
    borderRadius:10, 
    height:250, 
    alignContent:'center', 
    alignItems:'center', 
    alignSelf:"center", 
    justifyContent:'center', 
    marginTop:"45%", 
    backgroundColor:'green'},
  date:{
      textAlign:'right',
      paddingVertical:5,
      paddingLeft:5,
      justifyContent:'flex-start',
      alignContent:'flex-start',
      alignSelf:'flex-start',
      paddingHorizontal:20,
      borderRadius:5,
      marginTop:5,
  },
  time:{
    textAlign:'left',
    paddingLeft:10,
    paddingVertical:5,
    textAlign:'right',
      paddingVertical:5,
      paddingLeft:5,
      justifyContent:'flex-start',
      alignContent:'flex-start',
      alignSelf:'flex-start',
      paddingHorizontal:20,
      borderRadius:5,
      marginTop:5,
  },
  problemDesccription:{ 
      width:Dimensions.get("screen").width - 40,
      marginTop:5,
      fontSize:16,
      justifyContent:'flex-start',
      alignContent:'flex-start',
      alignSelf:'flex-start',
      paddingHorizontal:20,
      borderRadius:5,

    },
    container1: {
      flex: 1, 
      alignItems: 'center', 
    },  
    text:{
        color:"black",  
        fontSize:15,
        margin:10,
        textAlign:'center'
    },

    bottombuttonleft: {
      backgroundColor:'#009387', 
      paddingTop:'2%',
      height:50, 
      width:Dimensions.get('screen').width * .45, 
      borderColor: 'black',
      borderTopWidth:.8,
      borderRightWidth: .8,
      borderBottomLeftRadius:10,
      },
      bottombuttonright: {
        borderTopWidth:.8,
        backgroundColor:'#009387',
        paddingTop:'2%',
        height:50, 
        width:Dimensions.get('screen').width * .45, 
        borderColor: 'black',
        borderWidth: 0,
        borderBottomRightRadius:10,
        },
    
      textinput:{
          margin:10,
          textAlign:'left',
          borderWidth:.41,
          borderRadius:10,
          borderBottomColor:'black',
          width:Dimensions.get('screen').width *.88
      }

});
