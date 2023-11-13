import React from 'react'
import { forgotPassword } from '../../types/PayloadInterface'
import { yupResolver } from '@hookform/resolvers/yup' 
import { useForm } from "react-hook-form"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import email_icon from "../../Assets/email.png"
import { userForgotPasswordValidationSchema } from '../../util/validation'
import { userForgotPassword } from '../../features/axios/api/user'

function Email() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPassword>({
    resolver: yupResolver(userForgotPasswordValidationSchema),
  });
  const notify = (msg:string, type:string)=> 
  type === "error"? toast.error(msg,{position:toast.POSITION.TOP_RIGHT}): toast.success(msg,{position:toast.POSITION.TOP_RIGHT})
  const submitHandler =(formData:forgotPassword) => {
    userForgotPassword(formData).then((response)=>{
      
    }).catch ((error:any)=>{
      notify(error.message,"error")
    }) 
  }
  return (
    <><form onSubmit={handleSubmit(submitHandler)}>
      <div className='inputs'>
        <div className='input'>
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email'
            {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center mx-auto">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="submit-container">
        <button type='submit' className='submit'>Reset</button>
      </div>
    </form><ToastContainer /></>
  )
}

export default Email
