import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css'; // Assuming you have an App.css file for basic styling

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {/* Define more routes with the element prop */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
