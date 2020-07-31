import React, { useState } from 'react';
import { View, Text,StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {  AirbnbRating } from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';
import { useTheme ,} from '@react-navigation/native';
import firebase from 'react-native-firebase'
const FeedbackScreenn = ({navigation}) => {
const [star, setStar] = useState(5);
const [feedback, setFeedback] = useState('');
const [sendfeedback, setSendfeedback] = useState(false); 

const commentshandler = (val) =>{
    console.log(val , 'cooments')
 setFeedback(val);
}

const ratinghandler = (rating) =>{
    console.log(rating, 'rating')
  setStar(rating);
}

const submitfeedback = () =>{
    setSendfeedback(true)   
 var Appratingid = firebase.database().ref().child('AppRating').push().key;    
 firebase.database().ref('AppRating/' + Appratingid).set({
     stars:star,
     feedback:feedback
 }, function(error) {
    if (error) {
        setSendfeedback(false);
        alert('Some Error')
    } else {
        setSendfeedback(true)
        setTimeout(() => {
            navigation.navigate('Home'); 
           }, 2000);
    }
  }) 
}
    const {colors} = useTheme();
    if(sendfeedback){
        return(
            <Animatable.View   animation="fadeInUpBig" style={styles.container}> 
               <AntDesign name ="heart" size={80} color={'red'} style={{marginTop:'10%'}} />
               <Text style={{fontSize:25, fontWeight:'bold', color:'red'}}>Thanks You</Text>
               <Text style={{fontSize:20, fontWeight:'bold', color:colors.text}}>We Appriate Your Feedback</Text>
               <Text style={{fontSize:12, fontWeight:'normal', color:colors.text}}>We Would Love To Hear More About Your Experience</Text>
               <Text></Text>
               <Text></Text>
                {/* <TouchableOpacity  style={styles.bottombutton} >
                    <Text style={{color:'white',textAlign:'center', fontSize:20, fontWeight:"bold", }}>Go Back</Text>
                </TouchableOpacity> */}
           
            </Animatable.View>
  
        )
    }
    
    return (
         <ScrollView>
          <Animatable.View   animation="fadeInUpBig" style={styles.container}> 
             <AntDesign name ="like1" size={80} color={'#009387'} />
             <Text style ={[styles.text,{color:colors.text}]}>
                How Likley would you recommend{'\n \n'} 
                <Text style={{color:'#009387',paddingVertical:100, fontSize:20, fontWeight:"bold", }}>E-Mechanic</Text>
               </Text>    
                <View style={{
                    flex:1, elevation:1,    
                    width:Dimensions.get('screen').width * .9, borderRadius:10, padding:10, }}>
                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Good", "Very Good",  "Amazing"]}
                    defaultRating={5}
                    size={30}
                    showRating={false}
                    onFinishRating={ratinghandler}
                    starContainerStyle={{paddingVertical:10}}                   
                />

                <View style={styles.tapview}>      
                
                <Text style={{textAlign:'center', color:colors.text, fontWeight:'bold'}}> Tap The Stars </Text> 
                </View>   
                </View>
 
                <TextInput
                    style={[styles.textinput, {color:colors.text}]}
                    placeholder={"Your Suggestions"}
                    placeholderTextColor={colors.text}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(text) => {commentshandler(text)}}
                /> 
                <TouchableOpacity  style={styles.bottombutton} onPress={() => submitfeedback()}>
                    <Text style={{color:'white',textAlign:'center', fontSize:20, fontWeight:"bold", }}>Next</Text>
                </TouchableOpacity>
                </Animatable.View>
                </ScrollView>
             
      );
};

export default FeedbackScreenn;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },

  text:{
      color:"black",  
      fontSize:15,
      margin:10,
      textAlign:'center'
  },
  tapview:{
      width:120, 
      height:40, 
      alignSelf:'center', 
      elevation:1, 
      borderRadius:10, 
      alignContent:'center', 
      justifyContent:'center',
  },
  bottombutton: {
    backgroundColor:'#009387', 
    borderRadius:10, 
    paddingTop:'2%',
    height:50, 
    width:Dimensions.get('screen').width * .9, 
    borderColor: '#009387',
    borderWidth: 2,
    },
    textinput:{
        margin:10,
        textAlign:'left',
        borderWidth:.41,
        borderRadius:10,
        borderBottomColor:'black',
        width:Dimensions.get('screen').width *.9
    }
});
