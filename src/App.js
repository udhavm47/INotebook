import './App.css';
import Home from './components/Home.js';
import About from './components/About.js';
import Navbar from './components/Navbar.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Groups from './components/Groups.js';
import {
  //createBrowserRouter,
  //RouterProvider,
  Route,
  //Link,
  //Router,
  Routes
} from "react-router-dom";
//import NoteContext, { NoteProvider } from './context/notes/noteContext';
import NoteState from './context/notes/NoteState.js';
import Alert from './components/Alert.js';
import AddNotes from './components/AddNotes.js';
import Notes from './components/Notes.js';
import Nav from './components/Nav.js';
import Sidebar from './components/Sidebar.js';

function App() {
  const token = localStorage.getItem("authtoken");
  return (
    <NoteState>
      <Navbar />
      <Alert/>
      <Routes>
        <Route exact path="/" element={token? <Home /> : <Login /> } />
        <Route exact path="about" element={<About />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
        <Route exact path="home/addnote" element={<AddNotes />} />
        <Route exact path="home/mynotes" element={<Notes />} />
        <Route exact path="home/mygroups" element={<Groups />} />
      </Routes>
    </NoteState>
  );
}

export default App;
