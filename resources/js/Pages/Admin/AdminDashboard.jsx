import React from 'react';
import Sidebar from '../../Components/AdminSidebar';
import '../../../css/StaffHome.css'; 

const HomePage = ({auth}) => {
    const statusCards = [
        { title: 'User', status: '4', color: '#d4b06a' },
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

