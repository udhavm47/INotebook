import React, { useContext } from 'react'
import logo from '../components/assets/logo.png'
import NoteContext from '../context/notes/noteContext.js'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { url } = useContext(NoteContext);
    const navigate = useNavigate()
    const [viewPassword, setViewPassword] = useState(false)
    const [user, setUser] = useState({ name: "", email: "", password: "" })
    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch(`${url}/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
        });
        setUser({ name: "", email: "", password: "" })
        const json = await response.json();
        console.log(json)
        if(json){
            navigate('login')
        }

    }
    useEffect(()=>{
        setViewPassword(false);
    },[])

    const passwordToggle = () =>{
        if (viewPassword) {
            setViewPassword(false)
        }
        if (!viewPassword) {
            setViewPassword(true)            
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-[250px] w-auto" src={logo} alt="Your Company" />
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register Here</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    value={user.name}
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => { setUser({ ...user, name: e.target.value }) }} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    value={user.email}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2 flex items-center justify-end">
                                <input
                                    id="password"
                                    value={user.password}
                                    name="password"
                                    type={!viewPassword ? "password" : "text"}
                                    autoComplete="current-password"
                                    required
                                    className="block relative w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute m-2 p-1 cursor-pointer" onClick={passwordToggle}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
