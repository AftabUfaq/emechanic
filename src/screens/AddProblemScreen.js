import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from  'react-native-maps';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import  styles  from  './Styles/authstyles';
import { useTheme } from 'react-native-paper';
import MyTextInput from '../Components/TextInput';
import { CircleFade } from 'react-native-animated-spinkit';
import {Context as ProblemContext} from '../Context/ProblemContext'
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from "react-native-vector-icons/Ionicons";
const ProfileScreen = ({navigation}) => {
const {state, addproblem, fetchservices} = useContext(ProblemContext);
useEffect(() => {
  if(navigation.isFocused()){
    fetchservices();
  }
},[]) 
console.log(state);
const [problemdata,  setproblemData] = useState({
      problemtitle:"",
      isvalidProblemTitle:true,
      proplemtitlerrormessage:"",
      problemdescription:'',
      isValidProblemDescription:true,
      problemdescriptionerrormessage:'',
      location:{
        latitude:'',
        longitude:''
      },
      loading:false
     });

  const { colors } = useTheme();   

  const namehandler = () =>{

  }
  const sumbitProblem = () =>{

    setTimeout(() => {
    setproblemData({
      ...problemdata,
      loading:false
    })
   }, 1000)
   setproblemData({
    ...problemdata,
    loading:true
  })  
  }
  if(state.services === ''){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <CircleFade size={48} color={colors.menuitemcolor}/>
        <Text style ={{color:colors.menuitemcolor}}>Please wait Your Problem  is Sharing</Text>
      </View>
    )
  }
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
          <ScrollView
           showsVerticalScrollIndicator ={false}
           showsHorizontalScrollIndicator={false}
          >     
        
        <View  style ={{ width:'100%', height:180, overflow: 'hidden' ,borderBottomLeftRadius:10, borderBottomRightRadius:10,}}> 
          <MapView
              initialRegion={{
              latitude: 34.12000,
              longitude: 72.470000,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
                }} 
             showsUserLocation
             style ={{width:'100%', height: 100, flex:1}}    
          />       
        </View>

        <Animatable.View 
          animation="zoomInUp"
          direction="alternate"
          style={[styles.footer, {
            backgroundColor: colors.background,
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            borderColor:'#009387',
            borderTopWidth:5,
         }]}
         >
                <Text style={{fontSize:18, color:colors.text, marginVertical:5,}}>Select Service From Below</Text>
                   <RNPickerSelect
                        placeholder={{ label: 'Select Service You Need',
                        value: 'Select Service You Need',
                        color: 'white',

                      }}
                        value={problemdata.problemtitle}
                        onValueChange={(value) =>setproblemData({...state, problemtitle:value})}
                        items={state.services}
                       
                          style={{
                            ...pickerSelectStyles,
                            inputAndroid:{
                              color:colors.text,
                              marginBottom:10,
                              fontSize: 16,
                              paddingHorizontal: 10,
                              paddingVertical: 14,
                              borderBottomWidth: 1,
                              borderColor:colors.text,
                              borderRadius: 0,
                              paddingRight: 30, // to ensure the text is never behind the icon
                          
                            },
                            iconContainer: {
                              top: 15,
                              right: 12,
                            },
                          }}
                          useNativeAndroidPickerStyle={false}
                          textInputProps={{ underlineColor: 'yellow' }}
                          Icon={() => {
                            return <Ionicons name="md-arrow-down" size={24} color={colors.text} />;
                          }}
              
                      
                    />
                    
          

            <MyTextInput
              label = "Enter Problem Description"
            //  placeholdertext = {'Enter Probelm Here \n اپنے مسئلے کو یہاں بیان کریں یا بتائیں'}
              errormessage = ""
              lefticonname = ""
              value={problemdata.problemdescription}
              isvalid = {problemdata.isValidProblemDescription} 
              errormessage={problemdata.problemdescriptionerrormessage}
              textInputChange={namehandler}
              keyboardtype ="default"
            //  lenght={15}
              numberofline= {3}
          />   

                <TouchableOpacity
                    style={styles.signIn}
                     onPress= {() => sumbitProblem()}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Share Now</Text>
                </LinearGradient>
                </TouchableOpacity>

    
 

      </Animatable.View>
      </ScrollView>
      </View>
    );
};

export default ProfileScreen;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginBottom:10,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderColor: 'rgba(0,0,0,.1)',
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer:{
    color:'green'
  }
});
