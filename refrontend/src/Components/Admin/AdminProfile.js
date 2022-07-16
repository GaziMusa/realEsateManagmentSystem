import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import AdminProfUp from './AdminProfUp';


const AdminProfile = () => {

  // @set admin info
  const [admin, setAdmin] = useState({
    id:"",
    name: "",
    email: "",
    password: ""
  });

  // @get number of props
  const [noProps, setNoProps] = useState(0);

  // @get number of agents
  const [noAgents, setNoAgents] = useState(0);

  // @get number of users
  const [noUsers, setNoUsers] = useState(0);


  useEffect(() => {

    const getAdmin = async () => {
      try {
        // @get admin api
        const result = await axios.get('/getAdmin');
        setAdmin({ id:result.data[0]._id , name: result.data[0].name, email: result.data[0].email, password: result.data[0].password });

        // @get no of props
        const prop = await axios.get('/getNoprops');
        setNoProps(prop.data)

        // @get no of agents
        const agents = await axios.get('/getNoagents');
        setNoAgents(agents.data)

        // @get no of users
        const users = await axios.get('/getNousers');
        setNoUsers(users.data)

      } catch (error) {

      }
    }
    getAdmin();
  },[]);

  return (
    <div className='container'>
      <div className="row">
        <div className='col-sm-12 col-md-6 col-lg-4'>
          <div className="shadow p-3 rounded">
            <h4>Your Profile</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="name" className="form-control" value={admin.name || ""} readOnly />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" value={admin.email || ""} readOnly />
            </div>
            <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#profileUpdate">Update</button>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-8">
          <div className="row gy-3 mt-1">
            <div className="col-sm-12 col-md-12 col-lg-4 ">
              <div className="card shadow border-primary">
                <div className="card-body">
                  <h3 className="card-title  text-primary ">Properties</h3>
                  <h1 className=" text-primary" >{noProps}</h1>
                  <Link to="/adminDash/admProperties" className="btn btn-sm btn-outline-primary">View All</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <div className="card shadow border-primary">
                <div className="card-body">
                  <h3 className="card-title  text-primary">Users</h3>
                  <h1 className=" text-primary" >{noUsers}</h1>
                  <Link to="/adminDash/admUsers" className="btn btn-sm btn-outline-primary">View All</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <div className="card shadow border-primary ">
                <div className="card-body">
                  <h3 className="card-title  text-primary">Agents</h3>
                  <h1 className=" text-primary" >{noAgents}</h1>
                  <Link to="/adminDash/admAgents" className="btn btn-sm btn-outline-primary">View All</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminProfUp data={admin} />
    </div>
  )
}

export default AdminProfile