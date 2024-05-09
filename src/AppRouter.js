import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard.js'; 
import Form from './components/Form/Form.js';
import Header from './components/Header/Header.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';
import { initialState } from "./initalState.js";
import { useState } from "react";


function AppRouter() {
    const [user, setUser] = useState(initialState.user);
    const [form, setForm] = useState(initialState.form);
  
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <Header />
              <Dashboard form={form} setForm={setForm} user={user} />
            </ProtectedRoute>
          } />
          <Route path="/form/:id" element={
            <ProtectedRoute user={user}>
              <Form form={form} setForm={setForm} />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;