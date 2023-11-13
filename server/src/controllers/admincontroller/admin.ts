import { RequestHandler } from "express";
import AdminModel from "../../models/admin"
import UserModel from "../../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
export const adminLogin: RequestHandler = async(req, res) => {
  try {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    
    // throw Error("OOPS!!!")
    const admin = await AdminModel.findOne({email:email});
    if(!admin){
     return res.status(400).json({
        status:"failed",
        message :"admin not found",
      })
    }
    if(admin){
      const passMatch = await bcrypt.compare(password, admin.password)
      if (!passMatch) {
        return res.status(400).json({ Login: false, message: "Incorrect Password" })
      }
      else{
        const token = jwt.sign({adminId: admin._id},process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:'1h'})
        res.status(200).json({status:"ok", message: "Login successfull", admin: admin, token:token })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const userList: RequestHandler=async(req,res)=>{
  console.log("aaaaaaaaaaaaaaaa")
  try {
    const userList = await UserModel.find()
    res.status(200).json({status:"ok",userList:userList})
  } catch (error) {
    console.log(error)
  }
}
export const workerList: RequestHandler=async(req,res)=>{
  console.log("aaaaaaaaaaaaaaaa")
  try {
    const workerList = await UserModel.find()
    res.status(200).json({status:"ok",workerList:workerList})
  } catch (error) {
    console.log(error)
  }
}

export const userBlock:RequestHandler = async(req,res)=>{
  try {
    const userId = req.body.userId
    console.log(userId)
     const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    // Toggle the status (true to false or false to true)
    const updatedStatus = !user.status;

    // Update the user's status in the database
     await UserModel.updateOne(
      { _id: userId },
      { $set: { status: updatedStatus } }
    );
    res.status(200).json({status:"ok"})
  } catch (error) {
    console.log(error)
  }
}
