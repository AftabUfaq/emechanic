import {StyleSheet,Dimensions,} from 'react-native'
const {height} = Dimensions.get("screen");
const height_information_view = height * 0.18;
const appcolor ='#009387'
const styles = StyleSheet.create({
    
    container: {
      flex: 1, 
      backgroundColor:'transparent'   
    },
    informationView:{
       elevation:5,
       height:height_information_view,
       margin:10,
       borderRadius:10,
       
    },
    mainView:{
        flexDirection:"row", 
        justifyContent:'space-around'
    },
    homeIconView:{
        height:120,
        width:120,
        borderRadius:30,
        margin:25,
        elevation:3,
    },
    text:{
        fontSize:16,
        fontWeight:'400',
        fontFamily:'serif',
        textDecorationLine:'underline',
               
    },
    
  });


export default styles ;