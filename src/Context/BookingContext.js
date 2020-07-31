import createDataContext from './createDataContext'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'

const bookingreducer = (state, action) =>{
    switch(action.type){
        case 'FETCH_MECHANICS':
            return{
                ...state,
                mechanicsarray:action.payload
            }
        case 'GET_MECHANIC_DATA':
            return {
                ...state, 
                mechanicdata:action.payload
            }  
        case 'FETCH_SERVICES':
            return{
                ...state,
                services:action.payload
            }  
        case 'BOOKING_LIST':
            return{
                ...state,
                bookings:action.payload,
                loading:false
            }        
        default:
            return state ;
    }
}


const fetchmechanics = dispatch => () =>{
  //  console.log('booking')
    firebase.database().ref('locations').orderByChild('type').equalTo("Mechanic").once('value')
    .then(snapshot => {
      var items = [];
          snapshot.forEach((child) => {
                items.push({
                key: child.key,
                latitude:child.val().position.coords.latitude,
                longitude:child.val().position.coords.longitude, 
                });
            });
         console.log(items);   
         dispatch({type:"FETCH_MECHANICS", payload:items});
     })
    .catch(error => console.log(error));
}


const mechanchicdetails = dispatch => (id)=>{
    firebase.database().ref('users/' + id).once('value', data => {
        console.log('Mecanic Detals functionn', data) ;
        dispatch({type:'GET_MECHANIC_DATA', payload:data.toJSON()})
    }).catch((error) =>{
         alert('Error');
     })
}


const fecthservices = dispatch => async(id) =>{
    firebase.database().ref('services').orderByChild('userid').equalTo(id)
       .once('value' )
       .then(snapshot => {
         var items = [];
          snapshot.forEach((child) => {
           items.push({
          id: child.key,
          serviceDescription: child.val().serviceDescription,
          serviceTitle: child.val().serviceTitle,
          servicestatus: child.val().servicestatus,
          price: child.val().price,
          vechiletype:child.val().vechiletype,
       });
       dispatch({type:'FETCH_SERVICES', payload:items})
    });
  })
  .catch(error => console.log(error));
}


const confirmbooking = dispatch => async(id, status, updatestatus) =>{
   if(status !== updatestatus)
   {
    firebase.database().ref('Booking/'+id).update({
      status:updatestatus
    })
   }
  
}


const updatebooking = dispatch => async(id) =>{
     
}


const deletebooking = dispatch => async(id) =>{
    firebase.database().ref('Booking/'+id).remove(function(error){
        if(error){
           alert("Some Error")
        }else{
            alert("Deleted Succssfully")
        }
    })
}

const fectchallbookings = dispatch => async(acct) =>{
    let user =  firebase.auth().currentUser ;
    if(acct === "Mechanic"){
        query = firebase.database().ref('Booking').orderByChild('mechanic_id')
    }else{
        query = firebase.database().ref("Booking").orderByChild('customer_id')
    }
    query.equalTo(user.uid).once('value').then((snapshot) =>{
    var items = [];
    snapshot.forEach((child) => {
      items.push({
         id: child.key,
         mechanic_id:child.val().mechanic_id,
         customer_id:child.val().customer_id,
         service_type: child.val().service_type,
         vechile_type: child.val().vechile_type,
         price: child.val().price,
         date: child.val().date,
         time: child.val().time,
         dateandtime:child.val().dateandtime,
         status:child.val().status
      });
   });
   console.log('list', items)
   dispatch({type:"BOOKING_LIST",  payload:items})
 })
}


const savebooking = dispatch => async(mid, stype, vtype,price, date, time ) =>{
 var booking_id = firebase.database().ref().child("Booking").push().key;
 let user =  await firebase.auth().currentUser ;
 firebase.database().ref('Booking/'+ booking_id).set({   
     mechanic_id:mid,
     customer_id:user.uid,
     service_type:stype,
     vechile_type:vtype,
     price:price,
     date:date,
     time:time,
     dateandtime: new Date(),
     status:'requested'
 }).then(() =>{
       console.log('success')
 }).catch(() =>{
     console.log('Some Error')
 })

}



export const {Provider, Context}  = createDataContext(
    bookingreducer,
    {fecthservices, mechanchicdetails,fetchmechanics,savebooking,fectchallbookings, updatebooking,deletebooking,confirmbooking},
    {mechanicsarray:[], mechanicdata:"",services:[], bookings:[], loading:true}
)