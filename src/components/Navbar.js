import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext.js';




const Navbar = () => {
    let [menu, setMenu] = useState(false);
    const [toggle,setToggle] = useState(false)
    const [name,setName] = useState("")
    const navigate = useNavigate();
    function dropDown() {
        if (menu) {
            setMenu(false);
        } else {
            setMenu(true);
        }
    }

    const location = useLocation()

    const {getUsername} = useContext(NoteContext);
    const userToken = localStorage.getItem('authtoken')
    const username = async () =>{
        const user = await getUsername(userToken);
        
        if(user.success === true){
            setName(user.json.name)
        }else{
            setName("")
        }   
    }
    const handleClick = ()=>{
        setToggle(!toggle);
    }
    useEffect(()=>{
        username();
    },[location])
    //console.log(userToken)

    const logout = () => {
        localStorage.removeItem('authtoken');
        navigate('/login')
        setName('')

    }
    
    

    return (
        <nav className="bg-gray-800 fixed w-full z-10">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        {/*<!-- Mobile menu button-->*/}
                        <button 
                            type="button" 
                            className=" relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
                            aria-controls="mobile-menu" 
                            aria-expanded="false"
                            onClick={handleClick}
                            >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            {/*<!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
  -->*/}
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            {/*<!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
  -->*/}
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {/*            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
*/}                             <Link to="/" className={`${location.pathname === '/' ? ' text-white ' : 'text-gray-300'} hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Home</Link>
                                <Link to="/about" className={`${location.pathname === '/about' ? ' text-white ' : 'text-gray-300'} hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}>About</Link>

                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/*<!-- Profile dropdown -->*/}
                        <div className="relative ml-3">
                            <div className='flex items-center'>
                                <span className='text-white p-1 mr-2 text-[18px]'>{name}</span>
                                <button type="button" className="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={dropDown}>
                                    <span className="absolute -inset-1.5"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                </button>
                                
                            </div>

                            {/*<!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"<Navbar />
              To: "transform opacity-0 scale-95"
  -->*/}
                            {menu && <div className="ddr block absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                {/*<!-- Active: "bg-gray-100", Not Active: "" -->*/}
                                <Link to="/signup" className={`${userToken ? "hidden":"block"} px-4 py-2 text-sm text-gray-700 hover:bg-slate-700 hover:text-white rounded-lg`} role="menuitem" tabIndex="-1" id="user-menu-item-0">Sign Up</Link>
                                <Link to="/login"  className={`${userToken ? "hidden":"block"} px-4 py-2 text-sm text-gray-700 hover:bg-slate-700 hover:text-white rounded-lg`} role="menuitem" tabIndex="-1" id="user-menu-item-1">Login</Link>
                                <Link to="/login" className={`${userToken ? "block":"hidden"} px-4 py-2 text-sm text-gray-700 hover:bg-slate-700 hover:text-white rounded-lg`} role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={logout}>Sign out</Link>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            {/*<!-- Mobile menu, show/hide based on menu state. -->*/}
            <div className="sm:hidden" id="mobile-menu">
                <div className={`${toggle?'block':'hidden'} block space-y-1 px-2 pb-3 pt-2 `}>
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->*/}
                    <Link to="/" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page" onClick={handleClick}>Home</Link>
                    <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" onClick={handleClick}>About</Link>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
