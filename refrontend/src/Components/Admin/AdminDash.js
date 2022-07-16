import axios from 'axios';
import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

const AdminDas = () => {

  const { dispatch } = useContext(userContext);

  const navigate = useNavigate();

  const logout = () => {
    const logout_ = async () => {
      const { data } = await axios.get('/adminLogout');
      if (data) {
        dispatch({
          type: 'AGENT', agentPayload: {
            isLogin: false,
            type: "",
            id: "",
            name: "",
            email: ""
          }
        });
        navigate('/')
      }
    }

    logout_()
  }

  return (
    <div className='container-div'>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg   ">
          <div className="container-fluid">
            <h4 className="text-black-50">RealEstate <span className=' text-primary fw-light h6'>Admin</span> </h4> 
            <ul className="navbar-nav text-center mb-2 ">
              <li className="nav-item">
                <button className="btn btn-outline-danger " onClick={logout}>logout</button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-12 col-lg-2 col-sm-12 ">
            <div className='mt-2 sticky-top fixed-top '>

              <ul className="nav flex-column mt-2  ">
                <li className="nav-item mt-3">
                  <Link className="nav-link text-black-50 " to="/adminDash/adminProfile" >Profile</Link>
                </li>
                <li className="nav-item mt-3">
                  <Link className="nav-link text-black-50" to="/adminDash/admProperties" >Properties</Link>
                </li>
                <li className="nav-item mt-3">
                  <Link className="nav-link text-black-50" to="/adminDash/admAgents">Agents</Link>
                </li>
                <li className="nav-item mt-3">
                  <Link className="nav-link text-black-50" to="/adminDash/admUsers">Users</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12 col-lg-10 col-sm-12 ">
            <div className=' row-cols-1 '>
              <Outlet />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminDas