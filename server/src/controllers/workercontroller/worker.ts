import { RequestHandler } from "express";
import UserModel from "../../models/user"
import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/Images');
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({
  storage:storage
})

export const registerWorker: RequestHandler = async(req,res)=>{
  try {
    const id = req.body.id
    const user = await UserModel.findOne({_id:id})
    upload.single(req.body.userData.profile_photo)
    upload.single(req.body.userData.certificate_photo)
    await user?.updateOne({
      $set:{
        about:req.body.userData.about,
        charges:req.body.userData.charges,
        works:req.body.userData.works,
        is_worker:true
      }
    })
    return res.status(201).json({msg:"Registered as Worker",user:user})
  } catch (error) {
    console.log(error)
  }
}