import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminCommon = () => {

  return (
   <>
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="">Tutorial Point</Link>
        </div>
        <div className="flex items-center space-x-4">
         
          <ul className="flex space-x-4">
            <li>
              <Link to="">Dashboard</Link>
            </li>
            <li>
              <Link to="studentadd">Student</Link>
            </li>
            <li>
              <Link to="subject">Subject</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <Outlet />
    </div>
   </>
  );
};

export default AdminCommon;
