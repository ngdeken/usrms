import React, { useState } from 'react';
import Sidebar from '../../Components/FellowSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const FellowEventCreate = ({ auth, hostels }) => {
    const { data, setData, post, errors, reset } = useForm({
        eventName: '',
        eventDate: '',
        hostelID: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("fellow.events.store"));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Add Event</h1>
                <a href={route("fellow.events.index")} className="view-report-link">View Events</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
                <label>
                    1. Event Name
                    <input type="text" name="eventName" value={data.eventName} onChange={(e) => setData("eventName", e.target.value)} />
                </label>
                <label>
                    2. Event Date
                    <input type="date" name="eventDate" value={data.eventDate} onChange={(e) => setData("eventDate", e.target.value)} />
                </label>
                <label>
                    3. Hostel Name
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
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default FellowEventCreate;
