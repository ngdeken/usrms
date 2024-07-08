import React, { useState } from 'react';
import Sidebar from '../../Components/StudentSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';

const StudentQuota = ({ auth }) => {
    const { data, setData, post, errors, reset } = useForm({
        userID: '',
        active: 'pending', //Pending //Active //Inactive
        event: '',
        firstRoomType: '',
        firstRoomBlock: '',
        firstRoomID: '',
        secondRoomType: '',
        secondRoomBlock: '',
        secondRoomID: '',
        thirdRoomType: '',
        thirdRoomBlock: '',
        thirdRoomID: '',
        roommate: '',
        roommateMatric: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("student.quota.store"));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Apply Active Quota</h1>
                <a href={route("student.quota.show")} className="view-report-link">View Active Quota Application</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
                <label>
                    1. First Room Type
                    <input type="text" name="firstRoomType" value={data.firstRoomType} onChange={(e) => setData("firstRoomType", e.target.value)} />
                     First Room Block
                    <input type="text" name="firstRoomBlock" value={data.firstRoomBlock} onChange={(e) => setData("firstRoomBlock", e.target.value)} />
                    First Room ID
                    <input type="text" name="firstRoomID" value={data.firstRoomID} onChange={(e) => setData("firstRoomID", e.target.value)} />
                </label>
                <label>
                    <div>
                    2. Second Room Type
                    <input type="text" name="secondRoomType" value={data.secondRoomType} onChange={(e) => setData("secondRoomType", e.target.value)} />
                     Second Room Block
                    <input type="text" name="secondRoomBlock" value={data.secondRoomBlock} onChange={(e) => setData("secondRoomBlock", e.target.value)} />
                    Second Room ID
                    <input type="text" name="secondRoomID" value={data.secondRoomID} onChange={(e) => setData("secondRoomID", e.target.value)} />
                    </div>
                </label>
                <label>
                    <div>
                    3. Third Room Type
                    <input type="text" name="thirdRoomType" value={data.thirdRoomType} onChange={(e) => setData("thirdRoomType", e.target.value)} />
                     Third Room Block
                    <input type="text" name="thirdRoomBlock" value={data.thirdRoomBlock} onChange={(e) => setData("thirdRoomBlock", e.target.value)} />
                    Third Room ID
                    <input type="text" name="thirdRoomID" value={data.thirdRoomID} onChange={(e) => setData("thirdRoomID", e.target.value)} />
                    </div>
                </label>
                <label>
                    <div>
                    4. Enter Roommate Name
                    <input type="text" name="roommmate" value={data.roommate} onChange={(e) => setData("roommate", e.target.value)} />
                     Enter Roommate Matric Number
                    <input type="text" name="roommateMatric" value={data.roommateMatric} onChange={(e) => setData("roommateMatric", e.target.value)} />
                    </div>
                </label>
                <label>
                    5. Upload other activities not organized by JKM
                    <input type="file" name="event" onChange={(e) => setData("event", e.target.files[0])} />
                </label>
                
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default StudentQuota;
