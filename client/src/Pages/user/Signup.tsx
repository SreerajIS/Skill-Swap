import React, { useEffect } from 'react'
import '../../Styles/Login.css'
import user_icon from '../../Assets/person.png'
import email_icon from '../../Assets/email.png'
import password_icon from '../../Assets/password.png'
import phone_icon from '../../Assets/telephone-icon-3623.png'
import { useForm } from 'react-hook-form'
import { SignupPayload } from '../../types/PayloadInterface'
import { userRegisterValidationSchema } from '../../util/validation'
import {yupResolver} from "@hookform/resolvers/yup"
import { userRegister } from '../../features/axios/api/user'
import {toast, ToastContainer} from 'react-toastify'

const Signup = () => {
  useEffect(()=>{
    document.body.classList.add('background');
    return()=>{
      document.body.classList.remove('background')
    }
  })
  // const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState:{ errors },
  } = useForm<SignupPayload>({
    resolver:yupResolver(userRegisterValidationSchema),
  });

  const notify = (msg:string, type:string)=> 
  type === "error"? toast.error(msg,{position:toast.POSITION.TOP_RIGHT}): toast.success(msg,{position:toast.POSITION.TOP_RIGHT})
  
  const submitHandler = async(formData:SignupPayload)=>{
    
    try {
      userRegister(formData).then((response)=>{

        console.log("hhhhhh",response)
        if(response.status === 201){
          // navigate("/login")
        }
        notify(response.data.msg,"success")
      }).catch((error:any)=>{
        console.log(error)
        console.log(error.message)
        notify(error.message,"error")
      })

    } catch (error:any) {
      console.log("halooooooo");
      console.log(error.message);  
    }
   
  
    // })
    
  }
  return (
    
     <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
      <div className='inputs'>
        <div className='items-center mx-auto'>
          <div className='input'>
            <img src={user_icon} alt="" />
            <input type="text" placeholder='Name'
              {...register("name")}
            />
          
          </div>
          <div className='flex items-center mx-auto'>
          {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
          </div>
        </div>
        
        
        <div className='item-center mx-auto'>
          <div className='input'>
            <img src={email_icon} alt="" />
            <input type="email" placeholder='Email'
              {...register("email")}
            />
          </div>
          <div className='flex items-center mx-auto'>
            {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
          </div>
        
        </div>
        
        
        <div className='item-center mx-auto'>
          <div className='input'>
            <img src={phone_icon} alt="" />
            <input type="number" placeholder='Phone'
              {...register("phone")}
            />
            
          </div>
          <div className='flex items-center mx-auto'>
            {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
          </div>
        </div>
        
       

         <div className='item-center mx-auto'>
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
        <button  className='submit' type='submit'>Sign Up</button>
      </div>
      </form>
      <ToastContainer/>
    </div>
    
  )
}

export default Signup
