import React from 'react';
import Sidebar from '../../Components/StudentSidebar';
import '../../../css/StudentAppliance.css';
import '../../../css/StudentReport.css';

const AppliancesRegistration = ({auth}) => {
    const registrations = [
        {
            id: 1,
            dateTime: '5/4/2023 10:30 PM',
            location: 'M22, 217',
            appliances: '1 Electric kettle, 1 Phone charger, 1 Laptop',
            total: 'RM 10',
            status: 'In progress'
        }
    ];

    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="content">
                <header className="header">
                    <h1>View Appliances Registration</h1>
                    <div className="actions">
                    <a href="http://127.0.0.1:8000/student/appliance/create" className="view-report-link">Register Electrical Appliances</a>
                
                    </div>
                </header>
                <table className="registrations-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date/Time</th>
                            <th>Location</th>
                            <th>Appliances</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map(registration => (
                            <tr key={registration.id}>
                                <td>{registration.id}</td>
                                <td>{registration.dateTime}</td>
                                <td>{registration.location}</td>
                                <td>{registration.appliances}</td>
                                <td>{registration.total}</td>
                                <td className="status">{registration.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppliancesRegistration;
