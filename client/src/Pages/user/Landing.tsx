import React from "react";
import Header from "../../components/User/Header";
import worker from '../../Assets/worker.jpg'
import "../../Styles/custom.css"
import Cards from "../../components/User/Cards";
import Footer from "../../components/User/Footer";

function LandingPage(){
  const numComponents=3;
  const componentArray = Array(numComponents).fill(<Cards/>)
  return(
    <div>
      <Header/>
      <div>
        <img className="custom-h-128 w-full mt-16" src={worker} alt="Working_Image" />
      </div>
      <div className="bg-#ebedeb flex flex-row mx-16">
        {componentArray}
      </div>
      <Footer/>
    </div>
  )
}

export default LandingPage