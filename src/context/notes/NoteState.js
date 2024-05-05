import React, { useState } from "react";
import { redirectDocument, Navigate, useNavigate } from "react-router-dom";
import NoteContext from "./noteContext.js";

const NoteState = ({ children }) => {
    const url = "http://localhost:5000";
    const navigate = useNavigate();
    const initialNotes = []
    const [msg,setMsg] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)
    const [notes, setNotes] = useState(initialNotes)

    // checking wether th user is signed in or not
    const isUserLoggedin = async () => {
        localStorage.getItem("authtoken")
            ? setLoggedIn(true)
            : setLoggedIn(false)
    }

    // Getting th eusername of the current user
    const getUsername = async (token) => {
        const response = await fetch(`${url}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token

            }
        });
        const json = await response.json()
        if(json.name){
            setLoggedIn(true)
            return {"success":true, json,LoggedIn:loggedIn};
        }
        else{
            setLoggedIn(false)
            return {"success": false, json,LoggedIn:loggedIn}
        }
    }

    //getAllNotes
    const getAllNotes = async (token) => {
        const response = await fetch(`${url}/api/notes/allnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token

            }
        });
        const json = await response.json()
        if(json.error){
            console.log("here")
            setLoggedIn(false);
            
        }
        else{
            console.log(json);
            setNotes(json);
        }

    }

    // AddNote
    const addNote = async (title, description, tag, token) => {
        const response = await fetch(`${url}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        if(json._id){
            setMsg("Note added successfully")
        }
        else{
            setMsg(json.errors)
        }



        //console.log("adding note")
        const date = new Date().toString();
        const note = {
            "title": title,
            "description": description,
            "tag": tag,
            "timestamp": date,
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    //deleteNote
    const deleteNote = async (id, token) => {
        const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            
        });
        const json = await response.json()
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
        if(json){
            setMsg(json.success)
        }
        else{
            setMsg(json.error)
        }
    }
    /*editNote : 
        LOGIC:
        we will pass the following parameter or fields that can be changed except id and will over-write the existing value
    */
    const editNote = async (id, title, description, tag, token) => {
        const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.tag = tag;
                element.description = description;
                break;
            }

        }
        if(json._id){
            setMsg("Note edited successfully")
            return true;
        }
        else{
            setMsg(json.error)
        }

    }

    const status = loggedIn;
    console.log(status);
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNotes, url, msg , setMsg, getUsername, status }}>
            {children}
        </NoteContext.Provider>
    )
}
export default NoteState;