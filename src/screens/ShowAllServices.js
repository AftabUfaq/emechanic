import React,{useContext, useEffect} from 'react';
import { StatusBar, TouchableOpacity, ScrollView,View, Dimensions, StyleSheet , FlatList } from 'react-native';
import {Text, Button,IconButton} from 'react-native-paper' 
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Context as serviceContext} from '../Context/ServiceContext'
import { Flow } from 'react-native-animated-spinkit';
const Showservices = ({navigation}) => {
    const {state:{mechanicservices, loading},fetchmechanicsservices,deleteservice } = useContext(serviceContext);
    useEffect(() => {
            fetchmechanicsservices();    
    },[])
    const { colors } = useTheme();
    const text = colors.placeholdertextcolor ;

  const  renderdataandtimme = (dateandtime) => {
    const d = new Date(dateandtime);
    const z = n => n.toString().length == 1 ? `0${n}` : n // Zero pad
    return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())} ${z(d.getHours())}:${z(d.getMinutes())}`
  }
    const renderbutton = (status) =>{
     if(status === 'approved'){
         return (
        <Button 
        style={{height:22,width:80, marginTop:5,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%', backgroundColor:"green"}}  
        contentStyle={{height:'100%'}} mode="contained" 
        uppercase={false}
        labelStyle={{fontSize:7, fontWeight:'normal'}}>approved</Button>)
     }else if(status === 'pending'){
        return (
            <Button 
            style={{height:22,width:80, marginTop:5,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%', backgroundColor:"#ff4000"}}  
            contentStyle={{height:'100%'}} mode="contained" 
            uppercase={false}
            labelStyle={{fontSize:10, fontWeight:'normal'}}
            onPress={() => console.log('Pressed')}>assign</Button>)
     }else{
        return (
            <Button 
            style={{height:22,width:80, marginTop:5,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%', backgroundColor:"green"}}  
            contentStyle={{height:'100%'}} mode="contained" 
            uppercase={false}
            labelStyle={{fontSize:12, fontWeight:'normal'}}
            onPress={() => console.log('Pressed')}>rejected</Button>)
     }
 }   
if(loading){
    return(
        <View style ={{flex:1 , justifyContent:"center", alignContent:'center', alignItems:'center'}}>
          <Flow size={32} color ="#009783" /> 
          <Text style ={{color:'#009783'}}>Loading ...</Text>
    </View>
    )
}

 if(Object.keys(mechanicservices).length === 0){
     return(
         <View style ={{flex:1 , justifyContent:"center", alignContent:'center', alignItems:'center'}}>
             <Text style={{fontSize:18,fontWeight:'bold', color:colors.text}}> No thing Found</Text>
         </View>
     )
 }
    return (
      <View style={{marginTop:0,}}>
        <StatusBar  backgroundColor="#009387" barStyle="dark-content"/>
           <FlatList 
            data={mechanicservices}
            keyExtractor={(item) =>{
                return item.id
            }}
            onRefresh={()=>fetchmechanicsservices()}
            refreshing={loading}
            renderItem={({item}) =>{
                return(
                <View style={styles.container}>
                    <View style={{flexDirection:"row", justifyContent:'flex-start'}}>
                        <Icon name="ios-notifications" color={'#009387'} size={32} style ={{alignSelf:'center'}} /> 
                
                         <View style={{flexDirection:'column', marginHorizontal:10, width:"61%",}}>
                        <Text style={[styles.servicetitle, {color:text}]}>{item.serviceTitle}{'\n'}{item.vechiletype}: {item.price} </Text>
                                <Text   
                                    ellipsizeMode="tail"
                                    numberOfLines={3} 
                                    style={[styles.serviceDesccription, {color:text, marginTop:0}]}>
                                    {item.serviceDescription}
                                </Text>
                            <View style={{flexDirection:'row', justifyContent:'flex-start',}}>
                                <Text style={[styles.date,{color:text}]}>
                                    {renderdataandtimme(item.timeanddate)}
                                </Text>  
                            </View>
                       </View>  
                
                       <View style={{flexDirection:'column' , width:'25%', alignSelf:'center', backgroundColor:'rgba(0,0,0, 0.2)', paddingVertical:5, borderRadius:4}}>
                           <View style={{flexDirection:"row", flex:1, justifyContent:"space-evenly"}}>
                       <TouchableOpacity>
                       <IconButton 
                                  icon="delete"
                                  onPress={() => deleteservice(item.id)}
                                  color="#d11a0d"
                                  style={{height:30,width:30, marginTop:0,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%',}}  
                                  mode="text"
                                  size={25}
    
                                /> 
                        </TouchableOpacity>        
                        <TouchableOpacity>
                        <IconButton 
                           onPress={() => navigation.navigate('AddServiceScreen',{item})}
                                  icon="square-edit-outline"
                                  color="#d1aa0d"
                                  style={{height:30,width:30, marginTop:0,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%',}}  
                                  mode="text"
                                  size={25}
    
                                />
                        </TouchableOpacity>        
                            </View>    
                          {renderbutton(item.servicestatus)}  
                       </View>
                    </View> 
                </View>
     
                )
            }}
           /> 
        
      </View>
    );
};

export default Showservices;

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
      paddingTop:'1.5%',
      paddingBottom:'1.5%',
    },
    servicetitle:{
        fontSize:14,
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
    serviceDesccription:{ 
        width:Dimensions.get("screen").width * 60/100,
      }
  });