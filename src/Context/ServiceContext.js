import createDataContext from './createDataContext'
import firebase from 'react-native-firebase'
const servicesreducer = (state, action) =>{
    switch(action.type){
        case 'FETCH_SERVICES':
            return{
                ...state,
                services:action.payload,
                loading:false
            }
        case "SETLOADING":
            return {
                ...state,
                loading:action.payload,
            }        
        case "FETCHMECHANICSERVICES":
            return{
                ...state,
                mechanicservices:action.payload,
                loading:false
            }    
        default:
            return state ;
    }
}


const addservice = dispatch => async (title, description, type, price) => {
    dispatch({type:"SETLOADING" , payload:true})
    let user =  firebase.auth().currentUser ;
     var newservicekey = firebase.database().ref().child('services').push().key;
     firebase.database().ref('services/' + newservicekey).set({
      userid: user.uid,
      serviceDescription:description,
      serviceTitle:title,
      vechiletype:type,
      servicestatus:'approved',
      timeanddate: new Date(), 
      price:price,
    }).then(() =>{
        dispatch({type:"SETLOADING" , payload:false})  
      alert("service Added. It Will Be approved By Admin");
    }).catch(() => {
      alert("Some Error Occured Please Try Again");
    })
  }

const updateservice = dispatch => (id, title, desc, type, price ) =>{
    dispatch({type:"SETLOADING" , payload:true})
   firebase.database().ref('services/'+ id).update({
    serviceDescription:desc,
    serviceTitle:title,
    vechiletype:type,
    price:price,
}).then(() =>{
    dispatch({type:"SETLOADING" , payload:false})
    alert("Probelm Edited Succseeffuly :)")
}).catch((err)=>{
    dispatch({type:"SETLOADING" , payload:false})
    alert(err.message);
})
}

const deleteservice  = dispatch => (id) =>{
    firebase.database().ref('services/'+ id).remove().then(() =>{
        alert("service Delted Sussessfully");
    }).catch((err) =>{
           alert(err.message)
    })
}



const fetchservices = dispatch => () =>{
    dispatch({type:'SETLOADING', payload:true})
    firebase.database().ref('Services').once('value').then(snapshot => {
        let services = [];
        snapshot.forEach((child) => {
          services.push({
             value:child.val().Service,
             label:child.val().Service
          });
        });
    dispatch({type:'FETCH_SERVICES', payload:services})    
    dispatch({type:'SETLOADING', payload:false}
    )
    }) 
}
const fetchmechanicsservices = dispatch =>() =>{
    console.log('fecth mechanic services')
    dispatch({type:"SETLOADING" , payload:true})
    let user =  firebase.auth().currentUser ;
    firebase.database().ref('services').orderByChild('userid').equalTo(user.uid)
    .once('value' )
    .then(snapshot => {
      var items = [];
       snapshot.forEach((child) => {
         items.push({
          id: child.key,
          serviceDescription: child.val().serviceDescription,
          serviceTitle: child.val().serviceTitle,
          servicestatus: child.val().servicestatus,
          vechiletype:child.val().vechiletype,
          price: child.val().price,
          timeanddate:child.val().timeanddate
         });
      });
     dispatch({type:"FETCHMECHANICSERVICES", payload:items}) 
    })
    .catch(error => console.log(error));
}

export const {Provider, Context}  = createDataContext(
    servicesreducer,
    {addservice, updateservice, deleteservice, fetchservices, fetchmechanicsservices},
    {services:[],errormessage:"",loading:false, mechanicservices:[]}
)