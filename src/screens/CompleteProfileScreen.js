import React, {useState, useContext} from 'react';
import { View, Text, TouchableOpacity, StatusBar,Modal, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme, ProgressBar } from 'react-native-paper';
import  styles  from  './Styles/authstyles';
import LinearGradient from 'react-native-linear-gradient';
import MyTextInput from '../Components/TextInput'
import {Button} from 'react-native-paper'
import ImagePicker from 'react-native-image-crop-picker';
import {Context as AuthContext} from '../Context/AuthContext'
import { Flow } from 'react-native-animated-spinkit';
const CompleteProfileScreen = ({navigation}) => {
  const {state,completeprofile, uploaduserimage} = useContext(AuthContext);
  const [data, setData] = useState({
      name:"",
      isValidName:false,
      nameerrormessage:"",
      phonenumber:"",
      isValidPhone:false,
      phoneerrormessage:'',
      cnic:'',
      isValidCnic:false,
      cnicerrormessage:"",
      address:"",
      isValidAddress:false,
      addresserrormessage:'',
      picture:'',
  })
  const [modal, setModal] = useState(false);
  const { colors } = useTheme();
  const theme = {
    colors:{
        primary:"#009387"
    }
} 
    const namehandler = (val) => {
        const sg = /[0-9!@#\$%\^\&*\)\(+=._-]/ ;
          if(sg.test(val)){
            setData({
              ...data,
              name:val,
              isValidName:false,
              nameerrormessage:"Only Characters are Allowed"
            })
              return; 
          }

          if(val.trim().length <= 3){
            setData({
              ...data,
              name:val,
              isValidName:false,
              nameerrormessage:"Name Lenght Must be 4 Charterters"
            })
          }
          else {
            setData({
            ...data,
            name:val,
            isValidName:true,
            nameerrormessage:""
            })
          }    

      }


      const phonenumberhandler = (val) => {
      if(val.trim().length < 11 ){
        setData({  
          ...data, 
          phonenumber:val.replace(/[^0-9]/g, ''),
          isValidPhone:false,
          phoneerrormessage:"Invalid Phone Number"
        })
        return ;
      }else {
        setData({
          ...data, 
          phonenumber:val.replace(/[^0-9]/g, ''),
          isValidPhone:true,
          phoneerrormessage:""
        })
      }
      }


      const cnichandler = (val) => {
        if(val.trim().length === 5 ){
          val += '-'
          setData({
            ...data,
            cnic:val,
            isValidCnic:false,
          })
          return ;
        }

        if(val.trim().length === 13 ){
          val += '-'
          setData({
            ...data,
            cnic:val,
            isValidCnic:false,
          })
        }
        
      if(val.trim().length < 15){
        setData({
          ...data, 
          cnic:val,
          isValidCnic:false,
          cnicerrormessage:"Invalid CNIC Provided"
        })
        return ;
      }else {
        setData({
          ...data,
          cnic:val,
          isValidCnic:true,
          cnicerrormessage:""
        })
      }

      }

      const addresshandler =(val) =>{
        if(val.trim().length < 20){
          setData({
            ...data,
            address:val,
            isValidAddress:false,
            addresserrormessage:"Address Must be at least 20 Characters"
          })
        }else{
          setData({
            ...data,
            address:val,
            isValidAddress:true,
            addresserrormessage:""
          })

        }

      }

    const opengallery = () =>{
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        uploaduserimage(image.path)
      }).catch((e) => {
        console.log(e);
      });
    } 
    const opencamera = () =>{
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        uploaduserimage(image.path)
      }).catch((e) => {
        console.log(e);
      });
    }

    const handleProfileupdate =(name,  address, cnic,phone, imageuri, accounttype, navigation) =>{
        console.log(navigation);
      if(!(data.isValidName)){
        setData({
          ...data,
          isValidName:false,
          nameerrormessage:"Invalid Name Provided"
        })
        return ;
      } 
      if(!(data.isValidPhone)){
        setData({
          ...state,
          isValidPhone:false,
          phoneerrormessage:"Invalid Phone Nummber"
        })
        return ;
      }
      if(!(data.isValidCnic)){
        setData({
          ...data,
          isValidCnic:false,
          cnicerrormessage:"Invalid CNIC Provided"
        })
        return ;
      }
      if(!(data.isValidAddress)){
        setData({
          ...data,
          isValidAddress:false,
          addresserrormessage:"InValid Address"
        })
        if(picture === ""){
          alert("Please Select an Image form Galley or Camera");
          return;
        }
      }
      completeprofile(name, address, cnic,phone, imageuri,accounttype, navigation); 
    }


    const handleimageupload = () =>{
      setData({
        ...data,
        picture:state.imageuri
      })
      setModal(false)
    } 
    
    if(state.isauthenticating){
      return(
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Flow size={70} color="#009387"></Flow>
          <Text style={{color:colors.text}}>Please Wait ...Updating Profile</Text>
        </View>
      )
  }

              return (
                    <View style = {styles.container}>
                        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                      <View style={styles.header}>
                          <Text style={[styles.text_header,{color:colors.text}]}>Complete Your's Profile</Text>
                      </View>
                          <Animatable.View 
                            animation="zoomInUp"
                            direction="alternate"
                            style={[styles.footer, {
                                backgroundColor: colors.background
                            }]}
                          >
                          <ScrollView
                          showsHorizontalScrollIndicator={false}
                          showsVerticalScrollIndicator={false}
                          >

                              <MyTextInput 
                                label = "Name"
                                placeholdertext = "Enter Your Full Name"
                                errormessage = ""
                                lefticonname = "user-o"
                                value={data.name}
                                isvalid = {data.isValidName} 
                                errormessage={data.nameerrormessage}
                                textInputChange={namehandler}
                                keyboardtype ="default"
                                lenght={15}

                              />

                              <MyTextInput 
                                label = "Phone Number"
                                placeholdertext = "Enter Your Phone Number"
                                errormessage = ""
                                lefticonname = "phone"
                                value={data.phonenumber}
                                isvalid = {data.isValidPhone}
                                errormessage={data.phoneerrormessage}
                                keyboardtype="decimal-pad"
                                textInputChange={phonenumberhandler}
                                lenght={13}
                              />

                              <MyTextInput 
                                label = "CNIC"
                                placeholdertext = "Enter Your Valid Cnic"
                                errormessage = ""
                                keyboardtype="decimal-pad"
                                lefticonname = "id-card-o"
                                value={data.cnic}
                                isvalid = {data.isValidCnic}
                                errormessage={data.cnicerrormessage}
                                textInputChange={cnichandler}
                                lenght={15}
                                value= {data.cnic}

                              /> 

                              <MyTextInput 
                                label = "Address"
                                placeholdertext = "Enter Your Full Address"
                                errormessage = ""
                                lefticonname = "id-card-o"
                                value={data.cnic}
                                isvalid = {data.isValidAddress}
                                errormessage={data.addresserrormessage}
                                textInputChange={addresshandler}
                                value= {data.address}

                              /> 
                                    {state.errormessage?<Text style={styles.errorMsg}>{state.errormessage}</Text>:null }
                              <Button 
                              style={[styles.signIn, { borderColor: '#009387',
                              borderWidth: 2,
                              borderBottomWidth:3,
                              marginTop: 5}]}
                              icon={data.picture==""?"upload":"check"}
                              mode="contained" 
                              theme={theme}
                              color={data.picture==""?"#009387":"green"}
                              onPress={() => setModal(true)}>
                              {data.picture==""?"Upload Image":"Image Uploaded"}   
                              </Button>

                              <Modal
                                  animationType="slide"
                                  transparent={true}
                                  visible={modal}
                                  onRequestClose={()=>{
                                  setModal(false)
                                }}
                      >
                        <View style={styles.modalView}>
                        <ProgressBar progress={state.imageuploadprogress} color={'#009387'} />   
                              {state.imageuploadprogress?<Text style = {{color:"#009387", textAlign:'right'}}>{state.imageuploadprogress} %</Text>:null}
                            <View style={styles.modalButtonView}>
                                  <Button icon="camera"
                                  theme={theme}
                                  mode="contained"
                                  onPress = {() => opencamera()}
                                >
                                          camera
                                  </Button>
                                  <Button 
                                  icon="image-area"
                                  mode="contained"
                                  theme={theme}
                                  
                                  onPress = {() => opengallery()} 
                                >
                                          gallery
                                  </Button>
                            </View>
                            {state.errormessage?<Text style={styles.errorMsg}>{state.errormessage}</Text>:null} 
                       
                          <Button 
                          theme={theme}
                          onPress={() => handleimageupload()}>
                                  Upload
                          </Button>
                        </View>
                      </Modal>

                
                    <TouchableOpacity
                            onPress={() => handleProfileupdate(data.name, data.address, data.cnic,  data.phonenumber, data.picture, state.accounttype, navigation)}
                              style={[styles.signIn, {
                                  borderColor: '#009387',
                                  borderWidth: 2,
                                  borderBottomWidth:3,
                                  marginTop: 15
                              }]}
                          >
                              <LinearGradient
                              colors={['#08d4c4', '#01ab9d']}
                              style={styles.signIn}
                          >
                              <Text style={[styles.textSign, 
                              {color:colors.text} ]}>Complete Your's Profile</Text>
                              </LinearGradient>
                          </TouchableOpacity>
                    </ScrollView>     
      </Animatable.View>
      </View>
     
    );
};

export default CompleteProfileScreen;
