import {createSlice} from '@reduxjs/toolkit';

const initialState={
    name:'Arun',
    login:false
}

const AuthSlice=createSlice({
    name:'Auth',
    initialState,
    reducers:{
        login:(state)=>{
            state.login=true;
        },
        logout:(state)=>{
            state.login=false;
        }
    }
})

export const{ login, logout} = AuthSlice.actions
export default AuthSlice.reducer