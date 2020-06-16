import {StyleSheet,Dimensions,Platform} from 'react-native'
const {height} = Dimensions.get("screen");
const height_information_view = height * 0.18;
const appcolor ='#009387'
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:appcolor
      },
      header: {
          flex: .4,
          justifyContent:'center',
          height:30,
          paddingHorizontal: 20,
          paddingBottom: 10,
      },
      header2:{
        height:70,
        borderRadius:10,
        borderColor:"#009388",
        elevation:2,
        borderWidth:0,
        backgroundColor:"transparent",
        justifyContent:'center',
        alignContent:'center'
     },
      footer: {
          flex: 3,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      text_header: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 18,
          alignSelf:"center"
      },
      text_footer: {
          color: '#05375a',
          fontSize: 18
      },
      action: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 5
      },
      actionError: {
          flexDirection: 'row',
          marginTop:5,
          borderBottomWidth: 1,
          borderBottomColor: '#FF0000',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : -12,
          paddingLeft: 10,
          color: '#05375a',
      },
      errorMsg: {
          color: '#FF0000',
          fontSize: 14,
      },
      button: {
          alignItems: 'center',
          marginTop: 50
      },
      signIn: {
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10
      },
      textSign: {
          fontSize: 18,
          fontWeight: 'bold'
      },
      textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    modalView:{
        padding:20,
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white",
        height:height_information_view*1.4
  
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    root:{
        flex:1
    },
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },      
      mycard:{
         marginTop:2,
         marginHorizontal:5,
         borderRadius:10,
       },
      
       cardContent:{
        flexDirection:"row",
        paddingVertical:13,
        paddingHorizontal:5,
        elevation:0,
        backgroundColor:"rgba(0,0,0,.03)",
        borderRadius:5,
      },
       mytext:{
        fontSize:14,
        marginTop:3,
        marginLeft:5,
        fontWeight:'bold'
        },
       profileicon:{
         marginLeft:"2%",
        alignItems:"center",
        alignSelf:'center'
        } 
  });


export default styles ;