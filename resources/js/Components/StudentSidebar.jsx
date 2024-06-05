// Sidebar.jsx
import React from 'react';
import '../../css/Sidebar.css';
import { Link } from '@inertiajs/react';

const Sidebar = ({auth, user}) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>USRMS</h1>
                <p>UTM Student Residency Management System</p>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><a href="http://127.0.0.1:8000/student/dashboard">Home</a></li>
                    <li><a href="http://127.0.0.1:8000/student/report/view">Damage Report</a></li>
                    <li><a href="http://127.0.0.1:8000/student/quota">Active Quota Application</a></li>
                    <li><a href="http://127.0.0.1:8000/student/appliance">Appliances Registration</a></li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <Link href={route('logout')} method="post" as="button">Logout</Link>
                <p>Student</p>
                <p>KTDI M22 217</p>
                <p>{user.name}</p>
            </div>
        </div>
    );
};

export default Sidebar;
