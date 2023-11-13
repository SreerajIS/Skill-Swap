// src/components/AdminHome.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userList } from '../../features/axios/api/admin';

function AdminSidebar () {
  const navigate = useNavigate()
  const homeButton = ()=>{
    navigate('/admin/home')
  }
  const handleButtonClick = async()=>{
     navigate('/admin/userlist')
  }
  const handleWorkerButtonClick = async()=>{
    navigate('/admin/workerlist')
  }

  return (
        <div className="bg-white p-4 w-1/5">
          <button onClick={homeButton}><h2 className="text-2xl font-semibold mb-4 ml-10">Admin Dashboard</h2></button>
          

          <div className="space-y-4 flex flex-col">
            <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">List Users</button>
            <button onClick={handleWorkerButtonClick} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">List Workers</button>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">List Tasks</button>
          </div>
        </div>
  );
}

export default AdminSidebar;

