import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'


const Home = () => {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("email") === null) {
      nav("/login")
    }
    fetchAllUsers()
    document.title = "User | " + localStorage.getItem("name").toUpperCase();
  }, [])

  const fetchAllUsers = () => {
    axios.get("/api/list")
      .then((res) => {
        setUsers(res.data.data)
      });
  }

  const deleteAccount = () => {
    axios.delete(`/api/delete/${localStorage.getItem("email")}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data === true) {
            console.log("Deleted");
            localStorage.removeItem("email")
            localStorage.removeItem("name")
            nav("/login")
          }
        }

      });
  }

  const fetchByName = (e) => {
    if (e.target.value !== "") {
      axios.get(`/api/listbyname/${e.target.value}`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.data.status === true) {
              setUsers(res.data.data.user)
            }
            // setUsers(res.data.data)
          }
        });
    }
    else {
      fetchAllUsers()
    }
  }


  return (
    <div>
      <h1>Home | {localStorage.getItem('name')}</h1>
      <NavLink to="/logout" className="btn btn-primary m-2" >Logout</NavLink>
      <NavLink to="/update" className="btn btn-success m-2" >Update Account</NavLink>
      <button className='btn btn-danger m-2' onClick={deleteAccount} >Delete Account</button>
      <br />
      <input type="text" className='m-2' placeholder='Search By Name' onChange={(e) => fetchByName(e)} />

      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => <tr key={user.email} >
              <td> {user.username} </td>
              <td> {user.email} </td>
              <td> {user.age} </td>
            </tr>)
          }
        </tbody>
      </table>

    </div>
  )
}

export default Home
