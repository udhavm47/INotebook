import React, { useContext, useEffect,useRef } from 'react'
import Nav from './Nav.js';
import Login from './Login.js';
import NoteItem from './NoteItem.js';
import NoteContext from '../context/notes/noteContext.js';
import 'flowbite';
import { useState } from 'react';
import Sidebar from './Sidebar.js';
import { Navigate, useNavigate,redirect } from 'react-router-dom';

const Notes = () => {
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate()
    const token = localStorage.getItem("authtoken")
    const [edited, setEdited] = useState(false);
    const [values,setValues] = useState({id:"",title:"",tag:"",description:""});
    const { notes, setNotes, getAllNotes, editNote } = useContext(NoteContext);
    useEffect(() => {
        getAllNotes(token);
        if(!token){navigate("/login")}
    }, [])

   useEffect(() => {
        getAllNotes(token);
        setEdited(false);
    }, [edited])

    //console.log(notes);

    const editToggle = (note, id) =>{
        ref.current.click();
        setValues({...note, id:note._id});
        console.log(id)
        
    }

    const handleClick = (e) =>{
        e.preventDefault();
        console.log("clicked!!", values)
        refClose.current.click()
        const x = editNote(values.id, values.title,values.description,values.tag, token)
        if(x)(setEdited(true));
    }

    //modal controller

    document.addEventListener("DOMContentLoaded", function (event) {
        event.preventDefault()
        document.getElementById('updateProductButton').click();
    });
    return (
        <>
            {token &&<Sidebar />}
            {/* Modal toggle */}
            <div className="flex justify-center m-5">
                            <button id="updateProductButton" ref={ref} data-modal-toggle="updateProductModal" className="hidden text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">
                            </button>
                        </div>
                        {/* Main modal*/}
                        <div id="updateProductModal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                                {/* Modal content */}
                                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                    {/* Modal header */}
                                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Edit Note
                                        </h3>
                                        <button type="button" ref={refClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    {/* Modal body */}
                                    <form action="/" method='PUT'>
                                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input 
                                                type="text" 
                                                name="title" 
                                                id="title" 
                                                value={values.title} 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                                placeholder="New Title"
                                                onChange={(e)=>{setValues({...values,title:e.target.value})}}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                                                <input 
                                                type="text" 
                                                name="tag" 
                                                id="brand" 
                                                value={values.tag} 
                                                onChange={(e)=>{setValues({...values,tag:e.target.value})}}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                                placeholder="New Tag" 
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <textarea 
                                                id="description" 
                                                value={values.description} 
                                                rows="5" 
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                                placeholder="Write a description..." 
                                                onChange={(e)=>{setValues({...values,description:e.target.value})}}
                                                >  
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button 
                                            type="submit" 
                                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            onClick={handleClick}>
                                                Edit Note
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <Nav />
                        <div className='h-[88%] w-full fixed bottom-0 overflow-scroll md:w-[70.5%] md:right-0 lg:w-[77.9%] xl:w-[87.5%] md:h-[93%] ml-auto -z-10 '>
                            <div className='flex flex-col justify-evenly items-center w-[85%] text-black p-2 ml-auto mr-auto'>
                                {token && notes.length <=0 ? "Make some notes" : ""}
                                {token && notes.length > 0 &&
                                    notes.map((note, i) => {
                                        return <NoteItem key={i + 1} edit={editToggle} token={token} note={note} />
                                    })
                                }
                            </div>
                        </div>
        </>
    )
}

export default Notes
