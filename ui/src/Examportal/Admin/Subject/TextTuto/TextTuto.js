import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

const TextTuto = () => {

  useEffect(() => {
    GetTutorial()
  }, []);

  const [data, setData] = useState([]);

  const GetTutorial = () => {
    axios({
      url: `http://localhost:8000/api/tutorial`,
      method: "get",
      contentType: "application/json",
    }).then((res) => {
      setData(res.data)
      // alert("done")
    }).catch((err) => {
      // alert("faild")
    })
  };

  const chapterid = useRef();

  const [filed, setFile] = useState([]);

  const Csvdata = (e) => {
    setFile(e.target.files[0]);
  }

  const AddTutorial = () => {
    const form = new FormData();
    form.append("chapter_id", chapterid.current.value)
    form.append("csvfile", filed)
    form.append("tutorial_file", filed.name)
    axios({
      url: `http://localhost:8000/api/tutorial`,
      method: "post",
      data: form,
      contentType: "application/json"
    }).then((res) => {
      alert("done addd")
      chapterid.current.value = [];
    }).catch((err) => {
      alert("gandlay")
    })
  }
  return (
    <>
      <div className="p-4 bg-gray-200 rounded-md mb-4">
        <input type="text" ref={chapterid} placeholder="Enter chapter id" lassName="p-2 border border-gray-300 rounded-md mr-2" />
        <input type="file" accept=".csv" onChange={Csvdata} className="p-2 border border-gray-300 rounded-md mr-2" />
        <button onClick={AddTutorial} className="p-2 bg-blue-500 text-white rounded-md">Add</button>
      </div>
      <hr />
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 bg-gray-200">ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, k) => (
            <tr key={d.id}>
              <td className="p-2 border border-gray-300">{d.id}</td>
              <td>{d.tutorial_file}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default TextTuto;