import React, { useRef,  useState } from 'react'//use of react hooks
import axios from 'axios'//for data fetch from api

import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();



  // Add Student data in database//
  const [image, setImage] = useState([]); //set image for api
  const student_name = useRef();//for student name
  const student_email = useRef();//for student email
  const student_gender = useRef();//for student gender
  const student_college_name = useRef();//for studentcollege name
  const student_dob = useRef();//for student date of birth
  const standard = useRef();//for standard
  const username = useRef();//for username
  const password = useRef();//for password


  // for image
  const StudentPhoto = (e) => {
    setImage(e.target.files[0]);
  }

  // validate fildes are not empty
  const StudentData = () => {
    const form = new FormData();
    form.append('student_name', student_name.current.value);
    form.append('photo', image);
    form.append('student_image', image.name);
    form.append('student_email', student_email.current.value);
    form.append('student_gender', student_gender.current.value);
    form.append('student_college_name', student_college_name.current.value);
    form.append('student_dob', student_dob.current.value);
    form.append('standard', standard.current.value);
    form.append('username', username.current.value);
    form.append('password', password.current.value);

    axios({
      url: "http://127.0.0.1:8000/api/student",
      method: "POST",
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data', // Set the correct content type
      },
    })
      .then((res) => {
        alert("(° ͜ʖ͡°)つ Register successfully");
        student_name.current.value = [];
        student_email.current.value = [];
        student_gender.current.value = [];
        student_college_name.current.value = [];
        student_dob.current.value = [];
        standard.current.value = [];
        username.current.value = [];
        password.current.value = [];
        navigate('/');
      })
      .catch((err) => {
        alert("ლ(ಠ益ಠ)ლ Register failed")
      });
  }

  return (
    <>
    <div className='bg-gradient-to-r to-white-500  from-[#46f0fc]  to-[#fcfafb]'> 
     <div className="container mx-auto p-6">
  <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-6 rounded-lg shadow-md max-w-sm mx-auto">
    <h1 className="text-xl text-center mb-6">Student Register</h1>
    <hr className="mb-6" />

    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Full Name"
          ref={student_name}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          onChange={StudentPhoto}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Student Email"
          ref={student_email}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Student Gender"
          ref={student_gender}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Student College Name"
          ref={student_college_name}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          ref={student_dob}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Standard"
          ref={standard}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          ref={username}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </form>

    <div className="text-center mt-6">
      <button onClick={() => StudentData()} className="bg-green-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
      <button
        onClick={() => navigate('/')}
        className="w-full text-[black] hover:underline mt-2"
      >
        Back to login
      </button>
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default AddStudent
