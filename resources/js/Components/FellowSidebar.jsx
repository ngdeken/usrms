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
                    <li><a href={route('fellow.index')}>Home</a></li>
                    <li><a href={route('fellow.quota')}>Manage Active Quota</a></li>
                    <li><a href={route('fellow.events.index')}>Manage Event</a></li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <Link href={route('logout')} method="post" as="button">Logout</Link>
                <p>Fellow</p>
                <p>{user.name}</p>
            </div>
        </div>
    );
};

export default Sidebar;
