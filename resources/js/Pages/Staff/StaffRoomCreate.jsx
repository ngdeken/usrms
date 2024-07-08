import React, { useState } from 'react';
import Sidebar from '../../Components/StaffSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const StudentReport = ({ auth, hostels, blocks, rooms }) => {
    const { data, setData, post, errors, reset } = useForm({
        roomID: '',
        blockID: '',
        floor: '',
        roomType: '',
        vacancy: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.rooms.store"));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Add Room</h1>
                <a href={route("staff.rooms.index")} className="view-report-link">View Rooms</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
                <label>
                    1. Block ID
                    <select
                            name="blockID"
                            value={data.blockID}
                            onChange={(e) => setData("blockID", e.target.value)}
                        >
                            <option value="">Select Block</option>
                            {blocks.map((block) => (
                                <option key={block.id} value={block.id}>
                                    {block.blockName}
                                </option>
                            ))}
                        </select>
                </label>
                <label>
                    2. Room ID
                    <input type="text" name="roomID" value={data.roomID} onChange={(e) => setData("roomID", e.target.value)} />
                </label>
                <label>
                    3. Floor
                    <select
                            name="floor"
                            value={data.floor}
                            onChange={(e) => setData("floor", e.target.value)}
                        >
                            <option value="">Select Floor</option>
                            <option value="G">Ground</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                </label>
                <label>
                    4. Room Type
                    <select
                            name="roomType"
                            value={data.roomType}
                            onChange={(e) => setData("roomType", e.target.value)}
                        >
                            <option value="">Select Room Type</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                        </select>
                </label>
                <label>
                    5. Vacancy
                    <select
                            name="vacancy"
                            value={data.vacancy}
                            onChange={(e) => setData("vacancy", e.target.value)}
                        >
                            <option value="">Select Vacancy</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default StudentReport;
