import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const StudentVideo = () => {
    const [subject, setSubject] = useState([]); // for subject id
    const [chapter, setChapter] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        GetVideo();
        getSubjects();
    }, []);

    const getSubjects = () => {
        axios({
            url: 'http://localhost:8000/api/subject',
            method: 'GET',
            contentType: 'application/json',
        })
            .then((res) => {
                setSubject(res.data);
            })
            .catch((err) => {
                alert('Failed to fetch subjects');
            });
    }


    const Chapte = (id) => {
        axios({
            url: `http://127.0.0.1:8000/api/subject/chapter/${id}/`,
            method: 'GET',
            contentType: 'application/json',
        })
            .then((res) => {
                setChapter(res.data);
            })
            .catch((err) => {
                alert('Failed to fetch chapters');
            });
    }

    const GetVideo = () => {
        axios
            .get('http://localhost:8000/api/video')
            .then((res) => {
                // setData(res.data);
            })
            .catch((err) => {
                alert('Video data fetch failed');
            });
    };

    const videodata = useRef();

    const videoid = (id) => {
        axios({
            url: `http://localhost:8000/api/chapter/video/${id}/`,
            method: "GET",
            contentType: 'application/json',
        }).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            console.log("err")
        })
    }

    const [idvdata, setvidData] = useState([]);
    const idwisevideo = (id) => {
        axios({
            url: `http://localhost:8000/api/video/id/${id}`,
            method: "get",
            contentType: "application/json"
        }).then((res) => {
            alert("success")
            setvidData(res.data)
        }).catch((err) => {
            alert("fuck")
        })
    }





    return (
        <>
            <div>
                <ul className="flex space-x-5 p-2">
                    {subject.map((d, k) => (
                        <li key={k}>
                            <button className="px-4 text-black" onClick={() => Chapte(d.id)}>{d.subject_name}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div className="flex">
                {/* Sidebar for Subject and Chapter Selection */}
                <div className="w-1/10 h-full p-6 w-[250px] bg-gray-800 ">
                    <h2 className="text-lg font-semibold text-[red]">Chapter Name</h2>
                    {chapter.map((d, k) => (
                        <ul className="mt-6" ref={videodata} >
                            <li value={d.id} key={k} onClick={() => videoid(d.id)} className="mb-2 cursor-pointer text-white">{k + 1} ] {d.chapter_name}</li>
                            <hr />
                        </ul>
                    ))}
                </div>
             
                {/* Main vedio palyer */}
                
               <div className=" w-[1000px] h-[500px] relative">
                    {/* Main Video Player */}
                    <div className="main-video" id="mainVideo">
                        {idvdata.map((d, k) => (
                            <div key={d.id} onClick={() => idwisevideo(d.id)}>
                                <video controls className="w-full">
                                    <source src={`http://localhost:8000/static/video/${d.video_tutorial}`} type="video/mp4" />
                                </video>
                            </div>
                        ))}
                    </div>
               </div>
                <br />
                {/* Main Content (Video Display) */}
               
                <div className="w-3/4 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {data.map((d, k) => (
                            <div key={d.id} className="bg-[#c9c3c3] rounded-lg shadow-md p-4" onClick={() => idwisevideo(d.id)}>
                                <video className="w-full">
                                    <source src={`http://localhost:8000/static/video/${d.video_tutorial}`} type="video/mp4" />
                                </video>
                                <h3 className="text-[20px] font-bold">{k + 1}]  {d.video_caption}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentVideo;
