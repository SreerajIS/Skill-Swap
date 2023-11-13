import React, {useState} from 'react'
import Header from '../../components/User/Header'
import Footer from '../../components/User/Footer'
import {useForm} from 'react-hook-form'
import { RegisterWorkerPayload } from '../../types/PayloadInterface'
import {yupResolver} from "@hookform/resolvers/yup"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { workerRegisterValidationSchema } from '../../util/validation'
import { workerRegister } from '../../features/axios/api/user'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Tasks=()=> {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)

  const toggleForm = ()=>{
    setShowForm(!showForm)
  }

  // const showDropdown=()=> {
  //   var options = document.getElementById('works');
  //   options.style.display = (options.style.display === 'none') ? 'block' : 'none';
  // }
  const isLoggedIn = useSelector((state:any)=>state.userAuth.loggedIn)
  const userDetails = useSelector((state:any) => state.userDetails.user);

  const isWorker = userDetails ? userDetails.is_worker : undefined;
  const handleWorkerHomeClick = ()=>{
    navigate('/worker/home')
  }
  let Register_Button
  if(isLoggedIn){
    if(isWorker){
      Register_Button = <div className='flex justify-end mr-32 mb-8'>
      <button onClick={handleWorkerHomeClick} className='bg-green-500 text-lg  py-2 px-4 rounded-lg'>Go to worker side</button>
    </div>
    }
    else{
      Register_Button = <div className='flex justify-end mr-32 mb-8'>
      <button onClick={toggleForm} className='bg-green-500 text-lg  py-2 px-4 rounded-lg'>Register as a worker?</button>
    </div>
    }
    
  }
  const notify = (msg:string, type:string)=> 
  type === "error"? toast.error(msg,{position:toast.POSITION.TOP_RIGHT}): toast.success(msg,{position:toast.POSITION.TOP_RIGHT})
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterWorkerPayload>({
    resolver: yupResolver(workerRegisterValidationSchema),
  });


  const submitHandler = async(formData:RegisterWorkerPayload)=>{
    try {
      console.log("ivide"+formData)
      const user = localStorage.getItem("user")
      if(user){
        const userObject = JSON.parse(user)
        console.log(userObject)
        var id = userObject._id
      }
      
      workerRegister(formData, id).then((response)=>{

        console.log("hhhhhh",response)
        notify(response.data.msg,'success')
        navigate('/worker/home')

      }).catch((error:any)=>{
        console.log(error)
        console.log(error.message)
      })

    } catch (error:any) {
      console.log("halooooooo");
      console.log(error.message);  
    }
  }
   
  return (
    <div>
      <Header/>
      <div className='m-32 mb-16 flex flex-col items-center'>
        <div className='max-w-lg w-full text-center '>
          <div>
            <h1 className='text-5xl font-semibold'>Book Your Next Task</h1>
          </div>
          
          <div className='mt-4 flex flex-wrap justify-center'>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>electrician</button>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>Maid</button>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>plumber</button>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>driver</button>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>carpenter</button>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>Gardener</button>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>wood cutter</button>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>mechanic</button>
            <button className='mx-4 my-2 px-4 py-1 text-lg bg-gray-200 rounded-full'>Painter</button>
          </div>
        </div>
        
      </div>
      
      {Register_Button}

      {showForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          {/* Your form content */}
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Upload Photo
              </label>
              <input type="file" id="profile_photo" accept="image/*" className="mt-1 p-2 border rounded-md" {...register('profile_photo')} />
            </div>
            <div className='flex items-center mx-auto'>
            {errors.profile_photo && (
                    <p className="text-red-500 text-sm">{errors.profile_photo.message as string}</p>
                  )}
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Qualification or Experience Certificate
              </label>
              <input type="file" id="certificate_photo" accept="image/*" className="mt-1 p-2 border rounded-md" {...register('certificate_photo')} />
            </div>
            <div className='flex items-center mx-auto'>
            {errors.certificate_photo && (
                    <p className="text-red-500 text-sm">{errors.certificate_photo.message}</p>
                  )}
            </div>
            <div className="mb-4">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                About
              </label>
              <input type='text' id="about" /* rows="4" */ className="mt-1 p-2 border rounded-md w-full" {...register('about')} />
            </div>
            <div className='flex items-center mx-auto'>
            {errors.about && (
                    <p className="text-red-500 text-sm">{errors.about.message}</p>
                  )}
            </div>
            <div className="mb-4">
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
                Expertise Task
              </label>
              <select
                id="works"
                className="mt-1 p-2 border rounded-md w-full"
                {...register('works', { required: 'Please select expertise tasks' })}
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className='flex items-center mx-auto'>
            {errors.works && (
                    <p className="text-red-500 text-sm">{errors.works.message}</p>
                  )}
            </div>
            <div className="mb-4">
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                Cost Per Hour
              </label>
              <div className="flex items-center">
                <div className="relative rounded-md shadow-sm mb-1">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">₹</span>
                  <input type="number" id="charges" className="pl-10 pr-3 py-2 border rounded-l-md w-full" {...register('charges')} />
                </div>
                <span className="ml-2 text-gray-500">/hr</span>
              </div>
            </div>
            <div className='flex items-center mx-auto'>
            {errors.charges && (
                    <p className="text-red-500 text-sm">{errors.charges.message}</p>
                  )}
            </div>
            <div className="flex justify-between">
              <button onClick={toggleForm} className="block bg-red-500 text-white py-2 px-4 rounded-lg">
                Close
              </button>
              <button className="block bg-green-500 text-white py-2 px-4 rounded-lg" type='submit'>
                Submit
              </button>
            </div>

          </form>
          

        </div>
      )}


      
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default Tasks