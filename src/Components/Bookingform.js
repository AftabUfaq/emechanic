import React, { useState, useContext } from 'react'
import {Text, StyleSheet,TouchableOpacity, Modal, View, ScrollView, Dimensions} from 'react-native'
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LinearGradient from 'react-native-linear-gradient';
import styles from '../screens/Styles/authstyles'
import { useTheme ,} from '@react-navigation/native';
import {Context as BookingContext} from '../Context/BookingContext'
const Bookingform = (props) =>{
    const {savebooking} = useContext(BookingContext)
    const [serviceModal, setServiceModal] = useState(false);
    const {colors} = useTheme();
    const [data, setData] = useState({
        servicetype:'',
        servicetypeerrormessage:'',
        isValidservicetype:true,
        vechiletype:'',
        price:'',
        date:'',
        dateerrormessage:'',
        time:"",
        timeerrormessage:'',
        mid:props.mechanicid,
    })
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false); 
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
     
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
     
    const handleConfirm = (date) => {
       hideDatePicker();
        let dd = new Date(date).getDate();
        let mm = new Date(date).getMonth() + 1;
        let yyyy= new Date(date).getFullYear();
        
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
      
        let  datestr =  dd + "-" + mm + "-" + yyyy;
        setData({
            ...data,
            date:datestr
        })
      };

    
     const handleTimePicker = (date) => {
        hideTimePicker();
         let hour = new Date(date).getHours();
         let type = ''
         if(hour <=11){
             type="AM"
         }else{
             type="PM"
         }
 
         if( hour > 12 )
            {
             hour = hour - 12;
            }
  
           if( hour == 0 )
            {
               hour = 12;
            } 

             let  minutes = new Date(date).getMinutes();
      
             if(minutes < 10)
            {
               minutes = '0' + minutes.toString();
             }
             let fultime = hour.toString() + ':' + minutes.toString() + ' ' + type.toString()
            setData({
            ...data,
            time:fultime
            })
    }

    const showTimePicker = () => {
       setTimePickerVisibility(true);
    }

    const hideTimePicker = () =>{
       setTimePickerVisibility(false);
    }

    const handleconfirmBooking = (data) =>{
    if(data.servicetype === ''){
          setData({
              ...data,
              servicetypeerrormessage:'Please Select a service',
              timeerrormessage:"",
              dateerrormessage:""
          })
          return ;
    }
    else if(data.date === ''){
        setData({
            ...data,
            dateerrormessage:"Please Select a Date",
            servicetypeerrormessage:"",
            timeerrormessage:""
        })
        return;
    }
    else if(data.time === ''){
        setData({
            ...data,
            timeerrormessage:"Please Select a Time",
            dateerrormessage:"",
            servicetypeerrormessage:''
        })
        return ;
    }
    savebooking(data.mid,data.servicetype,  data.vechiletype ,data.price, data.date, data.time)
    }
    return(
    <Animatable.View      
            direction="alternate"
            animationType="slide"
            duration={1}
            style={localstyles.mainView}>
          <Text style={{textAlign:'center', fontSize:20, fontFamily:'verdana', elevation:13, fontWeight:'bold', margin:10,}}>Book Here</Text>
          <TouchableOpacity
                 onPress={() => setServiceModal(true)}
                 style={[styles.signIn, {
                    borderColor: '#009387',
                    borderWidth: 2,
                    borderBottomWidth:3,
                    marginTop: 15
                }]}
                > 
                {data.servicetype?<Text style={[styles.textSign, {color: '#009387'}]}>{data.servicetype}</Text>
                          :<Text style={[styles.textSign, {color: '#009387'}]}>Select a Service</Text>
                }
                  
            </TouchableOpacity>
            {data.servicetypeerrormessage?<Text style={{color:'red'}}>{data.servicetypeerrormessage}</Text>:null}
            <Modal    
                animation="zoomInUp"
                direction="alternate"
                animationType="slide"
                transparent={false}
                visible={serviceModal}
                onRequestClose={()=>{
                   setServiceModal(false)
                }}
            > 
                <ScrollView>
                    {props.services.map((marker, colors) => (           
                        <TouchableOpacity  
                        onPress={() =>{setData({...data, servicetype:marker.serviceTitle, vechiletype:marker.vechiletype, price:marker.price}), setServiceModal(false)}}
                        key={marker.id} style={{margin:10, padding:10, backgroundColor:colors.background, elevation:4, borderRadius:10,}}>
                            <Text style={{color:colors.text}}>Serive Title: {marker.serviceTitle}</Text>
                            <Text style={{color:colors.text}}>Serive Description: {marker.serviceDescription}</Text>
                            <Text style={{color:colors.text}}>Vechile Type: {marker.vechiletype}</Text>
                            <Text style={{color:colors.text}}>Vechile Price: {marker.price}</Text>                              
                        </TouchableOpacity>
                    ))}
                </ScrollView>   
            </Modal>
            <TouchableOpacity
                 onPress={showDatePicker}
                style={[styles.signIn, {
                    borderColor: '#009387',
                    borderWidth: 2,
                    borderBottomWidth:3,
                    marginTop: 15
                }]}
                > 
                {data.date
                          ?<Text style={[styles.textSign, {color: '#009387'}]}>{data.date}</Text>
                          :<Text style={[styles.textSign, {color: '#009387'}]}>Select Date</Text>
                }
                  
            </TouchableOpacity>
            {data.dateerrormessage?<Text style={{color:'red'}}>{data.dateerrormessage}</Text>:null}
            <TouchableOpacity
                 onPress={showTimePicker}
                style={[styles.signIn, {
                    borderColor: '#009387',
                    borderWidth: 2,
                    borderBottomWidth:3,
                    marginTop: 15
                }]}
                > 
                {data.time
                          ?<Text style={[styles.textSign, {color: '#009387'}]}>{data.time}</Text>
                          :<Text style={[styles.textSign, {color: '#009387'}]}>Select Time</Text>
                }
                  
            </TouchableOpacity>
            {data.timeerrormessage?<Text style ={{color:'red'}}>{data.timeerrormessage}</Text>:null}
            <Text></Text>
            <Text></Text>
           
            <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {handleconfirmBooking(data)}}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Confirm Booking</Text>
                </LinearGradient>
                </TouchableOpacity>
                

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

               <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimePicker}
                onCancel={hideTimePicker}
            /> 
    </Animatable.View>
   )
}

export default Bookingform

const localstyles = StyleSheet.create({
    mainView:{
        width:'97%', 
        flex:1, 
        borderRadius:10,
        padding:10,  
        backgroundColor:"lightgray", 
        height:200,
        maxHeight:Dimensions.get('screen').height * 70/100,
        marginLeft:'1.5%', 
        marginTop:Dimensions.get('screen').height * 10/100, 
        justifyContent:"center", 

    }
})


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