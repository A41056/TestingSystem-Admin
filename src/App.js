import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminHome from './AdminHome';
import AdminLogin from './AdminLogin';
import AdminUserManager from './AdminUserManager';
import AdminUserCreate from './AdminUserCreate';
import AdminUserEdit from './AdminUserEdit';
import AdminExamCreate from './AdminExamCreate';
import AdminExamManager from './AdminExamManager';
import AdminExamEdit from './AdminExamEdit';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if there is a stored authentication token and username in localStorage
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (storedToken && storedUsername) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        }
    }, []);

    const handleLoginSuccess = (username, token) => {
        setIsAuthenticated(true);
        setUsername(username);
        // Store the authentication token and username in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername('');
        // Clear the authentication token and username from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return (
        <Router>
            <div className="site-wrap">
                <Routes>
                    <Route
                        path="*"
                        element={isAuthenticated ? <AuthenticatedRoutes username={username} onLogout={handleLogout} /> : <Navigate to='/admin-login' />}
                    />
                    <Route
                        path="/admin-login"
                        element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

function AuthenticatedRoutes({ username, onLogout }) {
    return (
        <>
            <AdminHeader />
            <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="/admin-users" element={<AdminUserManager />} />
                <Route path="/admin-create-user" element={<AdminUserCreate />} />
                <Route path="/admin-edit-user/:userId" element={<AdminUserEdit />} />

                <Route path="/admin-exams" element={<AdminExamManager />} />
                <Route path="/admin-create-exam" element={<AdminExamCreate />} />
                <Route path="/admin-edit-exam/:examId" element={<AdminExamEdit />} />
            </Routes>
        </>
    );
}


export default App;
