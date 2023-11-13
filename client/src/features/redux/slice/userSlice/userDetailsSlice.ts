import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface User {
    _id: any;
    name: any;
    email:any;
    phone:any;
}

const loadUserFromLocalStorage = ()=>{
  try {
    console.log("333")
      const getuser = localStorage.getItem("user")
      console.log(getuser)
      return getuser? JSON.parse(getuser):null
  } catch (error) {
      console.log("user loading error",error);
      return null
  }
}

// interface UserState {
//     user: User | null;
//   }

const initialState = {
  user: loadUserFromLocalStorage()
};



const userDetailsSlice = createSlice({
  name: 'userDetails', 
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;

      try {     
        localStorage.setItem("user",JSON.stringify(action.payload))
      } catch (error) {
        console.log("Error storing user in localstorage",error);
      }

    },
    clearUser: (state) => {
      state.user = null;
      try {
        localStorage.removeItem("user")
    } catch (error) {
        console.log("Error removing user from localstorage",error);
        
    }
    },
  },
});

export const { setUser, clearUser } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
 