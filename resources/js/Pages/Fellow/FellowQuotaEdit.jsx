import React, { useState } from 'react';
import Sidebar from '../../Components/FellowSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const FellowQuotaEdit = ({ auth, quota }) => {
    const { data, setData, post, errors, reset } = useForm({
        userID: quota.userID,
        active: quota.active || "" , //Pending //Active //Inactive
        event: quota.event,
        firstRoomType: quota.firstRoomType,
        firstRoomBlock: quota.firstRoomBlock,
        firstRoomID: quota.firstRoomID,
        secondRoomType: quota.secondRoomType,
        secondRoomBlock: quota.secondRoomBlock,
        secondRoomID: quota.secondRoomID,
        thirdRoomType: quota.thirdRoomType,
        thirdRoomBlock: quota.thirdRoomBlock,
        thirdRoomID: quota.thirdRoomID,
        roommate: quota.roommate,
        roommateMatric: quota.roommateMatric,
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("fellow.quota.update", quota.id));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">
                <header className="form-header">
                    <h1>Update Quota {quota.id}</h1>
                    <a href={route("fellow.quota")} className="view-report-link">View Active Quota Application</a>
                </header>
                <form className="damage-report-form" onSubmit={handleSubmit}>
                    <div>
                        1. First Room Type
                        <div>{quota.firstRoomType}</div>
                        First Room Block
                        <div>{quota.firstRoomBlock}</div>
                        First Room ID
                        <div>{quota.firstRoomID}</div>
                    </div>
                    <div>
                        <div>
                            2. Second Room Type
                            <div>{quota.secondRoomType}</div>
                            Second Room Block
                            <div>{quota.secondRoomBlock}</div>
                            Second Room ID
                            <div>{quota.secondRoomID}</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            3. Third Room Type
                            <div>{quota.thirdRoomType}</div>
                            Third Room Block
                            <div>{quota.thirdRoomBlock}</div>
                            Third Room ID
                            <div>{quota.thirdRoomID}</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            4. Enter Roommate Name
                            <div>{quota.roommate}</div>
                            Enter Roommate Matric Number
                            <div>{quota.roommateMatric}</div>
                        </div>
                    </div>
                    <label>
                        5. Upload other activities not organized by JKM
                        <div>{quota.event}</div>
                    </label>
                    <div className="mt-4">
                    <label>
                    6. Manage status
                    <select name="active" onChange={(e) => setData("active", e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                        <option value="active">Active</option>
                    </select>
                    </label>
                 </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FellowQuotaEdit;
