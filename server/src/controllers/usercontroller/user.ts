import { RequestHandler } from "express";
import UserModel from "../../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import TokenModel from "../../models/token"
import { sendEmail } from "../../util/sendEmail";
// import { ObjectId } from "mongoose";
export const getUser: RequestHandler = async(req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    
    // throw Error("OOPS!!!")
    const user = await UserModel.findOne({email:email});
    const status = user?.status
    const verified = user?.verified
    if(!user){
     return res.status(400).json({
        status:"failed",
        message :"user not found",
      })
    }
    if(user){
      const passMatch = await bcrypt.compare(password, user.password)
      if (!passMatch) {
        return res.status(400).json({ Login: false, message: "Incorrect Password" })
      }
      else{
        if(status==true){
          return res.status(400).json({status:"failed",message:"User Blocked"})
        }
        else if(verified===false){
          return res.status(400).json({status:"failed",message:"user not verified"})
        }
        const token = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:'1h'})
        res.status(200).json({status:"ok", message: "Login successfull", user: user, token:token })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const createUser: RequestHandler = async(req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password
  try {

    const user = await UserModel.findOne({email})
    if(user){
      return res.status(400).json({ msg: "Email already exists" })
    }
    const mobile = await UserModel.findOne({phone})
    if(mobile){
      return res.status(400).json({msg:"Phone number already exists"})
    }
    const salt = await bcrypt.genSalt(10); 
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name:name,
      email:email,
      phone:phone,
      password:passwordHash
    })

    

    
    

    const secret = process.env.ACCESS_TOKEN_SECRET as string + passwordHash
    const token = jwt.sign({ email: email }, secret as string, {
      expiresIn: "5m",
    });

    await TokenModel.create({
      userId:newUser._id,
      token:token
    })

    setTimeout(async() => {
      const verified = await UserModel.findOne({_id:newUser._id},{verified:1})
      console.log("look here"+verified)
      if(verified?.verified===false){
        await UserModel.deleteOne({_id:newUser._id})
        await TokenModel.deleteOne({userId:newUser._id})
      }
    }, 30000);

    // const token = await new TokenModel({
    //   userId:newUser._id,
    //   token:crypto.randomBytes(32).toString("hex")
    // }).save()
    const url = `${process.env.BASE_URL}${newUser._id}/verify/${token}`
    await sendEmail(email,"Verify Email",url);
    console.log(url)
    return res.status(201).json({msg:"An email sent to your account please verify",user:newUser})

  } catch (error) {
    console.log(error)
  }
} 

export const verifyUser:RequestHandler = async(req,res)=>{
  try {
    const id = req.body.id
    const token = req.body.token
    const savedtoken = await TokenModel.findOne({userId:id,token:token})
    if(savedtoken){
      await UserModel.updateOne({_id:id},{$set:{verified:true}})
      await TokenModel.deleteOne({userId:id,token:token})
      return res.status(200).json({msg:"user verified successfully"})
    }
    return res.status(400).json({msg:"link has expiered try to signup again"})
  } catch (error) {
    console.log(error)
  }
  
}

export const forgotPassword:RequestHandler = async(req,res)=>{
  const email = req.body.email
  try {
    const olduser = await UserModel.findOne({email})
    if(!olduser){
      return res.status(400).json({msg:"User not exist"})
    }
    const secret = process.env.ACCESS_TOKEN_SECRET as string + olduser.password
    const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret as string, {
      expiresIn: "5m",
    });
    const link = `http://localhost:3000/resetpassword/${olduser._id}/${token}`;
    console.log(link)
  } catch (error) {
    console.log(error)
  }
}

