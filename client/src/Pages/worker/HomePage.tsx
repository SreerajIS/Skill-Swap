import React,{useEffect} from 'react'
import Header from '../../components/User/Header'
import WorkerImage from '../../Assets/workerhome.jpg'
import Footer from '../../components/User/Footer'
import Cards from "../../components/User/Cards";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const numComponents=3;
  const componentArray = Array(numComponents).fill(<Cards/>)
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },)
  if(!token){
    navigate('/login')
  }
  return (
    <div>
      <Header/>
      <div>
        <img className='mt-2 mb-4' src={WorkerImage} alt="Image_of_Worker" />
      </div>
      <div className="bg-#ebedeb flex flex-row mx-16">
        {componentArray}
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage
