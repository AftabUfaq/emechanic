import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import  styles  from  './Styles/authstyles';
import { useTheme } from 'react-native-paper';
import MyTextInput from '../Components/TextInput';
import { CircleFade } from 'react-native-animated-spinkit';
import {Context as ServiceContext} from '../Context/ServiceContext'
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileScreen = ({navigation, route}) => {
  const getdata = (type) =>{
    if(route.params){
       switch(type){
         case "id":
           return route.params.item.id;
         case "serviceDescription":
           return route.params.item.serviceDescription ;
         case "serviceTitle":
           return route.params.item.serviceTitle;
         case 'vechiletype':
           return route.params.item.vechiletype;
         case "price":
           return route.params.item.price
       }
    }
    return""
 }

  const [id , setId] = useState(getdata('id'))
  const [serviceTitle, setserviceTitle] = useState(getdata('serviceTitle'))
  const [serviceDescription , setserviceDescription] =  useState(getdata('serviceDescription'));
  const [vechiletype, setVechiletype] = useState(getdata('vechiletype'))
  const [serviceprice, setservicePrice] = useState(getdata('price'))

  const {state, addservice, fetchservices, updateservice} = useContext(ServiceContext);
  useEffect(() => {
    fetchservices();
  },[])
  const [servicedata,  setserviceData] = useState({
  servicetitle:serviceTitle,
  isvalidserviceTitle:true,
  servicetitlerrormessage:"",
  servicedescription:serviceDescription,
  isValidserviceDescription:true,
  servicedescriptionerrormessage:'',
  serviceprice:serviceprice,
  isValidserviceprice:true,
  servicepriceerrormessage:"",
  vechiletype:vechiletype,
  isValidvechiletype:true,
  vechiletypeerrormessage:'',
 });  
  const { colors } = useTheme();   
  

  const descriptionhandler = (val) =>{
    if(val.trim().length <=20){
      setserviceData({
        ...servicedata,
        servicedescription:val,
        isValidserviceDescription:false,
        servicedescriptionerrormessage:"Please Enter At least 20 Characters To Full Describe you service"
      })
    }else{
      setserviceData({
        ...servicedata,
        servicedescription:val,
        isValidserviceDescription:true,
        servicedescriptionerrormessage:""
      })
    }         
  }
  
  const vechileTypehadler = (val) =>{
    if(val.trim().length <3){
      setserviceData({
        ...servicedata,
        vechiletype:val,
        isValidvechiletype:false,
        vechiletypeerrormessage:"Vechile Name must be at least 4 charters"
      })
      return;
    }else{
      setserviceData({
        ...servicedata,
        vechiletype:val,
        isValidvechiletype:true,
        vechiletypeerrormessage:""
      })
    }
  }

  const pricehandler = (val) =>{
      setserviceData({
      ...servicedata,
      isValidserviceprice:true,
      serviceprice:val.replace(/[^0-9]/g, ''),
      servicepriceerrormessage:""
    })
  }  
 
  const sumbitservice = () =>{
    if(servicedata.servicetitle === ''){
      setserviceData({
        ...servicedata,
        isvalidserviceTitle:false,
        servicetitlerrormessage:"Please Select service Title"
      })
      return ;
    }
    else if(!(servicedata.isValidserviceDescription) || servicedata.servicedescription === ''){
      setserviceData({
        ...servicedata,
        isValidserviceDescription:false,
        servicedescriptionerrormessage:"Please Enter At least 20 Characters To Full Describe you service",
        servicetitlerrormessage:''
      })
      return ;
    }
    else if(!(servicedata.isValidvechiletype) || servicedata.vechiletype.trim().length < 3){
      setserviceData({
        ...servicedata,
        isValidvechiletype:false,
        vechiletypeerrormessage:"Vechile Name must be at least 3 charters"
      })
      return;   
    }
    else if(!(servicedata.isValidserviceprice) || servicedata.serviceprice === ''){
      setserviceData({
        ...servicedata,
        isValidserviceprice:false,
        servicepriceerrormessage:"Please Enter Digits only"
      })
      return ;
    }
  
    addservice(servicedata.servicetitle, servicedata.servicedescription,  servicedata.vechiletype, servicedata.serviceprice);
  }

  const updateservicehandler = () =>{
    if(servicedata.servicetitle === ''){
      setserviceData({
        ...servicedata,
        isvalidserviceTitle:false,
        proplemtitlerrormessage:"Please Select service Title"
      })
      return ;
    }
    else if(!(servicedata.isValidserviceDescription) || servicedata.servicedescription === ""){
      setserviceData({
        ...servicedata,
        isValidserviceDescription:false,
        servicedescriptionerrormessage:"Please Enter At least 20 Characters To Full Describe you service"
      })
      return ;
    }
    else if(servicedata.serviceprice === ''){
      setserviceData({
        ...servicedata,
        isValidserviceprice:false,
        servicepriceerrormessage:"Please Enter Price"
      })
      return;
    }else if(!(servicedata.isValidvechiletype) || servicedata.vechiletype.trim().length < 3){
      setserviceData({
        ...servicedata,
        isValidvechiletype:false,
        vechiletypeerrormessage:"Vechile Name must be at least 3 charters"
      })
      return;   
    }

    updateservice(id, servicedata.servicetitle, servicedata.servicedescription, servicedata.vechiletype, servicedata.serviceprice);
  }
  
  if(state.loading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <CircleFade size={48} color={colors.menuitemcolor}/>
      </View>
    )
  }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <ScrollView
             showsVerticalScrollIndicator ={false}
              showsHorizontalScrollIndicator={false}>     
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
                      placeholder={{ label: 'Select Service ',
                      value: 'Select Service You Need',
                      color: 'white'}}
                      value={servicedata.servicetitle}
                      onValueChange={(value) =>setserviceData({...servicedata, servicetitle:value})}
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
            <Animatable.Text  animation="fadeInLeft" duration={500} style={{color:'red', }}>{servicedata.servicetitlerrormessage}</Animatable.Text>      
                    <MyTextInput
                        label = "Enter service Description"
                        placeholdertext = {'Enter service Description Here'}
                        errormessage = ""
                        lefticonname = "list-alt"
                        value={servicedata.servicedescription}
                        isvalid = {servicedata.isValidserviceDescription} 
                        errormessage={servicedata.servicedescriptionerrormessage}
                        textInputChange={descriptionhandler}
                        keyboardtype ="default"
                        numberofline= {2}
                    />
                      <MyTextInput
                        label = "Enter Vechile Type"
                        placeholdertext = {'Enter Vechile Type'}
                        errormessage = ""
                        lefticonname = "list"
                        value={servicedata.vechiletype}
                        isvalid = {servicedata.isValidvechiletype} 
                        errormessage={servicedata.vechiletypeerrormessage}
                        textInputChange={vechileTypehadler}
                        keyboardtype ="default"
                        numberofline= {1}
                    />
                      <MyTextInput
                        label = "Enter Cost"
                        placeholdertext = {'Enter Cost'}
                        errormessage = ""
                        lefticonname = "money"
                        value={servicedata.serviceprice}
                        isvalid = {servicedata.isValidserviceprice} 
                        errormessage={servicedata.servicepriceerrormessage}
                        textInputChange={pricehandler}
                        keyboardtype ='decimal-pad'
                        numberofline= {1}
                    />   
                    {id?<TouchableOpacity
                              style={styles.signIn}
                              onPress= {() => updateservicehandler()}
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
                              onPress= {() => sumbitservice()}
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
    paddingRight: 30,
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
