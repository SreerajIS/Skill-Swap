import React from "react";
import image from "../../Assets/homepage.jpg"
import profileImage from "../../Assets/182-1829287_cammy-png.png"

const Cards = ()=>{
  return(
    <div className="max-w-xs mx-auto my-16 overflow-hidden rounded shadow-lg">
    <img className="w-full" src={image} alt="Card" />
    <div className="relative px-6 py-4">
      <div className="rounded-full w-16 h-16 bg-gray-200 absolute -top-8 left-4">
        <img
          src={profileImage}
          alt="User Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      
      <div className="mt-4">
        <button className="font-bold text-xl mb-2">Mary</button>
        <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet temporibus sapienkjsdfj jdhfj.
          </p>
      </div>
    </div>

  </div>
  )
}
export default Cards