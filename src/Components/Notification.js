import React from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import {Text, Button} from 'react-native-paper' 
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const Notifcation = (props) => {
    const { colors } = useTheme();
    const text = colors.placeholdertextcolor ;
    return (
      <TouchableOpacity style={styles.container}>
         <View style={{flexDirection:"row"}}>
          <Icon name="ios-notifications" color={'#009387'} size={32} style ={{alignSelf:'center'}} /> 
           <View style={{flexDirection:'column', marginHorizontal:10}}>
              <Text style={[styles.problemtitle, {color:text}]}>{props.title}</Text>
                <Text   
                    ellipsizeMode="tail"
                    numberOfLines={3} 
                    style={[styles.problemDesccription, {color:text}]}>
                    {props.description}</Text>
                <View style={{flexDirection:'row', justifyContent:'flex-start',}}>
                <Text style={[styles.date,{color:text}]}>22/01/2020 </Text>  
                 <Text style={[styles.time, {color:text}]}> 11:00 AM </Text>
                 {props.status === 'solved'?
                <Button 
                   style={{height:22,width:100, marginTop:5,  paddingVertical:5, alignSelf:'baseline',marginLeft:'15%', backgroundColor:"green"}}  
                   contentStyle={{height:'100%'}} mode="contained" 
                   uppercase={false}
                   onPress={() => console.log('Pressed')}>{props.status}</Button>
                 :    
                <Button 
                  style={{height:22,width:100, marginTop:5,  alignSelf:'baseline',marginLeft:'15%', backgroundColor:"red"}}   
                  contentStyle={{height:'100%'}} mode="contained" 
                  uppercase={false}
                  onPress={() => console.log('Pressed')}>{props.status}</Button>
                }
                </View>
           </View>  
         </View> 
      </TouchableOpacity>
    );
};

export default Notifcation;
const styles = StyleSheet.create({
  container: {
    borderBottomColor:'#009783',
    borderBottomWidth:0,
    borderRadius:10,
    paddingTop:2,
    minHeight:70,
    width:'100%',
    backgroundColor:'rgba(0, 151, 131,.2)',
    paddingLeft:'2.5%',
    margin:.5,
    paddingTop:'1.5%'
  },
  problemtitle:{
      fontSize:18,
      alignContent:'flex-start',
      fontWeight:'bold'
  },
  date:{
      textAlign:'right',
      paddingVertical:5,
      paddingLeft:1,
  },
  time:{
    textAlign:'left',
    paddingLeft:10,
    paddingVertical:5,
  },
  problemDesccription:{ 
      width:Dimensions.get("screen").width - 40,
    }
});
