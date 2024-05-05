import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext.js'
import { Navigate, useNavigate, redirectDocument } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import Nav from './Nav.js';
import Login from './Login.js';

const AddNotes = () => {
    const { addNote } = useContext(NoteContext);
    const token = localStorage.getItem("authtoken")
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        console.log("clicked")
        addNote(note.title, note.description, note.tag, token);
        setNote({ title: "", description: "", tag: "" });
    }
    useEffect(() => {
      if(!token){navigate("/login")} 
    }, [])
    

    return (
        <>
        
            
                {token && <Sidebar />}
                <Nav />
                {token && <div className='w-full h-screen lg:w-[87.5%] md:w-[70.5%] flex flex-wrap justify-center items-center fixed right-0 -z-10'>
                            <div className='w-full md:min-w-[70%] p-1 ml-auto '>
                                <form className="w-[80%] md:w-[60%] h-[50%] max-w-lg flex flex-col justify-around self-center border-2 p-2 mt-15 rounded-md ml-auto mr-auto">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                title
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="title"
                                                value={note.title}
                                                name="title"
                                                minLength={8}
                                                type="text"
                                                placeholder="title"
                                                onChange={onChange} />
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                tag
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="tag"
                                                minLength={8}
                                                value={note.tag}
                                                name="tag"
                                                type="text"
                                                placeholder="tag"
                                                onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Description
                                            </label>
                                            <textarea
                                                className=" h-[200px] appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="description"
                                                value={note.description}
                                                name="description"
                                                minLength={10}
                                                type="text"
                                                placeholder="Write your note here"
                                                onChange={onChange} />
                                            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                                        </div>
                                    </div>
                                    <button className="self-center bg-gray-900 text-white w-[150px] min-w-[150px] rounded-md h-9" onClick={handleClick}>Add Note</button>

                                </form>
                            </div>
                        </div>
                    }
        </>

    )
}

export default AddNotes
