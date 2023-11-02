import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

const Chapter = () => {

  const [subject, setSubject] = useState([]); //for subject id 

  const [chap, setChapter] = useState([])//for chapter

  const [chapid, setChapid] = useState([]);// for chapter id

  const subno = useRef(); //insert subject id

  const chepter = useRef(); //chapter name

  //data will mounted when component is loaded

  useEffect(() => {
    getSubjects();
  }, []);

  //geting all subjects name 

  const getSubjects = () => {
    axios({
      url: "http://localhost:8000/api/subject",
      method: "GET",
      contentType: "application/json",
    }).then((res) => {
      setSubject(res.data)
    }).catch((err) => {
      alert("fuck check again")
    })
  }

  // add chapter 

  const AddChapter = () => {
    var data = { "chapter_name": chepter.current.value, "subject_id": subno.current.value }
    axios({
      url: `http://localhost:8000/api/chapter`,
      method: "POST",
      data: data,
      contentType: "application/json",
    }).then((res) => {
      alert("done");
      chepter.current.value = [];
    }).catch((err) => {
      alert("check again")
    })
  }



  const DeleteChapter = (id) => {
    axios({
      url: `http://localhost:8000/api/chapter/update/delete/${id}/`,
      method: "delete",
      contentType: "applicaion/json",
    }).then((res) => {
      alert("deleted")
      Chapter();
    }).catch((err) => {
      alert("check again")
    })
  }



  //view current chapter

  const ViewChapter = (id) => {
    setChapid(id);
    axios({
      url: `http://localhost:8000/api/chapter/update/delete/${id}/`,
      method: "get",
      contentType: "application/json"
    }).then((res) => {
      chepter.current.value = res.data.chapter_name
      alert("done")
    }).catch((err) => {
      alert("check again code!!!")
    })
  }

  //update current chapter

  const UpdateChapter = () => {
    var id = chapid;
    var data = { "chapter_name": chepter.current.value, "subject_id": subno.current.value }
    axios({
      url: `http://localhost:8000/api/chapter/update/delete/${id}/`,
      method: "put",
      data: data,
      contentType: "application/json"
    }).then((res) => {
      alert("update chapter")
      chepter.current.value = [];
    }).catch((err) => {
      alert("error updating chapter")
    })
  }

  // subject wise chapters

  const datachap = useRef()
  const Chapter = () => {
    var id = datachap.current.value
    axios({
      url: `http://127.0.0.1:8000/api/subject/chapter/${id}/`,
      method: "GET",
      contentType: "application/json",
    }).then((res) => {
      setChapter(res.data);
    }).catch((err) => {
      alert("faild")
    })
  }

  return (
    <>
      <div className="max-w-screen-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Chapters</h1>
        <div className="flex space-x-4 mb-4">
          <select ref={subno} className="p-2 border rounded">
            <option>Select subject</option>
            {subject.map((d, k) => (
              <option value={d.id} key={k}>
                {k + 1}. {d.subject_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter chapter name"
            ref={chepter}
            className="p-2 border rounded w-1/2"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded border-black hover:bg-blue-600"
            onClick={() => AddChapter()}
          >
            Add
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded border-black hover:bg-blue-600"
            onClick={() => UpdateChapter()}
          >
            Update
          </button>
        </div>
        <hr />
        <div className="pt-6 mb-4 ">
          <select
            ref={datachap}
            onChange={() => Chapter()}
            className="p-2 border rounded border-black"
          >
            <option>Select subject</option>
            {subject.map((d, k) => (
              <option value={d.id} key={k}>
                {k + 1}. {d.subject_name}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 border">Sr. No</th>
                <th className="p-2 border">Chapter Name</th>
                <th className="p-2 border">Update</th>
                <th className="p-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {chap.map((d, k) => (
                <tr key={k}>
                  <td className="p-2 border">{k + 1}</td>
                  <td className="p-2 border">{d.chapter_name}</td>
                  <td className='border'>
                    <button
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 "
                      onClick={() => DeleteChapter(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className='border'>
                    <button
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 "
                      onClick={() => ViewChapter(d.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*  */}
    </>
  )
}

export default Chapter