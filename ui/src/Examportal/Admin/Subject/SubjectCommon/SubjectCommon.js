import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SubjectCommon = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/6 bg-gray-800 text-white">
        <div className="p-4">
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="">Subject</Link>
            </li>
            <li>
              <Link to="chapter">Add Chapter</Link>
            </li>
            <li>
              <Link to="texttuto">Text Tutorial</Link>
            </li>
            <li>
              <Link to="video">Video Tutorial</Link>
            </li>
            <li>
              <Link to="exam">Set Exam</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SubjectCommon;
