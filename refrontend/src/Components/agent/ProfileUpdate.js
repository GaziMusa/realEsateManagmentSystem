import axios from "axios";
import { useState, useEffect } from "react";

const ProfileUpdate = (props) => {

  const agent = props.data;

  const [data, setData] = useState([{
    id: '',
    fname: '',
    lname: '',
    email: '',
    cell: '',
    password: '',
  }])

  useEffect(() => {
    setData({
      id:agent._id,
      fname: agent.fname,
      lname: agent.lname,
      email: agent.email,
      cell: agent.phoneNumber,
      password: agent.password
    })

  }, [agent]);

  const handleData = (e) => {
    const { name, value } = e.target;
    // --
    setData(pre => ({ ...pre, [name]: value }))
  }

  const submit = (e) => {
    e.preventDefault();

    const user = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      phoneNumber: data.cell,
      password: data.password
    }

    // @Now make a put request in axios we can also make a await function
    axios.put(`/updateAgent/${data.id}`, user)
      .then(res => {
        console.log(res.data);
      }).catch(error => {
        console.log(error)
      })

    setData({
      fname: '',
      lname: '',
      email: '',
      cell: '',
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
                  <div className='row'>
                    <div className="col-sm-6">
                      <label htmlFor="fname" className="form-label">First Name</label>
                      <input type="fname"
                        name="fname"
                        className="form-control"
                        onChange={handleData}
                        value={data.fname || ""}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="lname" className="form-label">Last Name</label>
                      <input type="lname"
                        name="lname"
                        className="form-control"
                        onChange={handleData}
                        value={data.lname || ""}
                      />
                    </div>
                  </div>

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
                  <label htmlFor="exampleInputEmail1" className="form-label">Cell No</label>
                  <input type="text"
                    name='cell'
                    className="form-control"
                    onChange={handleData}
                    value={data.cell || ""}
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


export default ProfileUpdate