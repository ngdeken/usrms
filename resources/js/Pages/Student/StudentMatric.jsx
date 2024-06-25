import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Sidebar from '../../Components/StudentSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentApplianceCreate.css';
import '../../../css/StudentReport.css';

const StudentMatric = ({auth, student, user}) => {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        studentID: student.id,
        matricID: student.matricID || '',
        _method: "PUT",
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('student.matric.update'));
    };

    return (
        <div className="app-container">
                <Sidebar user={auth.user}/>
            <div className="appliance-form-container">
                <header className="appliance-form-header">
                    <h1>Update Matric Number</h1>
                    
                </header>
                <form onSubmit={handleSubmit}>
                <label>
                    1. Update Matric Number
                    <input type="text" name="block" value={data.matricID || ''} onChange={(e) => setData("matricID", e.target.value)} />
                </label>
                    <button type="submit" className="submit-button" disabled={processing}>
                        Submit
                    </button>
                </form>
                {errors.matricID && <div className="error">{errors.matricID}</div>}
            </div>
        </div>
    );
};

export default StudentMatric;
