import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {

    const nav = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        age: 0
    })

    const registerUser = () => {
        axios.post("/api/register", data)
            .then((res) => {
                if (res.data.data === true) {
                    console.log("User Registered... Now Login");
                    nav("/login");
                }
            });
    }

    return (
        <div>
            <h1>Register Account</h1>
            <br />
            <input type="text" placeholder="UserName" onChange={(e) => setData({ ...data, username: e.target.value })} /><br />
            <input type="text" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} /><br />
            <input type="text" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} /><br />
            <input type="text" placeholder="Age" onChange={(e) => setData({ ...data, age: e.target.value })} /><br />
            <button onClick={registerUser} >Register</button> <br />
            ALready Account ? <NavLink to="/login" >Login</NavLink>

        </div>
    )
}

export default Register
