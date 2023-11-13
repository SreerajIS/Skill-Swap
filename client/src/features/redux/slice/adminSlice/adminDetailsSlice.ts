import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface Admin {
    id: string;
    name: string;
    email:string;
    phone:string;
}

const loadAdminFromLocalStorage = ()=>{
  try {
      const getadmin = localStorage.getItem("admin")
      return getadmin? JSON.parse(getadmin):null
  } catch (error) {
      console.log("admin loading error",error);
      return null
  }
}


const initialState = {
  admin: loadAdminFromLocalStorage()
};



const adminDataSlice = createSlice({
  name: 'adminData', 
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;

      try {     
        localStorage.setItem("admin",JSON.stringify(action.payload))
      } catch (error) {
        console.log("Error storing admin in localstorage",error);
      }

    },
    clearAdmin: (state) => {
      state.admin = null;
      try {
        localStorage.removeItem("admin")
    } catch (error) {
        console.log("Error removing admin from localstorage",error);
        
    }
    },
  },
});

export const { setAdmin, clearAdmin } = adminDataSlice.actions;

export default adminDataSlice.reducer;
 