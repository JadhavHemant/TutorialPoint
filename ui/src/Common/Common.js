import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminCommon from '../Admin/AdminCommon/AdminCommon';
import Dashboard from '../Admin/Dashboard/Dashboard';
import AddStudent from '../Admin/AddStudent/AddStudent';
import SubjectCommon from '../Admin/Subject/SubjectCommon/SubjectCommon';
import Subject from '../Admin/Subject/AddSubject/Subject';
import Chapter from '../Admin/Subject/Chapter/Chapter';
import TextTuto from '../Admin/Subject/TextTuto/TextTuto';
import Video from '../Admin/Subject/Video/Video';

// Student section starts from here

import StudentDashboard from '../Student/StudentDashboard/StudentDashboard';
import StudentProfile from '../Student/StudentProfile/StudentProfile';
import StudentTutorial from '../Student/StudentTutorial/StudentTutorial';
import StudentVedio from '../Student/StudentVedio/StudentVedio';
import StudentCommon from '../Student/StudentCommon/StudentCommon';
import LoginCommon from '../LoginAdmin/LoginCommon/LoginCommon';
import Login from '../LoginAdmin/Login';
import Regist from '../LoginAdmin/Regist';
import Exam from '../Admin/Subject/Exam/Exam';
import StudentExam from '../Student/StudentExam/StudentExam';
const Common = () => {
   return (
      <div>
         <Router>
            <Routes>
               {/*  */}
               <Route path='' element={<LoginCommon />}>
                  <Route path='' element={<Login />} />
                  <Route path='register' element={< Regist />} />
               </Route>
               <Route path='admin' element={<AdminCommon />}>
                  <Route path='' element={<Dashboard />} />
                  <Route path='studentadd' element={<AddStudent />} />
                  <Route path='subject' element={<SubjectCommon />}>
                     <Route path='' element={<Subject />} />
                     <Route path='chapter' element={<Chapter />} />
                     <Route path='texttuto' element={<TextTuto />} />
                     <Route path='video' element={<Video />} />
                     <Route path='exam' element={<Exam />} />
                  </Route>
               </Route>
               {/*  */}
               <Route path='Student' element={<StudentCommon />}>
                  <Route path='' element={<StudentDashboard />} />
                  <Route path='profile' element={<StudentProfile />} />
                  <Route path='stutorial' element={<StudentTutorial />} />
                  <Route path='svideo' element={<StudentVedio />} />
                  <Route path='studentexam' element={<StudentExam />} />
               </Route>
            </Routes>
         </Router>
      </div>
   )
}

export default Common
