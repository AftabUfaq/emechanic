import React, { useState, useContext, useEffect } from 'react';
import { PermissionsAndroid, View, ScrollView, StatusBar, StyleSheet, Text, Platform, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
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
import Geolocation from 'react-native-geolocation-service';
const ProfileScreen = ({navigation, route}) => {
  const getdata = (type) =>{
    if(route.params){
       switch(type){
         case "id":
           return route.params.item.id;
         case "problemDescription":
           return route.params.item.problemDescription ;
         case "problemTitle":
           return route.params.item.problemTitle
       }
    }
    return""
 }

  const [id , setId] = useState(getdata('id'))
  const [problemTitle, setProblemTitle] = useState(getdata('problemTitle'))
  const [problemDescription , setProblemDescription] =  useState(getdata('problemDescription'));

 
//  const {id, problemDescription, problemTitle} = route.params.item ;
  const {state, addproblem, fetchservices, updateproblem} = useContext(ProblemContext);

const [problemdata,  setproblemData] = useState({
  problemtitle:problemTitle,
  isvalidProblemTitle:true,
  proplemtitlerrormessage:"",
  problemdescription:problemDescription,
  isValidProblemDescription:true,
  problemdescriptionerrormessage:'',
  longitude:"",
  latitude:""
 });  

const [region, setRegion] = useState({
  latitude: 34.1200,
  longitude: 72.4700,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
});
//console.log('state',state)
const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await this.hasLocationPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      'Location permission denied by user.',
      ToastAndroid.LONG,
    );
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};


useEffect(() => {
  if(hasLocationPermission()){
  
  if(navigation.isFocused()){
    Geolocation.getCurrentPosition((position) =>{
      setproblemData({
        ...problemdata,
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
      })
      setRegion({
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      
      })
    },(error) => {
      ToastAndroid.showWithGravityAndOffset(
        "Plase Enable Location",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
    fetchservices();
  }
} 
}
,[]) 
  const { colors } = useTheme();   
  
  const descriptionhandler = (val) =>{
    if(val.trim().length <=20){
      setproblemData({
        ...problemdata,
        problemdescription:val,
        isValidProblemDescription:false,
        problemdescriptionerrormessage:"Please Enter At least 20 Characters To Full Describe you Problem"
      })
    }else{
      setproblemData({
        ...problemdata,
        problemdescription:val,
        isValidProblemDescription:true,
        problemdescriptionerrormessage:""
      })
    }
         
    }
  const sumbitProblem = () =>{
    if(problemdata.problemtitle === ''){
      setproblemData({
        ...problemdata,
        isvalidProblemTitle:false,
        proplemtitlerrormessage:"Please elect Problem Title"
      })
      return ;
    }
    else if(!(problemdata.isValidProblemDescription)){
      setproblemData({
        ...problemdata,
        isValidProblemDescription:false,
        problemdescriptionerrormessage:"Please Enter At least 20 Characters To Full Describe you Problem"
      })
      return ;
    }
//      console.log('here it is in AddProblem Screen ',problemdata.latitude, problemdata.longitude)
    addproblem(problemdata.problemtitle, problemdata.problemdescription, problemdata.latitude,problemdata.longitude);
  }
  if(state.loading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <CircleFade size={48} color={colors.menuitemcolor}/>
        <Text style ={{color:colors.menuitemcolor}}>Please wait...</Text>
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
              region={region}
              initialRegion={region}
              showsUserLocation = {true}
              style ={{width:'100%', height: 100, flex:1}}    
          />       
        </View>

        <Animatable.View 
          animation="zoomInUp"
          direction="alternate"
          style={[styles.footer, {
            height:Dimensions.get('screen').height,
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
                        onValueChange={(value) =>setproblemData({...problemdata, problemtitle:value})}
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
              textInputChange={descriptionhandler}
              keyboardtype ="default"
              numberofline= {2}
          />   
           {id?<TouchableOpacity
                    style={styles.signIn}
                     onPress= {() => updateproblem(id, problemdata.problemtitle, problemdata.problemdescription, problemdata.latitude,problemdata.longitude)}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Update</Text>
                </LinearGradient>
                </TouchableOpacity>:<TouchableOpacity
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
                </TouchableOpacity>}   
                
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
