import React from 'react'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase'

const authReducer = (state, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
          
        };
      case 'LOGIN': 
        return {
          ...state,
        //  userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...state,
          userToken: null,
          isLoading: false,
          accounttype:null,
          profiledata:null,
          errormessage:"", 
          imageuri:"", 
          imageuploadprogress:0,
        };
      case 'REGISTER': 
        return {
          ...state,
          userProfileData:null,
      //    userToken: action.payload,
          isLoading: false,
          isauthenticating:false,
        };
      case 'TOGGLE_THEME':
          return{
            ...state,
            isDarkTheme: !state.isDarkTheme  
        }
      case 'ACCOUNT_TYPE':
          return{
            ...state,
            accounttype:action.payload
        }  
      case 'COMPLETEPROFILE':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
          }
      case "ADD_ERROR":
        return {
          ...state,
          errormessage:action.payload,
          isauthenticating:false, 
        }  
      case 'CLEARERRORMESSAGE':
        return{
          ...state,
          errormessage:''
        }
        case "ISAUTHUTICATING":
          return{
            ...state,
            isauthenticating:action.payload
          }
        case"IMAGE_UPLOADPROGRESS":
        return{
          ...state,
          imageuploadprogress:action.payload
        }  
        case "SETIMAGEURI":
          return{
            ...state,
            imageuri:action.payload
          }
        case "SETPROFILEDATA":
          return{
            ...state,
            profiledata:action.payload,
            isauthenticating:false
          }
       case "BACKGROUNDTASK":
         return{
           ...state,
           heartbeat:action.payload
         }   
      default:
        return state  
    }
  };
 

  const signIn  = dispatch => async(email, password, accounttype, nav) => {
    dispatch({type:"ISAUTHUTICATING", payload:true})
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(async (result) =>{
      // await AsyncStorage.setItem('userToken', JSON.stringify(result));
     let account = await AsyncStorage.getItem("@accounttype")
     if(account === accounttype){
          // let profiledata = await AsyncStorage.getItem("@profiledata")
          //  if(JSON.parse(profiledata) !== ''){
            await AsyncStorage.setItem('userToken', JSON.stringify(result));
          // await AsyncStorage.setItem('@accounttype', accounttype);
          // await AsyncStorage.setItem('@profiledata', JSON.stringify())      
            dispatch({type:'RETRIEVE_TOKEN', token:result});
            dispatch({type:'ACCOUNT_TYPE', payload:accounttype});
          // dispatch({type:"SETPROFILEDATA", payload:JSON.parse(profiledata)})    
          //  }else{
            dispatch({type:"ISAUTHUTICATING", payload:false})
                  nav('CompleteProfileScreen');
          // }
     }else{
      firebase.database().ref('users/' + result.user.uid).once('value', async (profiledata) => {
       let profile = profiledata.toJSON() ;
        if(profile.role === accounttype){
              await AsyncStorage.setItem('@accounttype', accounttype);
              await AsyncStorage.setItem('userToken', JSON.stringify(result));
              await AsyncStorage.setItem('@profiledata', JSON.stringify(profiledata))           
              dispatch({type:'RETRIEVE_TOKEN', token:result});
              dispatch({type:'ACCOUNT_TYPE', payload:accounttype});
              dispatch({type:"SETPROFILEDATA", payload:profiledata.toJSON()})    
            }else{
              dispatch({type:"ADD_ERROR", payload:"Invaild Accounttype Selected, Please Signup with another Account"})
            }
      }).catch(error =>{
        dispatch({type:"ADD_ERROR", payload:error.message})
      })
     }
    }).catch(error =>{
      dispatch({type:"ADD_ERROR", payload:error.message})
    })
  }



  const signUp  = dispatch => async(nav, email,  password,accounttype) => {
    dispatch({type:"ISAUTHUTICATING", payload:true})
    firebase.auth().createUserWithEmailAndPassword(email, password).then(async result =>{
      await AsyncStorage.setItem("@accounttype", accounttype) 
      dispatch({type:"ISAUTHUTICATING", payload:false})
    // dispatch({type:"REGISTER",payload:result})
     nav.navigate('CompleteProfileScreen')
    }).catch(err =>{
          dispatch({type:"ADD_ERROR", payload:err.message})
    });
   }


   const signOut = dispatch => async()=>{
    try{
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('@accounttype');
      await AsyncStorage.removeItem('@profiledata')
    }catch(e) {
      console.log(e);
    }
    dispatch({ type: 'LOGOUT' });
  }

  const clearerrormessage  = dispatch => () => {
    dispatch({type:"CLEARERRORMESSAGE"})
  }
  const LocalSignIn = dispatch => async()=>{
    setTimeout(async() => {
        let userToken = null;
        let accounttype = null; 
        let profiledata = null;        
        try {
           userToken = await AsyncStorage.getItem('userToken');
           accounttype = await AsyncStorage.getItem('@accounttype')
           profiledata = await AsyncStorage.getItem('@profiledata')

        } catch(e) {
          console.log(e);
        }
        dispatch({type:'RETRIEVE_TOKEN', token: JSON.parse(userToken)});
        dispatch({type:'ACCOUNT_TYPE', payload:accounttype});
        dispatch({type:"SETPROFILEDATA", payload:JSON.parse(profiledata)})
      }, 1000);
  }

  const  toggleTheme = dispatch => () => {
      dispatch({type:"TOGGLE_THEME",})
  }

  const selectaccount = dispatch => async (accounttype, nav) => {
    try {
    //  await AsyncStorage.setItem("@accounttype", accounttype)
      dispatch({type:'ACCOUNT_TYPE', payload:accounttype}) 
      nav.navigate('SignInScreen')
    }catch(err){

    }
  }
  
  const completeprofile = dispatch => async (name, address,cnic, phone,imageuri,accounttype, nav) =>{
    let userinfo=  await firebase.auth().currentUser ;
    dispatch({type:"ISAUTHUTICATING"})
 //   console.log('auth nav',nav)
    let fcmToken =  await firebase.messaging().getToken();
    let profiledata = {
      uid:userinfo.uid,
      email:userinfo.email,
      role:accounttype, 
      name:name,
      photoURl:imageuri,
      address:address,
      cnic:cnic,
      phoneNumber:phone,
      FCM:fcmToken,  
    } 
    firebase.database().ref('users/' + userinfo.uid).set(profiledata, async function(error){
      if(error){
    dispatch({type:"ADD_ERROR", payload:"Some thng Went Wrong while updateing your Profile"})
    }else{      
          dispatch({type:"SETPROFILEDATA", payload:profiledata})
            await AsyncStorage.setItem('@profiledata', JSON.stringify(profiledata));
            Geolocation.getCurrentPosition((position) => {
              firebase.database().ref('locations/' + userinfo.uid).set({
                  type:accounttype,
                  position:position
              }).then(() =>{

              }).catch(() => {
                dispatch({type:"ADD_ERROR", payload:"Some thng Went Wrong while updateing your Profile"})
              })
              },
               (error) => {
                         console.log(error.code, error.message);
                       },
                      {
                          enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 
                      }
              )
        nav.navigate('SignInScreen');      
        } // else Ended Here

  })
  }

const uploaduserimage = dispatch => (imageuri) =>{
  const ext = imageuri.split('.').pop(); // Extract image extension
  const filename = `xxximage.${ext}`; // Generate unique name
  firebase.storage().ref(`Customer/images/${filename}`)
    .putFile(imageuri).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
          let   progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100  
           dispatch({type:"IMAGE_UPLOADPROGRESS", payload:progress})
           if (firebase.storage.TaskState.SUCCESS) {
              dispatch({type:"SETIMAGEURI", payload:snapshot.downloadURL})
            }
      },
      error => {
        dispatch({type:"ADD_ERROR", payload:error.message})
      }
    );
}


const setbackgroundtask = dispatch =>(val) =>{
  dispatch({type:'BACKGROUNDTASK', payload:val})
}
export const {Provider, Context } = createDataContext(
    authReducer,
    {uploaduserimage, setbackgroundtask, signIn, signOut, signUp,  LocalSignIn, toggleTheme, selectaccount, completeprofile, clearerrormessage }, 
    { isauthenticating:false, userName: null,userToken: null,isLoading:true, isDarkTheme:false, accounttype:null, 
      errormessage:"",heartbeat:false, imageuri:"", imageuploadprogress:0, profiledata:null, }
    );