// import React from 'react'
import './AdminNavbar.css'
import Sidebar from '../Sidebar/Sidebar'

const AdminNavbar = (props) => {
    return (
        <div className='admin-nav-bar'>
            <div>
                <Sidebar />
            </div>
            <section className="w-full bg-gray-200">
                {props.children}
            </section>
        </div>
    )
}

export default AdminNavbar
