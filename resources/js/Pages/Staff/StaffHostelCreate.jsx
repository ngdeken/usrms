import React, { useState } from 'react';
import Sidebar from '../../Components/StaffSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const StudentReport = ({ auth }) => {
    const { data, setData, post, errors, reset } = useForm({
        hostelName: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.hostels.store"));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Add Hostel</h1>
                <a href="http://127.0.0.1:8000/staff/hostels" className="view-report-link">View Hostels</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
                <label>
                    1. Hostel Name
                    <input type="text" name="hostelName" value={data.hostelName} onChange={(e) => setData("hostelName", e.target.value)} />
                </label>
                    
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default StudentReport;
