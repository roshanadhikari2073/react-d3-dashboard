import React from 'react';

import salesData from '../data/salesData.json';
import SalesChart from './charts/SalesChart';

const Dashboard = () => {
    return (
        <div>
            <h1>Sales Dashboard</h1>
            <SalesChart data={salesData} />
        </div>
    );
};

export default Dashboard;
