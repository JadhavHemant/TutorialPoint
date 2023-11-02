import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Video = () => {
  useEffect(() => {
    GetChapters();
    GetSubjects();
  }, []);



  const [video, setVideo] = useState(null);

  const Data = (e) => {
    setVideo(e.target.files[0]);
  };

  const [chapter, setChapter] = useState([])
  console.log(chapter)
  const GetChapters = () => {
    axios({
      url: `http://localhost:8000/api/chapter`,
      method: 'GET',
      contentType: 'application/json',
    })
      .then((res) => {
        setChapter(res.data);
      })
      .catch((err) => {
        alert("ლ(ಠ益ಠ)ლ Check Code");
      });
  }

  const videocaption = useRef();
  const datachap = useRef();



  const AddVideo = () => {
    const form = new FormData();
    form.append('chapter_id', datachap.current.value);
    form.append('video', video);
    form.append('video_tutorial', video.name);
    form.append('video_caption', videocaption.current.value);
    axios({
      url: `http://localhost:8000/api/video`,
      method: 'POST',
      data: form,
      contentType: 'application/json',
    })
      .then((res) => {
        alert('(° ͜ʖ͡°)つ Chapter Added successfully');
        videocaption.current.value = '';
        GetIdVideo();
      })
      .catch((err) => {
        alert("ლ(ಠ益ಠ)ლ Check Code");
      });
  };

  const DeleteVedio = (id) => {
    axios({
      url: `http://localhost:8000/api/video/update/delete/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
    }).then((res) => {
      alert("(° ͜ʖ͡°)つ Chapter Delete successfully")
      GetIdVideo();
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Check Code");
    })
  }


  const [subject, setSubject] = useState([])
  const GetSubjects = () => {
    axios({
      url: `http://localhost:8000/api/subject`,
      method: 'GET',
      contentType: 'application/json',
    })
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        alert("ლ(ಠ益ಠ)ლ Check Code");
      });
  }

  const Subdata = useRef();
  const [chapOp, setChapOp] = useState([])
  const GetIdChapter = () => {
    var id = Subdata.current.value;
    axios({
      url: `http://127.0.0.1:8000/api/subject/chapter/${id}/`,
      method: "GET",
      contentType: 'application/json',
    }).then((res) => {
      setChapOp(res.data);
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Check Code")
    })
  }

  const chapdata = useRef();

  const [vdata, setViedoData] = useState([])
  const GetIdVideo = () => {
    var id = chapdata.current.value;
    axios({
      url: `http://127.0.0.1:8000/api/chapter/video/${id}/`,
      method: "GET",
      contentType: 'application/json',
    }).then((res) => {
      setViedoData(res.data);
    }).catch((err) => {
      alert("ლ(ಠ益ಠ)ლ Check Code")
    })
  }

  return (
    <>
      <div className="bg-gradient-to-r to-white-500  from-[#46f0fc]  to-[#fcfafb] w-[1090px] p-4 border border-[black] rounded-[40px]">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <select
            ref={datachap}
            className="p-2 border rounded border-black mb-4 w-[400px]"
          >
            <option>Select subject</option>
            {chapter.map((d, k) => (
              <option value={d.id} key={k}>
                {k + 1}. {d.chapter_name}
              </option>
            ))}
          </select>
          <div className="mb-4">
            <input
              type="file"
              onChange={Data}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Video Caption"
              ref={videocaption}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            className="bg-orange text-black py-2 px-4 rounded hover:bg-orange-dark focus:outline-none"
            onClick={() => AddVideo()}
          >
            Add Video
          </button>
        </div>
      </div>

      <div className="p-10 flex">
        <div className="mr-[200px] ">
          <select className='w-[300px] border border-black' ref={Subdata} onChange={() => GetIdChapter()}>
            <option className='border border-black'>Select Subject</option>
            {subject.map((d, k) => (
              <option value={d.id} key={k}>
                {k + 1}. {d.subject_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mr-10"></div>
        <select className='border border-black w-[300px]' ref={chapdata} onChange={() => GetIdVideo()}>
          <option>Select Chapter</option>
          {chapOp.map((d, k) => (
            <option value={d.id} key={k}>
              {k + 1}. {d.chapter_name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vdata.map((d, k) => (
          <div key={d.id} className="bg-white rounded-lg shadow-md p-4">
            <video controls className="w-full">
              <source src={`http://localhost:8000/static/video/${d.video_tutorial}`} type="video/mp4" />
            </video>
            <h1 className="text-xl font-semibold mb-2">
              {k + 1} ] {d.video_caption}
            </h1>
            <button onClick={() => DeleteVedio(d.id)} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Video;

