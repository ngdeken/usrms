import React, { useState } from 'react';
import Sidebar from '../../Components/FellowSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const FellowEventEdit = ({ auth, event, hostels }) => {
    const { data, setData, post, errors, reset } = useForm({
        eventName: event.eventName,
        eventDate: event.eventDate,
        hostelID: event.hostelID,
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("fellow.events.update", event.id));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Edit Event {event.id}</h1>
                <a href="http://127.0.0.1:8000/fellow/events" className="view-report-link">View Events</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
                <label>
                    1. Event Name
                    <input type="text" name="eventName" value={event.eventName} onChange={(e) => setData("eventName", e.target.value)} />
                </label>
                <label>
                    2. Event Date
                    <input type="date" name="eventDate" value={event.eventDate} onChange={(e) => setData("eventDate", e.target.value)} />
                </label>
                <label>
                    3. Hostel Name
                        <select
                                name="hostelID"
                                value={event.hostelID}
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

export default FellowEventEdit;
