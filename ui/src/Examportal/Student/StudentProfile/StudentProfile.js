import React, { useEffect, useState } from 'react'
import axios from 'axios';
const StudentProfile = () => {
  const [student, setDataStudent] = useState("");

  useEffect(function () {
    var id = localStorage.getItem("user_id");
    axios({
      url: `http://localhost:8000/api/student/id/data/${id}`,
      method: "get",
      contentType: "application/json"
    }).then(e => {
      setDataStudent(e.data)
    }).catch((err) => {
      alert("error")
    })
  }, []);
  return (
    <>
   <div class="flex justify-center items-center h-screen">
  <div class="testimonial bg-gray-100 p-4">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="col-span-4 flex justify-center">
          <div class="bg-white p-4 shadow-lg rounded-lg">
            <i class="fa fa-quote-left text-3xl text-gray-400 mb-4" aria-hidden="true"></i>
            <div class="mb-4 flex justify-center">
              <img src={`http://localhost:8000/static/student/${student.student_image}`} alt="student img" class="object-cover w-32 h-32 rounded-full" />
            </div>
            <div>
              <h5 class="text-base text-gray-600">User Name Name: {student.username}</h5>
              <h5 class="text-base text-gray-600 mb-2">Student Name: {student.student_name}</h5>
              <h5 class="text-base text-gray-600 mb-2">Student Gender:{student.student_gender}</h5>
              <h5 class="text-base text-gray-600 mb-2">Student Email: {student.student_email}</h5>
              <h5 class="text-base text-gray-600 mb-2">Student Contact: {student.student_college_name}</h5>
              <h5 class="text-base text-gray-600">City Name: {student.student_dob}</h5>
              <h5 class="text-base text-gray-600"> Standard: {student.standard}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default StudentProfile
