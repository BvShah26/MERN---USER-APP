import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom'

const Home = () => {

    const nav = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const validateLogin = () => {
        axios.post("/api/login", loginData).then((res) => {
            if (res.status === 200) {
                if (res.data.data.isLogged === true) {
                    console.log(res.data.data.user[0]);
                    localStorage.setItem("name", res.data.data.user[0].username)
                    localStorage.setItem("email", res.data.data.user[0].email);
                    nav("/");
                }
                else {
                    console.log("Not a valid credentials");
                }
            }

        });
    }


    return (
        <div>
            <div>
                <h1>Login Page</h1>

                Email :
                <input type="text" placeholder='Email' onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} /><br />

                Password :
                <input type="text" placeholder='Password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                <br />

                <button onClick={() => validateLogin()} >Login</button>


                <NavLink to="/register" >Create New Account</NavLink>

            </div>
        </div>
    )
}

export default Home
