import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Router/login'
import Login from './Router/login'
import Context from './Context/context'
import { useState } from 'react'

const Routers = () => {
    const [isLogged, setIsLogged] = useState();
    console.log("Router : ", isLogged);

    return (
        <div>
            <Context.Provider value={
                {
                    isLogged: isLogged,
                    setIsLogged: setIsLogged,
                }
            } >
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} ></Route>
                        <Route path="/home" element={<Home />} ></Route>
                    </Routes>
                </Router>
            </Context.Provider>
        </div>
    )
}

export default Routers
