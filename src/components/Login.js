import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/assets/logo.png';
import NoteContext from '../context/notes/noteContext.js';

const Login = () => {
    const {url} = useContext(NoteContext);
    const navigate = useNavigate();
    const [creds,setCreds] = useState({email:"", password:""})
    const handleLogin = async (e) =>{
        //console.log(creds)
        e.preventDefault();
        const response = await fetch(`${url}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email: creds.email ,password:creds.password})
        });
        setCreds({email:"", password:""})
        const json = await response.json();
        console.log(json)
        if (json) {
            localStorage.setItem("authtoken",json.token);
            navigate('/home/addnote');
        }
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-[250px] w-auto" src={logo} alt="Your Company" />
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" 
                                value={creds.email} 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                onChange={(e) =>{setCreds({...creds,email:e.target.value})}}/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" 
                                value={creds.password} 
                                name="password" 
                                type="password" 
                                autoComplete="current-password" 
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                onChange={(e) =>{setCreds({...creds,password:e.target.value})}}/>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
