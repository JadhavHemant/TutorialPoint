import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState([]);
  const student_name = useRef();
  const student_email = useRef();
  const student_gender = useRef();
  const student_college_name = useRef();
  const student_dob = useRef();
  const standard = useRef();
  const username = useRef();
  const password = useRef();

  const StudentPhoto = (e) => {
    setImage(e.target.files[0]);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+]).{8,}$/;
    return passwordRegex.test(password);
  };

  const StudentData = async () => {
    const isPasswordValid = validatePassword(password.current.value);

    if (!isPasswordValid) {
      alert("Password must be at least 8 characters and contain at least one number, one letter, and one symbol");
      return;
    }

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

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/student", form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("(° ͜ʖ͡°)つ Register successfully");
      // Clear input values
      student_name.current.value = '';
      student_email.current.value = '';
      student_gender.current.value = '';
      student_college_name.current.value = '';
      student_dob.current.value = '';
      standard.current.value = '';
      username.current.value = '';
      password.current.value = '';
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Username or email already exists. Please choose a different one.");
      } else {
        alert("ლ(ಠ益ಠლ) Register failed");
      }
    }
  };

  return (
    <>
      <div className=' bg-gradient-to-b from-[#ffffff86] p-3 to-[rgb(34,250,250)] h-screen'>
        <div className="container mx-auto p-6">
          <div className="mx-[400px] bg-gradient-to-t from-[white] to-[#fd9002] p-4  rounded-lg shadow-md max-w-md w-full">
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
                <select ref={student_gender} className="w-full p-2 border rounded-md">
                  <option>Select Your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
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
                <select ref={standard} className="w-full p-2 border rounded-md">
                  <option>Select Your Education</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
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
              <button onClick={StudentData} className="bg-green-500 text-white px-4 py-2 rounded-md">
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
  );
};

export default AddStudent;
