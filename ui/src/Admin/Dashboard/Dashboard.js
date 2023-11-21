import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [toggle, setToggle] = useState(false);
    const instr = useRef();
    const [ins, setData] = useState([]);

    const [iid, setId] = useState([]);

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
                alert("ლ(ಠ益ಠ)ლ Check Code");
            });
    }

    const addInstruction = () => {
        const data = { "instructions": instr.current.value };
        axios.post("http://127.0.0.1:8000/api/dashboard", data)
            .then((res) => {
                alert("(° ͜ʖ͡°)つ instruction Added successfully");
                instr.current.value = '';
                getData();
            })
            .catch((err) => {
                alert("ლ(ಠ益ಠ)ლ Error adding instruction");
            });
    };

    const deleteData = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/dashupdate/${id}/`)
            .then((res) => {
                alert("(° ͜ʖ͡°)つ Instruction deleted successfully");
                getData();
            })
            .catch((err) => {
                alert("ლ(ಠ益ಠ)ლ Error deleting instruction");
            });
    };

    const viewData = (id) => {
        setId(id);
        axios.get(`http://127.0.0.1:8000/api/dashupdate/${id}/`)
            .then((res) => {
                instr.current.value = res.data.instructions;
                alert("(° ͜ʖ͡°)つ Viewing instruction for update");
                setToggle(true);
            })
            .catch((err) => {
                alert("ლ(ಠ益ಠ)ლ Error fetching data for update");
            });
    };

    const updateInstruction = () => {
        const id = iid;
        const data = { "instructions": instr.current.value };
        axios.put(`http://127.0.0.1:8000/api/dashupdate/${id}/`, data)
            .then((res) => {
                instr.current.value = '';
                alert("(° ͜ʖ͡°)つ Instruction updated successfully");
                getData();
                setToggle(false);
            })
            .catch((err) => {
                alert("ლ(ಠ益ಠ)ლ Error updating instruction");
            });
    };

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl mb-4 text-gray-800">❉ Dashboard ❉</h1>
            <div className="mb-8">
                <div className="bg-white rounded-lg p-4">
                    <input
                        type="text"
                        placeholder="Enter An Instruction"
                        ref={instr}
                        className="w-full p-2 border rounded-md"
                    />
                    <div className="mt-2">
                        {
                            toggle ? (
                                <button
                                    onClick={() => updateInstruction()} className="bg-[orange] text-white px-4 py-2 rounded-md">Update</button>
                            ) : 
                                <button onClick={() => addInstruction()} className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
            }
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">sr.no</th>
                            <th className="text-left">Instruction</th>
                            <th className="text-left">Delete</th>
                            <th className="text-left">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, k) => (
                            <tr key={k}>
                                <td>{k + 1}</td>
                                <td>{d.instructions}</td>
                                <td>
                                    <button onClick={() => deleteData(d.id)} className="text-red-500">
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => viewData(d.id)} className="text-blue-500">
                                        View
                                    </button>
                                </td>
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
    );
};

export default Dashboard;
