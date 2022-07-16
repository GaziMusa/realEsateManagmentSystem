import axios from 'axios';
import React, { useState, useEffect } from 'react'

const AdminProfUp = (props) => {
  const admin = props.data;

  const [data, setData] = useState([{
    id: '',
    name: '',
    email: '',
    password: '',
  }])

  useEffect(() => {
    setData({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: admin.password
    })

  }, [admin]);

  const handleData = (e) => {
    const { name, value } = e.target;
    // --
    setData(pre => ({ ...pre, [name]: value }))
  }

  const submit = (e) => {
    e.preventDefault();

    const user = {
      name: data.name,
      email: data.email,
      password: data.password
    }

    // @Now make a put request in axios we can also make a await function
    axios.put(`/adminupdateProfile/${data.id}`, user)
      .then(res => {
        console.log(res.data);
      }).catch(error => {
        console.log(error)
      })

    setData({
      name: '',
      email: '',
      password: ''
    })
    window.location.reload();
  }
  return (
    <>
      <div className="modal fade" id="profileUpdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Your Profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={submit} >
              <div className="modal-body">

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="name"
                    name="name"
                    className="form-control"
                    onChange={handleData}
                    value={data.name || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input
                    type="email"
                    name='email'
                    className="form-control"
                    onChange={handleData}
                    value={data.email || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">ChangePassword</label>
                  <input
                    type="text"
                    name='password'
                    className="form-control"
                    onChange={handleData}
                    value={data.password || ""}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type='submit' className="btn btn-dark" data-bs-dismiss="modal" >Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProfUp