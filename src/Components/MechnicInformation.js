import React, { useState } from 'react';
import { View, Linking,ScrollView, TouchableOpacity, Modal} from 'react-native';
import { Avatar,Title,  Button,Text,} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme ,} from '@react-navigation/native';
import styles from '../screens/Styles/authstyles'
import { AirbnbRating } from 'react-native-ratings';
import BookingForm from '../Components/Bookingform'

const MechanicInformation = (props) => {
  const [modal,setModal] = useState(false);
    const [serviceModal, setServiceModal] = useState(false);   
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
        <View style={{flex:1, margin:5, borderRadius:10,  overflow:'hidden'}}>
        <LinearGradient
          colors={["#009387",colors.background,colors.background,colors.background,colors.background,'#d9d9d9']}
          style={{height:"100%"}}
         >
            <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri:props.photoURl
                                }}
                                size={70}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                            {props.name?<Title style={[styles.title, {color:colors.text}]}>{props.name}</Title>
                            :<Title style={[styles.title, {color:colors.text}]}>Name not set</Title>
                          }  
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
                         <TouchableOpacity 
                             onPress={() => props.closeview()}
                             style={{backgroundColor:'transparent', width:35, height:25, marginTop:-18,marginLeft:88,  borderBottomRightRadius:10,}}>
                           <FontAwesome name="window-close" size={32}  color={'#d9d9d9'} />
                           </TouchableOpacity>   
                        </View>
                       <View style={{borderBottomWidth:.5,marginTop:10, borderBottomColor:'#4a4948', marginLeft:-100}}></View> 
                       <View style={{borderBottomWidth:.5,marginTop:.7, borderBottomColor:'#4a4948', marginLeft:-100}}></View> 

                    </View>
                       <TouchableOpacity style={styles.mycard} onPress={()=>{
                           Linking.openURL(`mailto:${props.email}`)
                         }}>
                        <View style={styles.cardContent}>
                          <MaterialIcons name="email" size={22} color="#009387" style={styles.profileicon} />
                          {props.email
                          ?<Text style={[styles.mytext, {color:colors.text}]}>{props.email}</Text>
                          :<Text style={[styles.mytext, {color:colors.text}]}>Email Not Set</Text>}
                          
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.mycard} onPress={()=>openDial()}>
                        <View style={styles.cardContent}>
                          <Entypo name="phone" size={22} color="#009387" style={styles.profileicon} />
                         {props.phoneNumber
                         ?<Text style={styles.mytext}>{props.phoneNumber}</Text>
                         :<Text style={styles.mytext}>Mobile Number Not Set</Text>}
                          
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.mycard}>
                        <View style={styles.cardContent}>
                          <FontAwesome name="id-card-o" size={22} color="#009387" style={styles.profileicon}/>
                          {props.cnic
                          ?<Text style={styles.mytext}>{props.cnic}</Text>
                          :<Text style={styles.mytext}>CNIC Not Found</Text>
                          }
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mycard}>
                        <View style={styles.cardContent}>
                          <MaterialIcons name="location-on" size={22} color="#009387" style={styles.profileicon}/>
                          {props.address
                          ?<Text style={styles.mytext}>{props.address}</Text>
                          :<Text style={styles.mytext}>Address Not Found</Text>
                          }
                          
                        </View>
                    </TouchableOpacity>

                    <View  style={{justifyContent:'space-around', padding:10}}>             
                        <Button 
                          icon="account-edit"
                          mode="contained"
                          theme={theme}
                          onPress={() => {setServiceModal(true)}}
                          >
                          Services
                        </Button>
                        
                       
                        <Modal                       
                           animation="zoomInUp"
                           direction="alternate"
                           animationType="slide"
                           transparent={false}
                           visible={serviceModal}
                           onRequestClose={()=>{setServiceModal(false)}}
                        > 
                        <ScrollView>
                          {props.services.map((marker, colors) => (    
                            <View  key={marker.id} style={{margin:10, padding:10, backgroundColor:colors.background, elevation:4, borderRadius:10,}}>
                              <Text style={{color:colors.text}}>
                                Serive Title: {marker.serviceTitle}
                              </Text>
                              <Text style={{color:colors.text}}>
                                Serive Description: {marker.serviceDescription}
                              </Text>
                              <Text style={{color:colors.text}}>
                                 Vechile Type: {marker.vechiletype}
                              </Text>

                              <Text style={{color:colors.text}}>
                                 Vechile Price: {marker.price}
                              </Text>                              
                            </View>
                          ))}
                       </ScrollView>   
                      </Modal>

                  </View>
                    <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>                            
                        <Button 
                          onPress={()=>setModal(true)}
                          mode="contained"
                          theme={theme}>
                            Book
                        </Button>

                         <Button 
                          onPress={()=>props.closeview()}
                          mode="contained"
                          style={{backgroundColor:'#FFCC00'}}
                          >
                            close
                        </Button>   

                             
                    </View>

                
                    <Modal
                      animation="zoomInUp"
                      direction="alternate"
                      animationType="slide"
                      transparent={false}
                      visible={modal}
                      onRequestClose={()=>{
                      setModal(false)
                      }}
                    >
                       <BookingForm 
                         services = {props.services}
                         mechanicid={props.uid}
                       />
                    </Modal>    
                </View>  
            </LinearGradient>
        </View>

    );
};

export default MechanicInformation;
