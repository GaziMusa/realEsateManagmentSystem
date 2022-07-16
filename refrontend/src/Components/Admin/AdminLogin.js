import axios from 'axios';
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react';
import { userContext } from '../../App';
const AdminLogin = () => {

      // @set cre 
      const { state, dispatch } = useContext(userContext);

      const navigate = useNavigate();
  
      const [err, setErr] = useState('');
  
      const [data, setdata] = useState([{
          email: "",
          password: ""
      }]);
  
      const handleData = (e) => {
          const { name, value } = e.target;
          setdata(prev => ({ ...prev, [name]: value }))
      }
  
      const formHandle = (e) => {
          e.preventDefault();
          const login = async () => {
              const result = await axios.post('/adminLogin', {
                  email: data.email,
                  password: data.password
              })
              console.log(result.data)
              if (result.data) {
                  dispatch({
                      type: 'ADMIN', adminPayload: {
                          isLogin: true,
                          type: result.data.type,
                          id: result.data._id,
                          name: result.data.name,
                          email: result.data.email
                      }
                  });
                  navigate('/adminDash/adminProfile');
              } else {
                  setErr("email or password is incorrext");
              }
          }
  
          login()

      }
  
  return (
    <div className="container-div">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                    <div className="container">
                        <h3 className="navbar-brand ">RealEstate</h3>
                    </div>
                </nav>
                <div className="container justify-content-center w-100 h-75 mt-5">
                    <div className="row justify-content-center align-items-center ">
                        <div className='col-sm-12 col-md-6 col-lg-4 mt-5'>
                            <div className='shadow rounded bg-light p-4'>
                                <h2>
                                    Wellcome Again
                                </h2>
                                <form onSubmit={formHandle}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" name='email' value={data.email || ""} className="form-control" aria-describedby="emailHelp" onChange={handleData} required />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" name='password' className="form-label">Password</label>
                                        <input type="password" name="password" value={data.password || ""} className="form-control" onChange={handleData} autoComplete="off" required />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>

                                </form>
                                {err ? <small className=' text-danger fw-bold p-1 mt-5 ' >*{err}</small> : null}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
  )
}

export default AdminLogin