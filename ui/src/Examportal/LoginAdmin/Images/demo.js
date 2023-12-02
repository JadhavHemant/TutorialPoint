import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const studemail = useRef();
  const password = useRef();

  const StudentAdminLogin = (e) => {
    e.preventDefault(); // Move this line here to prevent default form submission behavior

    var email = studemail.current.value;
    var pass = password.current.value;

    if (!email) {
      alert("Please enter your email");
    } else if (!pass) {
      alert("Please enter your password");
    } else if (email === "Admin" && pass === "pass") { // Use && instead of ||
      navigate('/admin/');
      alert("admin login");
    } else {
      var Studelog = {
        student_email: email,
        password: pass, // Change password to pass
      };

      axios({
        url: "http://localhost:8000/api/student/login",
        method: "POST",
        data: Studelog,
        headers: { // Use headers instead of contentType
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          alert(`${res.data.id} logged in`);
          navigate("/user/");
        })
        .catch((err) => {
          alert("check data");
        });
    }
  };

  return (
    <div>
      <form>
        <input type="text" ref={studemail} placeholder="Username" />
        <input type="password" ref={password} placeholder="Password" />
        <button type="submit" className="btn" onClick={StudentAdminLogin}>
          Login
        </button>
        {/* <button onClick={() => navigate('/register')}>Create an account</button> */}
      </form>
    </div>
  );
};

export default Login;
