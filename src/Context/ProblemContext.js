import createDataContext from './createDataContext'
import firebase from 'react-native-firebase'
const problemreducer = (state, action) =>{
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
            case "FETCHPROBLEMSLIST":
                return{
                    ...state,
                    loading:false,
                    problems:action.payload
                }    
        default:
            return state ;
    }
}


const addproblem = dispatch => async (title, description,latitude, longitude) => {
      dispatch({type:"SETLOADING" , payload:true})
    let location = {
        latitude:latitude,
        longitude:longitude
    }
    let user =  await firebase.auth().currentUser ;
     var problemkey = firebase.database().ref().child('Problems').push().key;
     firebase.database().ref('Problems/' + problemkey).set({
      userid: user.uid,
      problemTitle:title,
      problemDescription:description,
      problemstatus:'initiated',
      timeanddate:new Date().toLocaleString(), 
      location:location,
    }).then(() =>{
        dispatch({type:"SETLOADING" , payload:false})
        alert("Problem Posted")
    }).catch(() => {
        dispatch({type:"SETLOADING" , payload:false})
        alert("Some Error Occured Please Try Again");

    }); 
}

const updateproblem = dispatch => (id, title, description, latitude, longitude) =>{
    dispatch({type:"SETLOADING" , payload:true})
    let location = {
        latitude:latitude,
        longitude:longitude
    }
firebase.database().ref('Problems/'+ id).update({
    problemTitle:title,
    problemDescription:description,
    problemstatus:'updated',
    timeanddate:new Date().toLocaleString(), 
    location:location,
}).then(() =>{
    dispatch({type:"SETLOADING" , payload:false})
    alert("Probelm Edited Succseeffuly :)")
}).catch((err)=>{
    dispatch({type:"SETLOADING" , payload:false})
    alert(err.message);
})
}

const deleteproblem  = dispatch => (id) =>{
    firebase.database().ref('Problems/'+ id).remove().then(() =>{
        alert("Problem Delted Sussessfully");
    }).catch((err) =>{
           alert(err.message)
    })

}

const fetchallproblems = dispatch => () =>{  
    dispatch({type:"SETLOADING" , payload:true})
    let user =  firebase.auth().currentUser ;
    firebase.database().ref('Problems').orderByChild('userid').equalTo(user.uid)
    .once('value' )
    .then(snapshot => {
      var items = [];
       snapshot.forEach((child) => {
         items.push({
            id: child.key,
            problemDescription: child.val().problemDescription,
            problemTitle: child.val().problemTitle,
            problemstatus: child.val().problemstatus,
            timeanddate: child.val().timeanddate,
         });
      });
     dispatch({type:"FETCHPROBLEMSLIST", payload:items}) 
    })
    .catch(error => console.log(error));
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
export const {Provider, Context}  = createDataContext(
    problemreducer,
    {addproblem, updateproblem,deleteproblem,fetchallproblems,fetchservices},
    {services:[],loading:false, problems:[]}
)