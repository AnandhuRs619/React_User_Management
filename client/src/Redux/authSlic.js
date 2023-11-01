import {createSlice} from '@reduxjs/toolkit'

const initialState={
    isLogged:false,
    Token:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      sessionHandle: (state, action) => {
        state.isLogged = true; 
        state.Token = action.payload; 
      },
      
    },
  });
  


export const {sessionHandle}=authSlice.actions

export default authSlice.reducer;