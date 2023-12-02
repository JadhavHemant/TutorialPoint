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
            // alert("success");
            setvidData(res.data)
        }).catch((err) => {
            alert("check again code")
        })
    }
    return (
        <>
            <div>
                <ul className="flex space-x-5 p-4">
                    {subject.map((d, k) => (
                        <li key={k}>
                            <button className="px-4 text-black" onClick={() => Chapte(d.id)}>{d.subject_name}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div className="flex ">
                {/* Sidebar for Chapter Selection */}
                <div className="w-1/10 p-4 w-[250px] h-screen bg-gray-800">
                    <h2 className="text-lg text-[red]">Chapter Name</h2>
                    <hr />
                    {chapter.map((d, k) => (
                        <ul className="mt-6" ref={videodata} >
                            <li value={d.id} key={k} onClick={() => videoid(d.id)} className="mb-2 cursor-pointer text-white">{k + 1} ] {d.chapter_name}</li>
                            <hr />
                        </ul>
                    ))}
                </div>
                <div className='p-[1px]'></div>
                {/*  */}
                <div className="flex">
                    {/* Sidebar for  Selection */}
                    <div className="w-1/10 p-4 w-[250px] h-screen bg-gray-800 ">
                        <h2 className="text-lg font-semibold text-[red]">Topic List</h2>
                        <hr />
                        <ul>
                            <li className='p-2'>
                                {data.map((d, k) => (
                                    <div key={d.id} className="p-4 text-[white]" onClick={() => idwisevideo(d.id)}>
                                        <h3 className="text-[15px] cursor-pointer">{k + 1} .{d.video_caption}</h3>
                                        <hr />
                                    </div>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>
                {/*  */}
                {/* Main vedio palyer */}
                <div className="py-[20px]">
                <div className="p-5 w-[870px] h-[600px] relative">
                    <div className="main-video border border-double" id="mainVideo">
                        {idvdata.map((d, k) => (
                            <div key={d.id} onClick={() => idwisevideo(d.id)}>
                                <video controls className="w-full">
                                    <source src={`http://localhost:8000/static/video/${d.video_tutorial}`} type="video/mp4" />
                                </video>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
                <br />
            </div>
        </>
    );
};

export default StudentVideo;
