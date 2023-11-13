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
import { adminLogin } from '../../features/axios/api/admin'
// import * as Yup from 'yup'
// import { Formik,FormikHelpers,FormikProps,Form,Field, FieldProps } from 'formik'
import { adminlogin } from '../../features/redux/slice/adminSlice/adminAuthSlice'
import { setAdminToken } from '../../features/redux/slice/adminSlice/tokenSlice'
import { setAdmin } from '../../features/redux/slice/adminSlice/adminDetailsSlice'


const Login = () => {
  const navigate  = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state:RootState)=>state.adminAuth.loggedIn)
  const token = localStorage.getItem("token")

  useEffect(()=>{
    document.body.classList.add('background');
    return()=>{
      document.body.classList.remove('background')
    }
  })

  useEffect(()=>{
    if(token){
      dispatch(adminlogin())
    }
    if(isLoggedIn === true){
      navigate("/admin/home")
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
    adminLogin(formData).then((response)=>{
      console.log(response.token)
      
      const token = response.token
      const admin = response.data

      dispatch(adminlogin())
      dispatch(setAdminToken(token))
      dispatch(setAdmin(admin))

      notify(response.message,"success")
      navigate("/admin/home")
    }).catch ((error)=>{
      notify(error.message,"error")
    }) 
  }
  return (
        <div className='container'>
        <div className='header'>
          <div className='text'>Admin Login</div>
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
        <ToastContainer/>
      </div>
   
  )
}


export default Login
