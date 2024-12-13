import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../Interfaces";

export const initialState: userModel = {
    id: "",  
    username: "",
    email: "",
    role: "",
    firstName: "",
    middleName: "", 
    lastName: "",
    city: "",
    country: "",
    pincode: 0, 
  };

 export const UserAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
      setLoggedInUser:(state,action)=>{
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.middleName = action.payload.middleName;
      state.lastName = action.payload.lastName;
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.pincode = action.payload.pincode;
      },logoutUser: (state) => {
        Object.assign(state, initialState);
      },
      
    },
  });
  
  export const {setLoggedInUser,logoutUser}=UserAuthSlice.actions;
  export const userAuthReducer=UserAuthSlice.reducer;