import React, { useState } from 'react';
import SalesChart from './charts/SalesChart';

const Dashboard = () => {
    const [salesData, setSalesData] = useState(null);
    const [fileLabel, setFileLabel] = useState('Upload File');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileLabel(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setSalesData(data);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    const handleRemoveFile = () => {
        setSalesData(null);
        setFileLabel('Upload File');
        // Reset the value of the file input
        document.getElementById('file-upload').value = '';
    };

    return (
        <div>
            <h1>Sales Dashboard</h1>
            <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                accept=".json"
            />
            <label htmlFor="file-upload" className="btn" style={{ backgroundColor: 'green', color: 'white', marginRight: '20px' }}>
                <i className="fa fa-upload"></i> {fileLabel}
            </label>
            <button onClick={handleRemoveFile} className="btn" style={{ backgroundColor: 'red', color: 'white' }}>
                <i className="fa fa-remove"></i> Remove File
            </button>
            {salesData && <SalesChart data={salesData} />}
        </div>
    );
};

export default Dashboard;
