import { Route, Routes } from "react-router-dom";

import UserLoginPage from "../../Pages/user/Login"
import UserRegisterPage from "../../Pages/user/Signup"
import LandingPage from "../../Pages/user/Landing";
import NotFound from "../../Pages/user/NotFoundUser";
import ForgotPassword from "../../Pages/user/ForgotPassword";
import ResetPassword from "../../Pages/user/ResetPassword";
import EmailVerify from "../../Pages/user/EmailVerify";
import Tasks from "../../Pages/user/Tasks";

function UserRouter(){
  return(
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<LandingPage/>}/>
      
      <Route path="/login" element={<UserLoginPage/>} />
      <Route path="/register" element={<UserRegisterPage/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/> 
      <Route path="/resetpassword/:id/:token" element={<ResetPassword/>}/> 
      <Route path="/:id/verify/:token" element={<EmailVerify/>}/>
      <Route path="/task" element={<Tasks/>}/>
      <Route path ="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default UserRouter;