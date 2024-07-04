import React, { useState } from 'react';
import Sidebar from '../../Components/FellowSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const FellowActiveCreate = ({ auth, events, students }) => {
    const { data, setData, post, errors, reset } = useForm({
        studentID: '',
        position: '',
        merit: '',
        eventID: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("fellow.actives.store"));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Add Participation</h1>
                    <a href="http://127.0.0.1:8000/fellow/actives" className="view-report-link">View Events</a>
                </header>
                <form className="damage-report-form" onSubmit={handleSubmit}>
                    <label>
                        1. Event Name
                        <div>
                            <select
                                name="eventID"
                                value={data.eventID}
                                onChange={(e) => setData("eventID", e.target.value)}
                            >
                                <option value="">Select Event</option>
                                {events.map((event) => (
                                    <option key={event.id} value={event.id}>
                                        {event.eventName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <label>
                        2. Student Name
                        <div>
                            <select name="studentID" value={data.studentID} onChange={(e) => setData("studentID", e.target.value)}>
                                <option value="">Select Student</option>
                                {students.map(student => (
                                    <option key={student.id} value={student.id}>{student.user.name} {student.matricID}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <label>
                        3. Position
                        <input type="text" name="position" value={data.position} onChange={(e) => setData("position", e.target.value)} />
                    </label>
                    <label>
                        4. Merit
                        <input type="number" name="merit" value={data.merit} onChange={(e) => setData("merit", e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FellowActiveCreate;
