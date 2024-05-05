import React,{useContext} from 'react';
import NoteContext from '../context/notes/noteContext.js';
//import NoteState from '../context/notes/NoteState';
//import NoteState from '../context/notes/NoteState';

const About = () => {
  const data = useContext(NoteContext);
  return (
    <div>
      About {data.name}
    </div> 
  )
}

export default About
