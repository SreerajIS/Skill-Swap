import { InferSchemaType, Schema, model } from "mongoose";

const adminSchema = new Schema({
  email: {type:String, required:true},
  password:{type:String, required:true},
})

type Admin = InferSchemaType<typeof adminSchema>;

export default model<Admin>("Admin",adminSchema);