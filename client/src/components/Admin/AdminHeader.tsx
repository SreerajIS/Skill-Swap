// src/components/AdminHome.js

import React from 'react';
import logo from "../../Assets/cover.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {adminlogout } from '../../features/redux/slice/adminSlice/adminAuthSlice';


function AdminHeader () {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state:any)=>state.adminAuth.loggedIn)
  const dispatch = useDispatch()
  console.log("my"+isLoggedIn)
  const handleLoginClick = () => {
    if (isLoggedIn) {
      console.log("hello here")
      localStorage.clear()
      // If already logged in, log out.
      dispatch(adminlogout());
      navigate('/admin/login');
    } else {
      // If not logged in, navigate to the login page.
      navigate('/admin/login');
    }
  };

  return (
      <div className="flex items-center justify-between bg-white p-4">
        <img src={logo} alt="Admin Logo" className="h-16 rounded-full" />

        <button  onClick={handleLoginClick} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
  );
}

export default AdminHeader;
