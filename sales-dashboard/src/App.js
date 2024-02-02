import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css'; // Assuming you have an App.css file for basic styling

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact>
                        <Dashboard />
                    </Route>
                    {/* Add more routes for other components or pages here */}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
