import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl text-red-500 font-bold">404 - Page Not Found</h2>
        <p className="text-gray-600 my-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="text-gray-600">
          Return to <Link to="/admin/login" className="text-blue-500 hover:underline">Home</Link>.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
