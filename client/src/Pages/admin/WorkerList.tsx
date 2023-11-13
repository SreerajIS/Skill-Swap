// src/components/AdminHome.js

import React from 'react';
import { useState,useEffect } from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import WorkerTable from '../../components/Admin/WorkerTable';
import { workerList } from '../../features/axios/api/admin';

function Homepage () {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await workerList();
        console.log("ghghghghgh"+response.data.workerList)
        setWorkers(response.data.workerList);
      } catch (error) {
        console.error('Error fetching user list', error);
      }
    }

    fetchUserList();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <AdminHeader/>

      <div className="flex flex-grow">
        <AdminSidebar/>
        <div className="flex-grow bg-gray-200 p-8 pl-16">
              < WorkerTable users={workers}/>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
