import React from 'react';
import Sidebar from '../../Components/FellowSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const FellowEventEdit = ({ auth, event, active, hostels }) => {
    const { data, setData, post, errors, reset } = useForm({
        eventID: active?.eventID ?? '',
        studentID: active?.studentID ?? '',
        position: active?.position ?? '',
        merit: active?.merit ?? '',
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("fellow.actives.update", { active: active.id }));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Edit Participation {active?.id}</h1>
                    <a href={route("fellow.events.index")} className="view-report-link">View Events</a>
                </header>
                <form className="damage-report-form" onSubmit={handleSubmit}>
                    <label>
                        1. Event Name
                        <div>{active?.eventID?.eventName ?? 'N/A'}</div>
                    </label>
                    <label>
                        2. Student Name
                        <div>{active?.studentID?.userID?.name ?? 'N/A'}</div>
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

export default FellowEventEdit;
