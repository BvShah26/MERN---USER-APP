import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const nav = useNavigate();

    useEffect(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        console.log("local store removed");
        nav("/login");
    }, [])
    return (
        <div>
        </div>
    )
}

export default Logout
