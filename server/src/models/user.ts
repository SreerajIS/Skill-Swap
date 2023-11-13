import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {type:String, required:true,minlength:4,maxlength:25},
  email: {type:String, required:true},
  phone: {type:Number, required:true},
  password:{type:String, required:true,minlength:6},
  status:{type:Boolean,required:true,default:false},
  verified:{type:Boolean,required:true,default:false},
  is_worker:{type:Boolean,required:true,default:false},
  profile_photo:{type:String,default:null},
  certificate_photo:{type:String,default:null},
  works:{type:Array,default:[]},
  about:{type:String,default:null,minlength:50,maxlength:250},
  charges:{type:Number,default:null,minlength:2,maxlength:4},
  task_completed:{type:Number,default:null},
  rating:{type:Number,default:null}
})

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User",userSchema);