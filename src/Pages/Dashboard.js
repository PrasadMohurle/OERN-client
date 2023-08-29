import React, {useState} from 'react';
import DashboardLeft from '../Components/DashboardLeft';
import DashboardRight from '../Components/DashboardRight';
import Visualisation from './Visualisation';
import Scheduler from './Scheduler';
import MasterData from './MasterData'
import ModifyData from './ModifyData'

import './Dashboard.css';

const Dashboard = ({ setAuth }) => {
    const [currentPage, setCurrentPage] = useState('Visualisation'); // Initial page is 'visualisation'

    // Function to handle link clicks and update the current page
    const handleLinkClick = (page) => {
        setCurrentPage(page);
    };

    // Render the content based on the current page
    const renderContent = () => {
        switch (currentPage) {
            case 'Visualisation':
                return <Visualisation />;
            case 'Schedule':
                return <Scheduler />;
            case 'Master Data':
                return <MasterData />;
            case 'Modify Data':
                return <ModifyData />;
            default:
                return <Visualisation />;
        }
    };
    return (
        <>
            <div className="dashboard-container">
                <DashboardLeft setAuth={setAuth} onLinkClick={handleLinkClick}></DashboardLeft>
                <DashboardRight>{renderContent()}</DashboardRight>
            </div>
        </>
    );
};

export default Dashboard;
