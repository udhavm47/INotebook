import React, { useContext, useEffect } from 'react'
import AddNotes from './AddNotes.js';
import Login from './Login.js';
import Sidebar from './Sidebar.js';
import NoteContext from '../context/notes/noteContext.js';

const Home = () => {
  const {getAllNotes,notes} = useContext(NoteContext)
  const token = localStorage.getItem('authtoken');
  

  useEffect(() => {
    getAllNotes(token)
  }, [])
  

  return (
    <>
       <AddNotes />
    </>

  )
}

export default Home
