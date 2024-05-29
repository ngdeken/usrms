import React, { useState } from 'react';
import Sidebar from '../Components/StudentSidebar';
import axios from 'axios';
import '../../css/StudentReport.css'; // Assuming you have CSS for styling

const StudentReport = () => {
    const [formData, setFormData] = useState({
        studentID: '',
        blockName: '',
        floor: '',
        roomID: '',
        reportStatus: '',
        reportDescription: '',
        reportCategory: '',
        description: '',
        agree: false,
        reportImage: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            reportImage: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add your form submission logic here
        const form = new FormData();
        Object.keys(formData).forEach(key => {
            form.append(key, formData[key]);
        });
        post(route('student.report.submit'), form);
    };

    return (
        <div className="app-container">
            <Sidebar />
        <div className="damage-report-form-container">
            <header className="form-header">
                <h1>Make Damage Report</h1>
                <a href="#" className="view-report-link">View Damage Report</a>
            </header>
            <form className="damage-report-form" onSubmit={handleSubmit}>
                <label>
                    1. Building or damage location
                    <input type="text" name="location" value={formData.blockName} onChange={handleChange} />
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
                                    checked={formData.floor === floor}
                                    onChange={handleChange}
                                />
                                {floor}
                            </label>
                        ))}
                    </div>
                </label>
                <label>
                    3. Room Number/ Toilet Number
                    <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} />
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
                                    checked={formData.damageCategory === category}
                                    onChange={handleChange}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </label>
                <label>
                    5. Description
                    <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                </label>
                <label>
                    6. Damage photos
                    <input type="file" onChange={handleFileChange} />
                </label>
                <label>
                    7. I Certify That The Above Statements Are True and Promise To Comply With The Safety Instructions As Above.
                    <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default StudentReport;
