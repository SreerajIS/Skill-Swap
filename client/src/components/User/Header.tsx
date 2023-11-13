import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../Assets/cover.png'
import "../../Styles/custom.css"
import { useDispatch, useSelector } from "react-redux";
import { login,logout } from "../../features/redux/slice/userSlice/userAuthSlice";


const Header = () => {
const navigate = useNavigate()
const isLoggedIn = useSelector((state:any)=>state.userAuth.loggedIn)
const dispatch = useDispatch()
console.log("my"+isLoggedIn)
const handleLoginClick = () => {
  if (isLoggedIn) {
    console.log("hello here")
    localStorage.clear()
    // If already logged in, log out.
    dispatch(logout());
  } else {
    // If not logged in, navigate to the login page.
    navigate('/login');
  }
};
const handleTaskClick = ()=>{
  navigate('/task')
}
const handleHomeClick = ()=>{
  navigate('/home')
}

  return (
    <div>
      <div className="relative h-16 bg-white flex justify-between items-center px-10">
        <div className="h-full mt-5">
          <img src={logo} alt="Header" className="h-16" />
        </div>
        <div className="flex items-center justify-center space-x-7 mt-5 flex-grow custom-mr-12">
          <button onClick={handleHomeClick}>Home</button>
          <button onClick={handleTaskClick}>Tasks</button>
          <button>Current Tasks</button>
        </div>
        <div className="flex items-center space-x-7 mt-5">
          <button
            onClick={handleLoginClick}
            className="bg-white px-2 py-1 text-teal-700 font-semibold rounded-lg text-sm"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Header;
