import React, { useState, useEffect } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import Sidebar from '../../Components/StaffSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const ApplianceRegistration = ({auth, blocks, hostels, room}) => {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        roomID: room.roomID,
        blockID: room.blockID,
        floor: room.floor,
        roomType: room.roomType,
        vacancy: room.vacancy,
        _method: "PUT",
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.rooms.update", room.id));
    };

    return (
        <div className="app-container">
                <Sidebar user={auth.user}/>
            <div className="appliance-form-container">
                <header className="appliance-form-header">
                    <h1>Update Block {room.blockID.blockName} Room {room.roomID}</h1>
                    <a href="http://127.0.0.1:8000/staff/rooms" className="view-report-link">View Rooms</a>
                </header>
                <form onSubmit={handleSubmit}>
                <label>
                    1. Block ID
                    <select
                            name="blockID"
                            value={data.blockID.blockName}
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
                <div className="mt-4">
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
                 </div>
                    <button type="submit" className="submit-button" disabled={processing}>
                        Submit
                    </button>
                </form>
                {errors.quantities && <div className="error">{errors.quantities}</div>}
            </div>
        </div>
    );
};

export default ApplianceRegistration;
