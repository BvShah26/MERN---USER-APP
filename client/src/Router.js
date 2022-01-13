import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Router/Home'
import Login from './Router/login'
import Logout from './Router/Logout'
import Register from './Router/Register'
import Update from './Router/update'

const Routers = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/update" element={<Update />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Router>

        </div>
    )
}

export default Routers
