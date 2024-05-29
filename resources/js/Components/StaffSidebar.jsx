// Sidebar.jsx
import React from 'react';
import '../../css/Sidebar.css'; // Assuming you have CSS for styling

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>USRMS</h1>
                <p>UTM Student Residency Management System</p>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Damage Report</a></li>
                    <li><a href="#">Appliances Registration</a></li>
                    <li><a href="#">Room Allocation</a></li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <button>Logout</button>
                <p>Student</p>
                <p>KTDI M22 217</p>
                <p>Ng De Ken</p>
            </div>
        </div>
    );
};

export default Sidebar;
