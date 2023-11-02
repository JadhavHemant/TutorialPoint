import React, { useEffect,useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [ins, setData] = useState([]);
    const [currentpage, setCurrentpage] = useState(1);
    const regardsperpages = 10;
    const lastindex = currentpage * regardsperpages;
    const firstindex = lastindex - regardsperpages;
    const data = ins.slice(firstindex, lastindex);
    const noofpages = Math.ceil(ins.length / regardsperpages);

    const nextPage = () => {
        if (currentpage < noofpages) {
            setCurrentpage(currentpage + 1);
        }
    }

    const prevPage = () => {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get("http://127.0.0.1:8000/api/dashboard")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                alert("Error fetching data");
            });
    }
    return (
        <div>
            <div className="bg-gray-100 min-h-screen p-8">
                <h1 className="text-3xl mb-4 text-center text-gray-800">❉ Instructions ❉</h1>

            <div className="bg-white rounded-lg p-4">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">sr.no</th>
                            <th className="text-left">Instruction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, k) => (
                            <tr key={k}>
                                <td>{k + 1}</td>
                                <td>{d.instructions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <button onClick={() => prevPage()} className="bg-gray-300 px-2 py-1 rounded-md">
                    Prev
                </button>
                <button onClick={() => nextPage()} className="bg-gray-300 px-2 py-1 rounded-md ml-2">
                    Next
                </button>
            </div>
        </div>
        </div>

  )
}

export default StudentDashboard
