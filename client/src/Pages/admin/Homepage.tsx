// src/components/AdminHome.js

import React from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';

function Homepage () {

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <AdminHeader/>

      <div className="flex flex-grow">
        <AdminSidebar/>
        <div className="flex-grow bg-gray-200 p-4">

        </div>
      </div>
    </div>
  );
}

export default Homepage;
