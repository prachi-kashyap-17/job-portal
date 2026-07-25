import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:"auth",
  initialState:{
    user:null,
    isLoggedIn:false
  },
  reducers:{
    userlogin:(state,action)=>{
      state.user=action.payload;
      state.isLoggedIn=true;
    },
    userlogout:(state)=>{
      state.user=null;
      state.isLoggedIn=false;
    }
  },
})

export const { userlogin, userlogout } = authSlice.actions;
export default authSlice.reducer;