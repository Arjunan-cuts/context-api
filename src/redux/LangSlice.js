import {createSlice} from '@reduxjs/toolkit';

const initialState={
    lang:'en'
}

const LangSLice=createSlice({
    name:'lang',
    initialState,
    reducers:{
        en:(state)=>{
            state.lang='en';
        },
        sp:(state)=>{
            state.lang='sp';
        }
    }
})

export const {en,sp}=LangSLice.actions
export default LangSLice.reducer