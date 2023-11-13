import axios from "axios";
import { LoginPayload,SignupPayload, forgotPassword, ResetPasswordPayload,  RegisterWorkerPayload  } from "../../../types/PayloadInterface";
import configKeys from "../../../util/config";
import { error } from "console";

const apiConfig = configKeys.API_URL

export const userLogin = async (userData:LoginPayload):Promise<any> =>{
  try {
    const response = await axios({
      method:'post',
      url:'http://localhost:5000/api/user/login',
      data:userData
    });
    return response.data
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
};


export const userRegister = async(userData:SignupPayload)=>{
  try {
    const response = await axios({
      method:'post',
      url:'http://localhost:5000/api/user/signup',
      data:userData
    })
    console.log(response)
    return response
  } catch (error:any) { 
    console.log(error.response.data.msg);
    
    throw new Error(error.response.data.msg)
  }
}
export const userVerify = async(id:any,token:any)=>{
  try {
    const response = await axios({
      method:'post',
      url:'http://localhost:5000/api/user/verify',
      data:{id:id,token:token}
    })
    console.log(response)
    return response.data
  } catch (error:any) { 
    console.log(error)
    console.log(error.response.data.msg);
    
    throw new Error(error.response.data.msg)
  }
}

export const userForgotPassword = async(userEmail:forgotPassword)=>{
  try {
    const response = await axios({
      method:'post',
      url:'http://localhost:5000/api/user/forgotpassword',
      data:userEmail
    })
    return response
  } catch (error:any) {
    throw new Error(error.response.data.msg)
  }
}

export const resetPassword = async(resetPassword:ResetPasswordPayload)=>{
  console.log(resetPassword)
  try {
    const response = await axios({
      method:'post',
      url:'http://localhost:5000/api/user/resetpassword',
      data:resetPassword
    })
    return response
  } catch (error:any) {
    throw new Error(error.response.data.msg)
  }
}

export const workerRegister = async(userData:RegisterWorkerPayload,id:any)=>{
  try {
    const response = await axios({
      method:'post',
      url:'http://localhost:5000/api/worker/register',
      data:{userData,id}
    })
    console.log(response)
    return response
  } catch (error:any) { 
    console.log(error.response.data.msg);
    
    throw new Error(error.response.data.msg)
  }
}