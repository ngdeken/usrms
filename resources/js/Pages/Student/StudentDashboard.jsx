import React from 'react';
import Sidebar from '../../Components/StudentSidebar';
import '../../../css/StaffHome.css'; // Assuming you have CSS for styling

const HomePage = ({auth, user}) => {
    const statusCards = [
        { title: 'Appliances registration', status: 'In progress', color: '#d4b06a' },
        { title: 'Damage Report', status: 'In progress', color: '#2f4550' },
        { title: 'Active quota application', status: 'Pending', color: '#243d72' }
    ];

    return (
        
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="content">
                <header className="header">
                    <h1>Welcome back, {auth.user.name}!</h1>
                </header>
                <div className="status-cards">
                    {statusCards.map((card, index) => (
                        <div key={index} className="status-card" style={{ borderColor: card.color }}>
                            <h2>{card.title}</h2>
                            <p>{card.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
