import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
    const location = useLocation();
    return (
        <nav className="block fixed h-11 top-[64px] w-full bg-gray-800 md:hidden">
            <div className="flex items-center">
                <div className="flex space-x-4 p-1">
                    <Link to="/home/addnote" className={`${location.pathname === '/home/addnote' || location.pathname === '/' ? ' text-white ' : 'text-gray-300'} hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Add Note</Link>
                    <Link to="/home/mynotes" className={`${location.pathname === '/home/mynotes' ? ' text-white ' : 'text-gray-300'} hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}>My Notes</Link>
                </div>
            </div>

        </nav>
    )
}

export default Nav



