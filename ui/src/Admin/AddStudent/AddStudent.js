import React, { useRef, useEffect, useState } from 'react'//use of react hooks
import axios from 'axios'//for data fetch from api


const AddStudent = () => {
  const [student, setStudent] = useState([]);


  useEffect(() => {
    //call for fetch studentdata !!!
    GetStudent()
  }, []);

  const GetStudent = () => {
    axios({
      url: "http://localhost:8000/api/student",
      method: "get",
      contentType: "application/json",
    }).then((res) => {
      console.log(res.data)
      setStudent(res.data)
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Data Not Found: ")
    })
  }

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
        GetStudent();
        student_name.current.value = [];
        student_email.current.value = [];
        student_gender.current.value = [];
        student_college_name.current.value = [];
        student_dob.current.value = [];
        standard.current.value = [];
        username.current.value = [];
        password.current.value = [];
      })
      .catch((err) => {
        alert("ლ(ಠ益ಠ)ლ Register failed")
      });
  }
  // DeleteStudent
  const DeleteStudent = (id) => {
    axios({
      url: `http://localhost:8000/api/student/update/delete/${id}/`,
      method: "delete",
      contentType: "application/json",

    }).then((res) => {
      alert("(° ͜ʖ͡°)つ Delete successfully")
      GetStudent()
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ failed")
    })
  }

  //for update student details
  const [sid, setStudntid] = useState([])
  const ViewStudent = (id) => {
    setStudntid(id)
    axios({
      url: `http://localhost:8000/api/student/update/delete/${id}/`,
      method: "get",
      contentType: "application/json",
    }).then((res) => {
      alert("ლ(ಠ益ಠ)ლ Check Code");
      setToggle(true);
      student_name.current.value = res.data.student_name;
      student_email.current.value = res.data.student_email;
      student_gender.current.value = res.data.student_gender;
      student_college_name.current.value = res.data.student_college_name;
      student_dob.current.value = res.data.student_dob;
      standard.current.value = res.data.standard;
      username.current.value = res.data.username;
      password.current.value = res.data.password;
    })
  }
  const UpdateStudent = () => {
    var id = sid;
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
      url: `http://localhost:8000/api/student/update/delete/${id}/`,
      method: "put",
      data: form,
      contentType: "application/json"
    })
      .then((res) => {
        alert("(° ͜ʖ͡°)つ Update successfully");
        GetStudent();
        setToggle(false);
        student_name.current.value = [];
        student_email.current.value = [];
        student_gender.current.value = [];
        student_college_name.current.value = [];
        student_dob.current.value = [];
        standard.current.value = [];
        username.current.value = [];
        password.current.value = [];
        setImage([]);
      })
      .catch((err) => {
        alert("ლ(ಠ益ಠ)ლ Update failed")
      });
  }
  // For  Toggling
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl text-center mb-6">Student Register</h1>
        <hr className="mb-6" />

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              ref={student_name}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="file"
              onChange={StudentPhoto}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Student Email"
              ref={student_email}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Student Gender"
              ref={student_gender}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Student College Name"
              ref={student_college_name}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="date"
              ref={student_dob}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Standard"
              ref={standard}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Username"
              ref={username}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              ref={password}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </form>

        <div className="text-center mt-6">
          {toggle ? (
            <button onClick={() => UpdateStudent()} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Update
            </button>
          ) : (
            <button onClick={() => StudentData()} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          )}
        </div>

        <div className="mt-8">
          <h1 className="text-3xl text-center mb-6">❉ All Students ❉</h1>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-2">sr.no</th>
              <th className="p-2">Student Image</th>
              <th className="p-2">Student name</th>
              <th className="p-2">Student email</th>
              <th className="p-2">Gender</th>
              <th className="p-2">College Name</th>
              <th className="p-2">Date Of Birth</th>
              <th className="p-2">Qualification</th>
              <th className="p-2">Username</th>
              <th className="p-2">Password</th>
              <th className="p-2">Update</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {student.map((d, k) => (
              <tr key={k}>
                <td className="p-2">{k + 1}</td>
                <td className="p-2">
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    <img src={`http://localhost:8000/static/student/${d.student_image}`} alt="student img" className="object-cover w-full h-full" />
                  </div>
                </td>
                <td className="p-2">{d.student_name}</td>
                <td className="p-2">{d.student_email}</td>
                <td className="p-2">{d.student_gender}</td>
                <td className="p-2">{d.student_college_name}</td>
                <td className="p-2">{d.student_dob}</td>
                <td className="p-2">{d.standard}</td>
                <td className="p-2">{d.username}</td>
                <td className="p-2">{d.password}</td>
                <td className="p-2">
                  <button onClick={() => ViewStudent(d.id)} className="bg-blue-500 text-white px-2 py-1 rounded-md">
                    View
                  </button>
                </td>
                <td className="p-2">
                  <button onClick={() => DeleteStudent(d.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default AddStudent
