import React, { useState } from 'react';
import Sidebar from '../../Components/StudentSidebar';
import { router, useForm } from '@inertiajs/react';
import '../../../css/StudentReport.css';
import '../../../css/StudentQuota.css';

const ActiveQuotaApplication = ({auth}) => {
    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="damage-report-form-container">    
            <header className="quota-header">
                <h1>Apply Active Quota</h1>
                <a href="#" className="view-quota-link">View Active Quota Application</a>
            </header>
            
            <form className="quota-form">
                <div className="form-section">
                    <label htmlFor="upload">You may upload other activities not organized by JKM</label>
                    <button id="upload" className="upload-button">UPLOAD</button>
                </div>
                <div className="form-section">
                    <label>You may choose your desired room:</label>
                    <div className="room-selection">
                        <div className="choice">
                            <p>1. First choice</p>
                            <select>
                                <option value="">Type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                            </select>
                            <input type="text" placeholder="Block" />
                            <input type="text" placeholder="Room" />
                        </div>
                        <div className="choice">
                            <p>2. Second choice</p>
                            <select>
                                <option value="">Type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                            </select>
                            <input type="text" placeholder="Block" />
                            <input type="text" placeholder="Room" />
                        </div>
                        <div className="choice">
                            <p>3. Third choice</p>
                            <select>
                                <option value="">Type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                            </select>
                            <input type="text" placeholder="Block" />
                            <input type="text" placeholder="Room" />
                        </div>
                    </div>
                </div>
                <div className="form-section">
                    <label>You may choose your roommate:</label>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Matric Number" />
                </div>
                
                <button type="submit" className="submit-button">Submit</button>
                
            </form>
            </div>
        </div>
        
    );
};

export default ActiveQuotaApplication;
