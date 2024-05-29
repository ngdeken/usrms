// Sidebar.jsx
import React from 'react';
import '../../css/Sidebar.css';
import { Link } from '@inertiajs/react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>USRMS</h1>
                <p>UTM Student Residency Management System</p>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><a href="http://127.0.0.1:8000/student/dashboard">Home</a></li>
                    <li><a href="http://127.0.0.1:8000/student/report">Damage Report</a></li>
                    <li><a href="#">Appliances Registration</a></li>
                    <li><a href="#">Room Allocation</a></li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <Link href={route('logout')} method="post" as="button">Logout</Link>
                <p>Student</p>
                <p>KTDI M22 217</p>
                <p>Ng De Ken</p>
            </div>
        </div>
    );
};

export default Sidebar;
