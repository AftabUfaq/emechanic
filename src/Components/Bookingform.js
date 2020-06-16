import React, { useState } from 'react'
import {Text, StyleSheet,  TouchableOpacity} from 'react-native'
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LinearGradient from 'react-native-linear-gradient';
import styles from '../screens/Styles/authstyles'
const Bookingform = () =>{
    const [data, setData] = useState({
        name:"",
        date:null,
        time:""
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
          console.log(date)
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
      //  hideDatePicker();
      };

    
const cnichandler  = () =>{
    console.log('kkk');
}

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
    return(
    <Animatable.View      
        direction="alternate"
        animationType="slide"
        duration={1}
        style={localstyles.mainView}>
          <Text style={{textAlign:'center', fontSize:20, fontFamily:'verdana', elevation:3, fontWeight:'bold', margin:10,}}>Book Here</Text>
            <TouchableOpacity
                 onPress={showDatePicker}
                style={[styles.signIn, {
                    borderColor: '#009387',
                    borderWidth: 2,
                    borderBottomWidth:3,
                    marginTop: 15
                }]}
                > 
                {data.date?<Text style={[styles.textSign, {color: '#009387'}]}>{data.date}</Text>
                          :<Text style={[styles.textSign, {color: '#009387'}]}>Select Date</Text>
                }
                  
            </TouchableOpacity>

            <TouchableOpacity
                 onPress={showTimePicker}
                style={[styles.signIn, {
                    borderColor: '#009387',
                    borderWidth: 2,
                    borderBottomWidth:3,
                    marginTop: 15
                }]}
                > 
                {data.time?<Text style={[styles.textSign, {color: '#009387'}]}>{data.time}</Text>
                          :<Text style={[styles.textSign, {color: '#009387'}]}>Select Time</Text>
                }
                  
            </TouchableOpacity>

            <Text></Text>
            <Text></Text>

            <TouchableOpacity
                    style={styles.signIn}
                //    onPress={() => {SignUpHandle(data.email, data.password, data.confirm_password)}}
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
        borderRadius:20,  
        backgroundColor:"white", 
        height:200,
        maxHeight:400,
        marginLeft:'1.5%', 
        marginTop:'30%', 
        justifyContent:"center", 
    }
})