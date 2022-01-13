import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'

const Update = () => {

    const nav = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        age: ""
    });

    useEffect(() => {
        axios.get(`api/list/${localStorage.getItem("email")}`)
            .then((res) => {
                if (res.status === 200)
                    setData(res.data.data[0]);
                else
                    console.log("Not Success");
            });
    }, [])

    const updateRecord = () => {
        axios.put(`/api/update/${localStorage.getItem("email")}`, data)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.data === true) {
                        console.log("Data Updated");
                        localStorage.setItem("name", data.username);
                        nav("/");
                    }

                }
            })
    }

    console.log(data);

    return (
        <div>
            <h1>Update Account Details</h1>
            <br />
            <input type="text" placeholder="UserName" defaultValue={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} /><br />
            <input type="text" placeholder="Email" disabled defaultValue={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /><br />
            <input type="text" placeholder="Password" defaultValue={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} /><br />
            <input type="text" placeholder="Age" defaultValue={data.age.toString()} onChange={(e) => setData({ ...data, age: Number(e.target.value) })} /><br />
            <button onClick={updateRecord} className='btn btn-success' >Update</button> <br />
            <NavLink to="/" >Back to Home</NavLink>
        </div>
    )
}

export default Update
