// import React, { useEffect, useState } from 'react'
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import axios from 'axios';
const StudentCommon = () => {
    // const [student, setDataStudent] = useState("");

    // useEffect(function () {
    //     var id = localStorage.getItem("user_id");
    //     axios({
    //         url: `http://localhost:8000/api/student/id/data/${id}`,
    //         method: "get",
    //         contentType: "application/json"
    //     }).then(e => {
    //         setDataStudent(e.data)
    //     }).catch((err) => {
    //         alert("error")
    //     })
    // }, []);

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
                                <Link to="profile">Student</Link>
                            </li>
                            <li>
                                <Link to="stutorial">Tutorial</Link>
                            </li>
                            <li>
                                <Link to="svideo">Vedio Tutorial</Link>
                            </li>
                            <li>
                                <Link to="studentexam">Exam</Link>
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
    )
}

export default StudentCommon

