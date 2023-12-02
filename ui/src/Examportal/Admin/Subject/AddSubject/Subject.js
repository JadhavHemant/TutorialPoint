import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Subject = () => {
  const sub = useRef();
  const [subd, setSubject] = useState([]);
  const [subid, setSubId] = useState([]);
  const [isUpdateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    GetSub();
  }, []);

  const AddSubject = () => {
    const vishay = { subject_name: sub.current.value };
    axios({
      url: "http://localhost:8000/api/subject",
      method: "post",
      data: vishay,
      contentType: "application/json",
    }).then((res) => {
      alert("(° ͜ʖ͡°)つ Subject Added successfully");
      sub.current.value = '';
      GetSub();
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Check Code");
    });
  };

  const GetSub = () => {
    axios({
      url: "http://localhost:8000/api/subject",
      contentType: "application/json",
      method: "GET",
    }).then((res) => {
      setSubject(res.data);
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Check Code");
    });
  };

  const ViewSubject = (id) => {
    setSubId(id);
    axios({
      url: `http://127.0.0.1:8000/api/subject/update/delete/${id}`,
      method: "get",
      contentType: "application/json",
    }).then((res) => {
      alert("(° ͜ʖ͡°)つ Check Input Fields");
      sub.current.value = res.data.subject_name;
      setUpdateMode(true);
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Check Code");
    });
  };

  const UpdateSubject = () => {
    const id = subid;
    const data = { subject_name: sub.current.value };
    axios({
      url: `http://127.0.0.1:8000/api/subject/update/delete/${id}/`,
      method: "put",
      data: data,
      contentType: "application/json",
    }).then((res) => {
      alert("(° ͜ʖ͡°)つ Subject Updated successfully");
      GetSub();
      sub.current.value = '';
      setUpdateMode(false);
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Check Code");
      sub.current.value = '';
    });
  };

  const DeleteSubject = (id) => {
    axios({
      url: `http://127.0.0.1:8000/api/subject/update/delete/${id}`,
      method: "Delete",
      contentType: "application/json",
    }).then((res) => {
      alert("(° ͜ʖ͡°)つ Subject Deleted successfully");
      GetSub();
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Check Code");
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3 mb-6 text-center font-bold">
         {isUpdateMode ? 'Update' : 'Add'} Subject 
      </h1>

      <div className="mx-[250px] grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            ref={sub}
            placeholder={`Enter ${isUpdateMode ? 'Updated' : 'New'} Subject Name`}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <div className="space-x-4">
            <button onClick={() => (isUpdateMode ? UpdateSubject() : AddSubject())} className={`${isUpdateMode ? 'bg-yellow-500' : 'bg-blue-500'} text-white px-4 py-2 rounded-md`} >{isUpdateMode ? 'Update' : 'Add'} Subject</button>
            {isUpdateMode && (
              <button
                onClick={() => {
                  sub.current.value = '';
                  setUpdateMode(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <div className="text-center"> {/* Center the table */}
        <table className=" border inline-block rounded p-8">
          <thead>
            <tr>
              <th className="p-2">sr.no</th>
              <th className="p-2">Subject Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subd.map((d, k) => (
              <tr key={k}>
                <td className="p-2">{k + 1}</td>
                <td className="p-2">{d.subject_name}</td>
                <td className="p-2">
                  <button
                    onClick={() => ViewSubject(d.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => DeleteSubject(d.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subject;
