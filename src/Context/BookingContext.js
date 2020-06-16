import createDataContext from './createDataContext'

const bookingreducer = (state, action) =>{
    switch(action.type){
        default:
            return state ;
    }
}


export const {Provider, Context}  = createDataContext(
    bookingreducer,
    {},
    []
)