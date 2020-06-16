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
            case "SETLOADIG":
                return {
                    ...state,
                    loading:true,
                }
        default:
            return state ;
    }
}


const addproblem = dispatch => () => {
    let problemloading=false ;

}

const updateproblem = dispatch => () =>{

}

const deleteproblem  = dispatch => () =>{

}

const fetchallproblems = dispatch => () =>{  
}

const fetchservices = dispatch => () =>{
    dispatch({type:'SETLOADING'})
    firebase.database().ref('Services').once('value').then(snapshot => {
        let services = [];
        snapshot.forEach((child) => {
          services.push({
             value:child.val().Service,
             label:child.val().Service
          });
        });
    dispatch({type:'FETCH_SERVICES', payload:services})     
       }) 
}
export const {Provider, Context}  = createDataContext(
    problemreducer,
    {addproblem, updateproblem,deleteproblem,fetchallproblems,fetchservices},
    {services:[],loading:false,}
)