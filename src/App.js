import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setAuth = (booleanValue) => {
        setIsAuthenticated(booleanValue);
    };
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                    exact
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <Login setAuth={setAuth} />
                        ) : (
                            <Navigate to="/dashboard" />
                        )
                    }
                />
                <Route
                    exact
                    path="/register"
                    element={
                        !isAuthenticated ? (
                            <Register setAuth={setAuth} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Dashboard setAuth={setAuth} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
