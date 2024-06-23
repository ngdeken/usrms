import React, { useState, useEffect } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import Sidebar from '../../Components/StaffSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const ApplianceRegistration = ({auth, block, hostels}) => {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        hostelID: block.hostelID,
        blockName: block.blockName,
        gender: block.gender,
        _method: "PUT",
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.blocks.update", block.id));
    };

    return (
        <div className="app-container">
                <Sidebar user={auth.user}/>
            <div className="appliance-form-container">
                <header className="appliance-form-header">
                    <h1>Update Block {block.blockName}</h1>
                    <a href="http://127.0.0.1:8000/staff/hostels" className="view-report-link">View Hostels</a>
                </header>
                <form onSubmit={handleSubmit}>
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
                <div className="mt-4">
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
