import React, { useRef } from 'react';
// import Image from './Images/login.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const txtuser = useRef();
  const txtpassword = useRef();


  const LoginStudent = (e) => {
    var u = txtuser.current.value;
    var p = txtpassword.current.value;

    if (!u) {
      alert("Please enter Email")
    }
    else if (!p) {
      alert("Password")
    }
    else if (u === "hemant" && p === "hemant") {
      navigate("/admin/")
    }
    else {
      e.preventDefault();
      const student = {
        username: txtuser.current.value,
        password: txtpassword.current.value,
      };

      axios({
        url: 'http://localhost:8000/api/student/login/',
        method: 'POST',
        data: student,
        contentType: "application/json"
      })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("user_id", res.data.id);
          navigate("/Student/")
        })
        .catch((error) => {
          console.error(error);
          alert("Wrong Username or Password Check Again")
        });
    };
  }

  return (
    <>
      <div className=' bg-gradient-to-b from-[#ffffff86] p-3 to-[rgb(34,250,250)] h-screen' >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-gradient-to-t from-[white] to-[#fd9002] p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <hr className="my-2 border border-gray-400" />

            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                <input
                  type="text"
                  id="username"
                  ref={txtuser}
                  className="w-full border p-2 border-gray-400 rounded"
                  placeholder="Username"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  id="password"
                  ref={txtpassword}
                  className="w-full border p-2 border-gray-400 rounded"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[orange] text-white p-2 rounded"
                onClick={LoginStudent}
              >
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Don't have an account?{' '}
              <a href="/register" className="text-black text-bold hover:underline">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
