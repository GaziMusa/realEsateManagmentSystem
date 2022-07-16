import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

const UserLogin = () => {
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
            const result = await axios.post('/userLogin', {
                email: data.email,
                password: data.password
            })
            if (result.data) {
                dispatch({
                    type: 'AGENT', agentPayload: {
                        isLogin: true,
                        type: result.data.type,
                        id: result.data._id,
                        name: result.data.name,
                        email: result.data.email
                    }
                });
                navigate('/userHome');
            } else {
                setErr("email or password is incorrext");
            }
        }

        login()

    }
    console.log(state)
    return (
        <>
            <div className="container-div">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                    <div className="container">
                        <h3 className="navbar-brand ">RealEstate</h3>
                        <ul className="navbar-nav text-center mb-2 ">
                            <li className="nav-item">
                                <Link className="nav-link active " to="/selectPage">Go back</Link>
                            </li>
                        </ul>
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
                                        <input type="email" name='email' className="form-control" aria-describedby="emailHelp" value={data.email || ""} onChange={handleData} required />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" value={data.password || ""} onChange={handleData} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                                {err ? <small className=' text-danger fw-bold p-1 mt-5 ' >*{err}</small> : null}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin