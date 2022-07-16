import axios from 'axios';
import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
const AgentDashboard = () => {

  const { dispatch } = useContext(userContext);

  const navigate = useNavigate();

  const logout = () => {
    const logout_ = async () => {
      const { data } = await axios.post('/agentLogout');
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
            <h3 className="text-black-50">RealEstate</h3>
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
                  <Link className="nav-link text-black-50 " to="/agentDashboard/agentProfile" >Profile</Link>
                </li>
                <li className="nav-item mt-3">
                  <Link className="nav-link text-black-50" to="/agentDashboard/agentProperties" >Properties</Link>
                </li>
                <li className="nav-item mt-3">
                  <Link className="nav-link text-black-50" to="/agentDashboard/addProperty">Add Properties</Link>
                </li>
                <li className="nav-item mt-3">
                  <Link className="nav-link text-black-50" to="/agentDashboard/bookedProperites"> Booked Properties</Link>
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

export default AgentDashboard;