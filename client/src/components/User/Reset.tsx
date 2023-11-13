import React from 'react'
import { ResetPasswordPayload } from '../../types/PayloadInterface'
import { yupResolver } from '@hookform/resolvers/yup' 
import { useForm } from "react-hook-form"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import password_icon from "../../Assets/password.png"
import { userPasswordResetSchema } from '../../util/validation'
import { resetPassword } from '../../features/axios/api/user'
// import { useParams } from 'react-router-dom'

function Reset() {
  // const{id} = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: yupResolver(userPasswordResetSchema),
  });
  const notify = (msg:string, type:string)=> 
  type === "error"? toast.error(msg,{position:toast.POSITION.TOP_RIGHT}): toast.success(msg,{position:toast.POSITION.TOP_RIGHT})
  const submitHandler =(formData:ResetPasswordPayload) => {
    resetPassword(formData).then((response)=>{
      
    }).catch ((error:any)=>{
      notify(error.message,"error")
    }) 
  }
  return (
    <><form onSubmit={handleSubmit(submitHandler)}>
      <div className='inputs'>
        <div className='item-center mx-auto'>
          {/* <input type="hidden" value={id} {...register('id')} /> */}
          <div className='input'>
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Password'
              {...register("password")}
            />
          </div>
          <div className='flex items-center mx-auto'>
            {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
          </div>
          
        </div>     
        
        <div className='item-center mx-auto'>
          <div className='input'>
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Confirm Password'
              {...register("confirmPassword")}
            />
          </div>
          <div className='flex items-center mx-auto'>
            {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
          </div>
          
        </div> 
      </div>
      <div className="submit-container">
        <button type='submit' className='submit'>Reset</button>
      </div>
    </form><ToastContainer /></>
  )
}

export default Reset
// import React from 'react'

// function Reset() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Reset
