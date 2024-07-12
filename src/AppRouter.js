import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard.js'; 
import Form from './components/Form/Form.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';
import getUser from './api/api.js';
import { useEffect, useState } from "react";

function AppRouter() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState('');

    useEffect(() => {
      // Log all local storage contents
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          localStorage.removeItem('user');
        }
      }
    }, []);



    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/dashboard" element={
              <Dashboard form={form} setForm={setForm} user={user} setUser={setUser} />
          } />
          <Route path="/form/:id" element={
              <Form form={form} setForm={setForm} user={user} setUser={setUser}/>
          } />

          <Route path="/" element={
                <Navigate to="/login" replace />
          } />
        </Routes>
      </Router>
    );
}

export default AppRouter;
