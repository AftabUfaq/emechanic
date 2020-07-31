import React, { useState } from 'react';
import { View, StyleSheet, Linking, Image, TouchableOpacity, ToastAndroid, ScrollView} from 'react-native';
import {Title, Button,Text,} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme ,} from '@react-navigation/native';
import styles from './Styles/authstyles'
import { AirbnbRating } from 'react-native-ratings';
import {Context as AuthContext } from '../Context/AuthContext';
const ProfileScreen = ({navigation}) => {
    const [modal,setModal] = useState(false);
    const {state} = React.useContext(AuthContext);
    const theme = {
        colors:{
            primary:"#009387"
        }
    }    

    const {colors} = useTheme();
    const openDial=()=>{
        if(Platform.OS === "android"){
           Linking.openURL(`tel:03408006107`).catch(error =>{
            ToastAndroid.showWithGravityAndOffset(
              "Can't Open Dail",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
           )})
        }else{
           Linking.openURL(`telprompt:03408006107`)
        }
   }    

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }    
    return (
        <View style={{flex:1 , backgroundColor:'transparent'}}>
           <LinearGradient
             colors={[colors.background,colors.background]}
             style={{height:"100%", flex:1,}}
            >
               <ScrollView style={{ paddingTop:10,marginHorizontal:0, borderRadius:0,marginBottom:0, overflow:'hidden' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    > 
                     <Image 
                                source={{
                                    uri:`${state.profiledata.photoURl}`
                                }}
                                style={{width:150, height:150, alignSelf:'center', borderRadius:100,borderColor:'#009387', borderWidth:0,shadowColor:colors.text}}
                            />
                            <View style={{marginLeft:0, flexDirection:'column'}}>
                                <Title style={{color:colors.text, textAlign:"center", fontWeight:"bold"}}>{Capitalize(state.profiledata.name)}</Title>
                                <AirbnbRating
                                  ratingCount={5}
                                  size={14}
                                  isDisabled={true}
                                  showRating={false}
                                  defaultRating={3.9}
                                  fractions={19}
                                  showRating= {false}
                                  starContainerStyle={{
                                    backgroundColor: "transparent",
                                    marginTop:-5
                                   }} 
                                   />
                                <Text style ={{color:'#f1c40f', textAlign:'center'}}>(15 Reviews)</Text> 
                            </View>
                 
 
                       <TouchableOpacity style={styles.mycard} onPress={()=>{
                           Linking.openURL(`mailto:${state.profiledata.email}`).catch(error =>{
                            ToastAndroid.showWithGravityAndOffset(
                              "Can't Open Email",
                              ToastAndroid.LONG,
                              ToastAndroid.BOTTOM,
                              25,
                              50
                            );
                           })
                         }}>
                        <View style={styles.cardContent}>
                          <MaterialIcons name="email" size={22} color={colors.text} style={styles.profileicon} />
                          <View style={{flexDirection:"column", marginLeft:'2%'}}>
                            <Text style={[styles.mytext, {color:colors.text,  textDecorationLine:"underline",}]}>Email</Text>
                            <Text style={[styles.mytext, {color:colors.text}]}>{state.profiledata.email}</Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.mycard} onPress={()=>openDial()}>
                        <View style={styles.cardContent}>
                          <Entypo name="phone" size={22} color={colors.text} style={styles.profileicon} />
                          <View style={{flexDirection:"column", marginLeft:'2%'}}>
                            <Text style={[styles.mytext, {color:colors.text,  textDecorationLine:"underline",}]}>Mobile Number</Text>
                            <Text style={styles.mytext}>{state.profiledata.phoneNumber}</Text>
                          </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mycard}>
                        <View style={styles.cardContent}>
                          <FontAwesome name="id-card-o" size={22} color={colors.text} style={styles.profileicon}/>
                          <View style={{flexDirection:"column", marginLeft:'2%'}}>
                            <Text style={[styles.mytext, {color:colors.text,  textDecorationLine:"underline",}]}>CNIC</Text>
                            <Text style={styles.mytext}>{state.profiledata.cnic}</Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.mycard, {paddingBottom:20,}]}>
                        <View style={styles.cardContent}>
                          <MaterialIcons name="location-on" size={22} color={colors.text} style={styles.profileicon}/>
                          <View style={{flexDirection:"column", marginLeft:'2%'}}>
                            <Text style={[styles.mytext, {color:colors.text,  textDecorationLine:"underline",}]}>Address</Text>
                            <Text style={styles.mytext}>{state.profiledata.address}</Text>
                          </View>
                        </View>
                    </TouchableOpacity>           
              </ScrollView>                       
            </LinearGradient>
        </View>

    );
};

export default ProfileScreen;



const localstyles =  StyleSheet.create({

})