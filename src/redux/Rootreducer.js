const Istate={
    counter:0
}

export const Countreducer=(state=Istate,action)=>{
    switch(action.type){
        case 'Increment':{
            return {...state,counter:state.counter+1}
        }
        default:{
            return state;
        }
    }
}

// export function Authreducer(state={login:false},action){
//     switch(action.type){
//         case ''
//     }
// }