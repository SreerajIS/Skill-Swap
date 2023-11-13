import axios from "axios";
import { LoginPayload } from "../../../types/PayloadInterface";


export const adminLogin = async(adminData:LoginPayload):Promise<any>=>{
  try {
    console.log("here")
    const response = await axios({
      method:'post',
      url:'http://localhost:5000/api/admin/login',
      data:adminData
    });
    console.log(response)
    return response.data
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
}

export const userList = async ():Promise<any>=>{
  try {
    const response = await axios({
      method:'get',
      url:'http://localhost:5000/api/admin/userlist',
    })
    console.log(response)
    return response
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
}

export const workerList = async ():Promise<any>=>{
  try {
    const response = await axios({
      method:'get',
      url:'http://localhost:5000/api/admin/workerlist',
    })
    console.log(response)
    return response
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
}



export const userBlock = async(userId:number):Promise<any>=>{
  try {
    const response = await axios({
      method:'put',
      url:'http://localhost:5000/api/admin/userblock',
      data:{userId}
    })
    return response
  } catch (error:any) {
    throw new Error(error.response.data.message)
  }
}