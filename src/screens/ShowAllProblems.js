import React,{useContext, useEffect} from 'react';
import { StatusBar, TouchableOpacity, ScrollView,View, Dimensions, StyleSheet , FlatList } from 'react-native';
import {Text, Button,IconButton} from 'react-native-paper' 
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Context as ProblemContext} from '../Context/ProblemContext'

const ShowProblems = ({navigation}) => {
    const {state:{problems, loading},fetchallproblems,deleteproblem } = useContext(ProblemContext);
    useEffect(() => {
        if(navigation.isFocused()){
            fetchallproblems();
        }
    },[])
    const { colors } = useTheme();
    const text = colors.placeholdertextcolor ;

 const renderbutton = (status) =>{
     if(status === 'initiated'){
         return (
        <Button 
        style={{height:22,width:80, marginTop:5,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%', backgroundColor:"#32a893"}}  
        contentStyle={{height:'100%'}} mode="contained" 
        uppercase={false}
        labelStyle={{fontSize:10, fontWeight:'normal'}}
        onPress={() => console.log('Pressed')}>initiated</Button>)
     }else if(status === 'assigned'){
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
            onPress={() => console.log('Pressed')}>solved</Button>)
     }
 }   

 if(Object.keys(problems).length === 0){
     console.log('ddddd');
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
            data={problems}
            keyExtractor={(item) =>{
                return item.id
            }}
            onRefresh={()=>fetchallproblems()}
            refreshing={loading}
            renderItem={({item}) =>{
                return(
                <View style={styles.container}>
                    <View style={{flexDirection:"row", justifyContent:'flex-start'}}>
                        <Icon name="ios-notifications" color={'#009387'} size={32} style ={{alignSelf:'center'}} /> 
                
                        <View style={{flexDirection:'column', marginHorizontal:10, width:"61%",}}>
                            <Text style={[styles.problemtitle, {color:text}]}>{item.problemTitle}</Text>
                                <Text   
                                    ellipsizeMode="tail"
                                    numberOfLines={3} 
                                    style={[styles.problemDesccription, {color:text, marginTop:0}]}>
                                    {item.problemDescription}
                                </Text>
                            <View style={{flexDirection:'row', justifyContent:'flex-start',}}>
                                <Text style={[styles.date,{color:text}]}>{item.timeanddate} </Text>  
                            </View>
                       </View>  
                
                       <View style={{flexDirection:'column' , width:'25%', alignSelf:'center', backgroundColor:'rgba(0,0,0, 0.2)', paddingVertical:5, borderRadius:4}}>
                           <View style={{flexDirection:"row", flex:1, justifyContent:"space-evenly"}}>
                       <TouchableOpacity>
                       <IconButton 
                                  icon="delete"
                                  onPress={() => deleteproblem(item.id)}
                                  color="#009387"
                                  style={{height:30,width:30, marginTop:0,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%',}}  
                                  mode="text"
                                  size={25}
    
                                /> 
                        </TouchableOpacity>        
                        <TouchableOpacity>
                        <IconButton 
                           onPress={() => navigation.navigate('AddProblemScreen',{item})}
                                  icon="square-edit-outline"
                                  color="#009387"
                                  style={{height:30,width:30, marginTop:0,  paddingVertical:0, alignSelf:'baseline',marginLeft:'5%',}}  
                                  mode="text"
                                  size={25}
    
                                />
                        </TouchableOpacity>        
                            </View>    
                          {renderbutton(item.problemstatus)}  
                       </View>
                    </View> 
                </View>
     
                )
            }}
           /> 
        
      </View>
    );
};

export default ShowProblems;

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
        width:Dimensions.get("screen").width * 60/100,
      }
  });