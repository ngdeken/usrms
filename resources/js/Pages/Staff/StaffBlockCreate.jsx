import React, { useState } from 'react';
import Sidebar from '../../Components/StaffSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const StudentReport = ({ auth, hostels, block }) => {
    const { data, setData, post, errors, reset } = useForm({
        hostelName: '',
        blockName: '',
        gender: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.blocks.store"));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Add Block</h1>
                <a href={route("staff.hostels.index")} className="view-report-link">View Hostels</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
                <label>
                    1. Hostel Name
                    <select
                            name="hostelID"
                            value={data.hostelID}
                            onChange={(e) => setData("hostelID", e.target.value)}
                        >
                            <option value="">Select Hostel</option>
                            {hostels.map((hostel) => (
                                <option key={hostel.id} value={hostel.id}>
                                    {hostel.hostelName}
                                </option>
                            ))}
                        </select>
                </label>
                <label>
                    2. Block Name
                    <input type="text" name="blockName" value={data.blockName} onChange={(e) => setData("blockName", e.target.value)} />
                </label>
                <label>
                    3. Gender
                    <select
                            name="gender"
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default StudentReport;
