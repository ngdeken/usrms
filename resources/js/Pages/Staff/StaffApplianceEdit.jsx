import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Sidebar from '../../Components/StaffSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const ApplianceRegistration = ({auth, order}) => {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        userID: order.userID,
        block: order.block,
        room: order.room,
        status: order.status || "",
        _method: "PUT",
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.appliance.update", order.id));
    };

    return (
        <div className="app-container">
                <Sidebar user={auth.user}/>
            <div className="appliance-form-container">
                <header className="appliance-form-header">
                    <h1>Update Appliance Registration {order.id}</h1>
                    <a href={route("staff.appliance")} className="view-report-link">View Appliance Registration</a>
                </header>
                <form onSubmit={handleSubmit}>
                <label>
                    1. Block
                    <input type="text" name="block" value={data.block || ''} onChange={(e) => setData("block", e.target.value)} />
                </label>
                <label>
                    2. Room Number
                    <input type="text" name="room" value={data.room || ''} onChange={(e) => setData("room", e.target.value)} />
                </label>
                <div className="mt-4">
                    <label>
                    3. Manage status
                    <select name="status" onChange={(e) => setData("status", e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
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
