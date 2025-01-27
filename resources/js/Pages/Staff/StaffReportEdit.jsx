import React, { useState } from 'react';
import Sidebar from '../../Components/StaffSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";

const StaffReport = ({ auth, report }) => {
    const { data, setData, post, errors, reset } = useForm({
        userID: report.userID,
        blockName: report.blockName,
        floor: report.floor,
        roomID: report.roomID,
        reportStatus: report.reportStatus || "",
        reportDescription: report.reportDescription,
        reportCategory: report.reportCategory,
        agree: report.agree,
        reportImage: report.reportImage,
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("staff.report.update", report.id));
    };

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Update Damage Report {report.id}</h1>
                <a href="http://127.0.0.1:8000/staff/report/" className="view-report-link">View Damage Report</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
                <label>
                    1. Building or damage location
                    <input type="text" name="blockName" value={data.blockName} onChange={(e) => setData("blockName", e.target.value)} />
                </label>
                <label>
                    2. Floor
                    <div className="radio-group">
                        {['Floor G', 'Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'].map((floor) => (
                            <label key={floor}>
                                <input
                                    type="radio"
                                    name="floor"
                                    value={floor}
                                    checked={data.floor === floor}
                                    onChange={(e) => setData("floor", e.target.value)}
                                />
                                {floor}
                            </label>
                        ))}
                    </div>
                </label>
                <label>
                    3. Room Number/ Toilet Number
                    <input type="text" name="roomID" value={data.roomID} onChange={(e) => setData("roomID", e.target.value)} />
                </label>
                <label>
                    4. Damage category
                    <div className="radio-group">
                        {['Civil Damage', 'Electrical Damage', 'Furniture Damage'].map((category) => (
                            <label key={category}>
                                <input
                                    type="radio"
                                    name="reportCategory"
                                    value={category}
                                    checked={data.reportCategory === category}
                                    onChange={(e) => setData("reportCategory", e.target.value)}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </label>
                <label>
                    5. Description
                    <textarea name="reportDescription" value={data.reportDescription} onChange={(e) => setData("reportDescription", e.target.value)}></textarea>
                </label>
                <label>
                    6. Damage photos
                    {report.reportImage && (
                <div className="mb-4">
                  <img src={report.reportImage} className="w-64" />
                  <input type="file" name="reportImage" onChange={(e) => setData("reportImage", e.target.files[0])} />
                </div>
              )}
                </label>    
                <label>
                    7. I Certify That The Above Statements Are True and Promise To Comply With The Safety Instructions As Above.
                    <input
                        type="checkbox"
                        name="agree"
                        checked={data.agree}
                        onChange={(e) => setData("agree", e.target.checked)}
                    />
                </label>
                <div className="mt-4">
                    <label>
                    8. Manage status
                    <select name="reportStatus" onChange={(e) => setData("reportStatus", e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    </label>
                 </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default StaffReport;
