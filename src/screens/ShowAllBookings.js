import React ,{useContext, useEffect} from 'react';
import { StatusBar, TouchableOpacity, ScrollView,View, Dimensions, StyleSheet , FlatList } from 'react-native';
import {Text, Button,IconButton} from 'react-native-paper' 
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../Context/AuthContext'
import {Context as BookingContext} from '../Context/BookingContext'
const BookingListScreen =  ({navigation}) => {
  const {state:{accounttype}} = useContext(AuthContext);
  const {state:{bookings, loading}, fectchallbookings, confirmbooking, deletebooking} = useContext(BookingContext);
  const { colors } = useTheme();
  const text = colors.placeholdertextcolor ;
  
  useEffect(() =>{
    if(navigation.isFocused()){
    fectchallbookings(accounttype);
    }
  },[])


  const renderbutton = (status, accounnttype) =>{
    if(status === 'requested'){
        return (
       <Button 
       style={{height:22,width:80, marginTop:5,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%', backgroundColor:"#32a893"}}  
       contentStyle={{height:'100%'}} mode="contained" 
       uppercase={false}
       labelStyle={{fontSize:10, fontWeight:'normal'}}
       onPress={() => console.log('Pressed')}>Requested</Button>)
    }else if(status === 'confrimed'){
       return (
           <Button 
           style={{height:22,width:80, marginTop:5,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%', backgroundColor:"green"}}  
           contentStyle={{height:'100%'}} mode="contained" 
           uppercase={false}
           labelStyle={{fontSize:10, fontWeight:'normal'}}
           onPress={() => console.log('Pressed')}>confirm</Button>)
    }else if(status === 'rejected'){
      return (
          <Button 
          style={{height:22,width:80, marginTop:5,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%', backgroundColor:"red"}}  
          contentStyle={{height:'100%'}} mode="contained" 
          uppercase={false}
          labelStyle={{fontSize:10, fontWeight:'normal'}}
          onPress={() => console.log('Pressed')}>rejected</Button>)
   }
    else{
       return (null)
    }
}   

if(Object.keys(bookings).length === 0){
    return(
        <View style ={{flex:1 , justifyContent:"center", alignContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:18,fontWeight:'bold', color:colors.text}}>No Bookings</Text>
        </View>
    )
}

  if(accounttype === "Customer"){ 
  return (
    <View style={{marginTop:0,}}>
      <StatusBar  backgroundColor="#009387" barStyle="dark-content"/>
         <FlatList 
          data={bookings}
          keyExtractor={(item) =>{
              return item.id
          }}
          onRefresh={()=>fectchallbookings(accounttype)}
          refreshing={loading}
          renderItem={({item}) =>{
              return(
              <View style={styles.container}>
                  <View style={{flexDirection:"row", justifyContent:'flex-start'}}>
                      <Icon name="ios-notifications" color={'#009387'} size={32} style ={{alignSelf:'center'}} />           
                      <View style={{flexDirection:'column', marginHorizontal:10, width:"61%",}}>
                          <Text style={[styles.problemtitle, {color:text}]}> <Text style={[styles.problemtitle, {color:"blue", textDecorationLine:"underline"}]}>Service Type:</Text> {item.service_type}
                           {'\n'} <Text style={[styles.problemtitle, {color:'blue', textDecorationLine:"underline"}]}>Vechile Type:</Text>  {item.vechile_type}
                          </Text>
                              <Text   
                                  ellipsizeMode="tail"
                                  numberOfLines={3} 
                                  style={[styles.problemDesccription, {color:text, marginTop:0}]}>
                                 <Text style ={{color:'blue'}}> Price:</Text>  {item.price} {'\n'}<Text style ={{color:'blue'}}> Date:</Text> {item.date} {'\n'}<Text style ={{color:'blue'}}> Time:</Text>  {item.time}
                              </Text>
                          <View style={{flexDirection:'row', justifyContent:'flex-start',}}>
                              <Text style={[styles.date,{color:text}]}>{item.timeanddate} </Text>  
                          </View>
                     </View>  
              
                     <View style={{flexDirection:'column' , width:'25%', alignSelf:'center', backgroundColor:'rgba(0,0,0, 0.2)', paddingVertical:5, borderRadius:4}}>
                     {item.status !== 'completed'?
                    <View style={{flexDirection:"row", flex:1, justifyContent:"space-evenly"}}>
                     <TouchableOpacity>
                     <IconButton 
                                icon="delete"
                                onPress={() => deletebooking(item.id)}
                                color="#009387"
                                style={{height:30,width:30, marginTop:0,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%',}}  
                                mode="text"
                                size={25}
  
                              /> 
                      </TouchableOpacity>        
                      <TouchableOpacity>
                      <IconButton 
                         onPress={() =>console.log('Edited')}
                                icon="square-edit-outline"
                                color="#009387"
                                style={{height:30,width:30, marginTop:0,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%',}}  
                                mode="text"
                                size={25}
  
                              />
                      </TouchableOpacity>   
                      </View>:
                      <View style={{flexDirection:"row", flex:1, justifyContent:'center'}}>
                         <Button  
                         icon='star'
                        style={{height:50,width:80, marginTop:5,  paddingVertical:0, alignSelf:'center',marginLeft:'3%', backgroundColor:"yellow"}}  
                        contentStyle={{height:'100%'}} mode="contained" 
                        uppercase={false}
                        labelStyle={{fontSize:12, fontWeight:'normal', color:'red'}}
                        onPress={() => {console.log('rate')}}
                        >
                       Rate
                      </Button>       
                      </View>}     
                              
                        {renderbutton(item.status, accounttype)}  
                     </View>
                  </View> 
              </View>
   
              )
          }}
         /> 
      
    </View>
  );
  } else if(accounttype === "Mechanic"){
    return (
      <View style={{marginTop:0,}}>
        <StatusBar  backgroundColor="#009387" barStyle="dark-content"/>
           <FlatList 
            data={bookings}
            keyExtractor={(item) =>{
                return item.id
            }}
            onRefresh={()=>fectchallbookings(accounttype)}
            refreshing={loading}
            renderItem={({item}) =>{
                return(
                <View style={styles.container}>
                    <View style={{flexDirection:"row", justifyContent:'flex-start'}}>
                        <Icon name="ios-notifications" color={'#009387'} size={32} style ={{alignSelf:'center'}} />           
                        <View style={{flexDirection:'column', marginHorizontal:10, width:"61%",}}>
                          <Text style={[styles.problemtitle, {color:text}]}> <Text style={[styles.problemtitle, {color:"blue", textDecorationLine:"underline"}]}>Service Type:</Text> {item.service_type}
                           {'\n'} <Text style={[styles.problemtitle, {color:'blue', textDecorationLine:"underline"}]}>Vechile Type:</Text>  {item.vechile_type}
                          </Text>
                              <Text   
                                  ellipsizeMode="tail"
                                  numberOfLines={3} 
                                  style={[styles.problemDesccription, {color:text, marginTop:0}]}>
                                 <Text style ={{color:'blue'}}> Price:</Text>  {item.price} {'\n'}<Text style ={{color:'blue'}}> Date:</Text> {item.date} {'\n'}<Text style ={{color:'blue'}}> Time:</Text>  {item.time}
                              </Text>
                          <View style={{flexDirection:'row', justifyContent:'flex-start',}}>
                              <Text style={[styles.date,{color:text}]}>{item.timeanddate} </Text>  
                          </View>
                     </View>  
                       <View 
                        style={{flexDirection:'column' , width:'25%', alignSelf:'center', backgroundColor:'rgba(0,0,0, 0.2)', paddingVertical:5, borderRadius:4}}>
                          {item.status !== 'completed'?
                          <View style={{flexDirection:"row", flex:1, justifyContent:"space-evenly"}}>
                              <TouchableOpacity>
                                <IconButton 
                                  icon="check"
                                  onPress={() => confirmbooking(item.id, item.status , 'confrimed')}
                                  color="green"
                                  style={{height:30,width:30, marginTop:0,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%',}}  
                                  mode="text"
                                  size={25}
    
                                /> 
                              
                              </TouchableOpacity>        
                        
                              <TouchableOpacity>
                                <IconButton 
                                  onPress={() => confirmbooking(item.id, item.status , 'rejected') }
                                  icon="close"
                                  color="red"
                                  style={{height:30,width:30, marginTop:0,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%',}}  
                                  mode="text"
                                  size={25}
    
                                />
                              </TouchableOpacity>       
                            </View>:
                            <View style={{flexDirection:"row", flex:1, justifyContent:'center'}}>
                               <Button  
                               icon='star'
                              style={{height:50,width:80, marginTop:5,  paddingVertical:0, alignSelf:'center',marginLeft:'3%', backgroundColor:"yellow"}}  
                              contentStyle={{height:'100%'}} mode="contained" 
                              uppercase={false}
                              labelStyle={{fontSize:12, fontWeight:'normal', color:'red'}}
                              onPress={() => {console.log('rate')}}
                              >
                             Rate
                            </Button>       
                            </View>}
                            {item.status === "confrimed"?    
                              <Button 
                              compact={true}
                              icon="check" 
                              style={{height:50,width:80, marginTop:5,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%', backgroundColor:"green"}}  
                              contentStyle={{height:'100%'}} mode="contained" 
                              uppercase={false}
                              labelStyle={{fontSize:12,  fontWeight:'normal',}}
                              onPress={() => confirmbooking(item.id, item.status, 'completed')}
                              >
                              Mark as completed
                            </Button>:null}        
                          {renderbutton(item.status)}  
                       </View>
                    </View> 
                </View>
     
                )
            }}
           /> 
        
      </View>
    );
  }   
};

export default BookingListScreen;
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
  problemtitle:{
      fontSize:13,
      alignContent:'flex-start',
    //  fontWeight:'bold'
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
      width:Dimensions.get("screen").width * 60/100,
    }
});