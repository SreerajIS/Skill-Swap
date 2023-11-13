import { combineReducers } from "redux";
import userLoginAuthSlice from "../slice/userSlice/userAuthSlice";
import tokenReducer from "../slice/userSlice/tokenSlice";
import userDetailsSlice from "../slice/userSlice/userDetailsSlice";
import tokenSlice from "../slice/adminSlice/tokenSlice";
import adminAuthSlice from "../slice/adminSlice/adminAuthSlice";
import adminDetailsSlice from "../slice/adminSlice/adminDetailsSlice";



const rootReducer = combineReducers({
  userAuth: userLoginAuthSlice,
  token: tokenReducer,
  userDetails: userDetailsSlice,
  adminToken:tokenSlice,
  adminAuth:adminAuthSlice,
  adminDetails:adminDetailsSlice,
  
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
