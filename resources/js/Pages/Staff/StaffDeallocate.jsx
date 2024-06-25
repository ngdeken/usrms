import React, { useState, useEffect } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import Sidebar from '../../Components/StaffSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const ApplianceRegistration = ({auth, blocks, hostels, room, students}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        roomID: room.id,
        blockID: room.blockID,
        studentID: '',
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.rooms.deallocateStudent", { room: room.id }));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="appliance-form-container">
                <header className="appliance-form-header">
                    <h1>Allocate Block {room.blockID.blockName} Room {room.roomID}</h1>
                    <a href="http://127.0.0.1:8000/staff/rooms" className="view-report-link">View Rooms</a>
                </header>
                <form onSubmit={handleSubmit}>
                    <label>
                        1. Block ID
                        <div>{room.blockID.blockName}</div>
                    </label>
                    <div className="mt-4">
                        <label>
                            2. Room ID
                            <div>{room.roomID}</div>
                        </label>
                    </div>
                    <div className="mt-4">
                        <label>
                            3. Vacancy
                            <div>{room.vacancy}</div>
                        </label>
                    </div>
                    <div className="mt-4">
                        <label>
                        4. Student to Deallocate
                            <div>
                                <select name="studentID" value={data.studentID} onChange={(e) => setData("studentID", e.target.value)}>
                                    <option value="">Select Student</option>
                                    {students.filter(student => student.roomID === room.id).map(student => (
                                        <option key={student.id} value={student.id}>{student.user.name} {student.matricID}</option>
                                    ))}
                                </select>
                            </div>
                        </label>
                    </div>
                    <button type="submit" className="submit-button" disabled={processing}>
                        Submit
                    </button>
                </form>
                {errors.studentID && <div className="error">{errors.studentID}</div>}
                {errors.roomID && <div className="error">{errors.roomID}</div>}

                
            </div>
        </div>
        
    );
};

export default ApplianceRegistration;
