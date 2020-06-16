import React, { useState } from 'react';
import { View, Linking, TouchableOpacity, Modal} from 'react-native';
import { Avatar,Title,Menu, Divider, Button,Text,} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme ,} from '@react-navigation/native';
import styles from '../screens/Styles/authstyles'
import { Rating, AirbnbRating } from 'react-native-ratings';
import BookingForm from '../Components/Bookingform'
const MechanicInformation = ({navigation}) => {
    const [modal,setModal] = useState(false);
    const theme = {
        colors:{
            primary:"#009387"
        }
    }    

    const {colors} = useTheme();
    const openDial=()=>{
        if(Platform.OS === "android"){
           Linking.openURL(`tel:03408006107`)
        }else{
           Linking.openURL(`telprompt:03408006107`)
        }
   }    

    
    return (
        <View style={{flex:1}}>
        <LinearGradient
         colors={["#009387",colors.background,colors.background,colors.background,colors.background,colors.background]}
         style={{height:"100%"}}
         >
            <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={70}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={[styles.title, {color:colors.text}]}>Aftab Ufaq</Title>
                                 <AirbnbRating
                                  ratingCount={5}
                                  size={20}
                                  isDisabled={true}
                                  showRating={false}
                                  defaultRating={5}
                                  showRating= {false}
                                  starContainerStyle={{
                                      marginLeft:-5,
                                    backgroundColor: "transparent",
                                    marginTop:-5
                                   }} 
                                 />
                          <Text style ={{color:'#f1c40f',}}>(15 Reviews)</Text> 

                            </View>
                        </View>
                       <View style={{borderBottomWidth:.5,marginTop:10, borderBottomColor:'#4a4948', marginLeft:-100}}></View> 
                       <View style={{borderBottomWidth:.5,marginTop:.7, borderBottomColor:'#4a4948', marginLeft:-100}}></View> 

                    </View>
                       <TouchableOpacity style={styles.mycard} onPress={()=>{
                           Linking.openURL(`mailto:engr.aftabufaq@gmail.com`)
                         }}>
                        <View style={styles.cardContent}>
                          <MaterialIcons name="email" size={22} color="#009387" style={styles.profileicon} />
                          <Text style={[styles.mytext, {color:colors.text}]}>engr.aftabufaq@gmail.com</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.mycard} onPress={()=>openDial()}>
                        <View style={styles.cardContent}>
                          <Entypo name="phone" size={22} color="#009387" style={styles.profileicon} />
                          <Text style={styles.mytext}>+923179608039</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.mycard}>
                        <View style={styles.cardContent}>
                          <MaterialIcons name="location-on" size={22} color="#009387" style={styles.profileicon}/>
                          <Text style={styles.mytext}>Shewa, Swabi, Kpk , Pakistan</Text>
                        </View>
                    </TouchableOpacity>
                    <View  style={{justifyContent:'space-around', padding:10}}>  
                    <Button 
                          icon="account-edit"
                          mode="contained"
                          theme={theme}
                          >
                          Services
                        </Button>
    
                  </View>
                    <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
                        <Button 
                          icon="account-edit"
                          mode="contained"
                          theme={theme}
                          >
                          Close
                        </Button>
                            
                        <Button 
                         onPress={()=>setModal(true)}
                          icon="delete"
                          mode="contained"
                          theme={theme}>
                            Book
                        </Button>        
                    </View>

                
                    <Modal
                    
                    animation="zoomInUp"
                    direction="alternate"
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={()=>{
                    setModal(false)
                    }}
                    >
                       <BookingForm />
                    </Modal>    
                </View>  
            </LinearGradient>
        </View>

    );
};

export default MechanicInformation;
