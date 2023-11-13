import React, {useEffect} from 'react'
import '../../Styles/Login.css'
import email_icon from '../../Assets/email.png'
import password_icon from '../../Assets/password.png'
import { yupResolver } from '@hookform/resolvers/yup' 
import { useForm } from "react-hook-form"
import { LoginPayload } from "../../types/PayloadInterface"
import { userLoginValidationSchema } from '../../util/validation'
import { useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../features/redux/reducer/Reducer'
import { userLogin } from '../../features/axios/api/user'
// import * as Yup from 'yup'
// import { Formik,FormikHelpers,FormikProps,Form,Field, FieldProps } from 'formik'
import { login } from '../../features/redux/slice/userSlice/userAuthSlice'
import { setToken } from '../../features/redux/slice/userSlice/tokenSlice'
import { setUser } from '../../features/redux/slice/userSlice/userDetailsSlice'


const Login = () => {
  const navigate  = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state:RootState)=>state.userAuth.loggedIn)

  const token = localStorage.getItem("token")

  useEffect(()=>{
    document.body.classList.add('background');
    return()=>{
      document.body.classList.remove('background')
    }
  })

  useEffect(()=>{
    if(token){
      dispatch(login())
    }
    if(isLoggedIn === true){
      navigate("/home")
    }
  },)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(userLoginValidationSchema),
  });

  const notify = (msg:string, type:string)=> 
  type === "error"? toast.error(msg,{position:toast.POSITION.TOP_RIGHT}): toast.success(msg,{position:toast.POSITION.TOP_RIGHT})


  const submitHandler =(formData:LoginPayload) => {
    userLogin(formData).then((response)=>{
      
      
      const token = response.token
      const user = response.user

      dispatch(login())
      dispatch(setToken(token))
      dispatch(setUser(user))

      notify(response.message,"success")
      navigate("/home")
    }).catch ((error)=>{
      notify(error.message,"error")
    }) 
  }
  return (
        <div className='container'>
        <div className='header'>
          <div className='text'>Login</div>
          <div className='underline'></div>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className='inputs'>
          <div className='input'>
            <img src={email_icon} alt="" />
            <input type="email" placeholder='Email'
            {...register("email")}
            />
            {errors.email && (
                  <p className="text-red-500 text-sm flex items-center mx-auto">{errors.email.message}</p>
                )}
          </div>
          <div className='input'>
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Password'
            {...register("password")}
            />
            {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
          </div>
        </div>
        <div className="submit-container">
          <button type='submit' className='submit'>Login</button>
        </div>
        </form>
        <div className='button-container flex justify-between items-center mt-5'>
          <button
            onClick={() => {
              navigate('/register');
            }}
            className='ml-8 px-2 py-1 text-black font-semibold rounded-lg text-sm'>
            Create an account
          </button>
          <button
            onClick={() => {
              navigate("/forgotpassword")
              // Add your "Forgot Password" functionality here
            }}
            className='mr-8 px-2 py-1 text-blue-500 font-semibold rounded-lg text-sm'>
            Forgot Password?
          </button>
        </div>
        
        <ToastContainer/>
      </div>
   
  )
}


export default Login
