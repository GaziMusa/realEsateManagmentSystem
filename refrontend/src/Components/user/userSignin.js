import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from 'axios';
import { userContext } from '../../App';

const validate = values => {

    const errors = {};

    if (!values.fname) {
        errors.fname = 'Required';
    } else if (!/^[A-Za-z]+$/.test(values.fname)) {
        errors.fname = 'spaces,nums and special char are not allowed';
    }
    else if (values.fname.length > 10) {
        errors.fname = 'Must be 10 characters or less';
    }

    if (!values.lname) {
        errors.name = 'Required';
    } else if (!/^[A-Za-z]+$/.test(values.lname)) {
        errors.lname = 'spaces,nums and special char are not allowed';
    }
    else if (values.lname.length > 10) {
        errors.lname = 'Must be 10 characters or less';
    }


    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.age) {
        errors.age = 'Required';
    } else if (/^([^0-9]*)$/.test(values.age)) {
        errors.age = 'Invalid age';
    } else if (values.age < 21) {
        errors.age = 'age must be 18 plus and 53 less';
    }

    if (!values.cell) {
        errors.cell = 'Required';
    } else if (/^([^0-9]*)$/.test(values.cell)) {
        errors.cell = 'only numbers r allowed';
    } else if (values.cell.length !== 10) {
        errors.cell = 'must be ten numbers'
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 7) {
        errors.password = 'password must be greater than 7'
    } else if (values.password.length > 15) {
        errors.password = 'password must be less than 15'
    }

    return errors;
};

const UserSignin = () => {

    const navigate = useNavigate();

    // @set cre
    const { state, dispatch } = useContext(userContext);

    const [err, setErr] = useState('');
    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            cell: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            console.log(values)
            const signin = async () => {
                const result = await axios.post('/userSignin', {
                    type: "user",
                    fname: formik.values.fname,
                    lname: formik.values.lname,
                    email: formik.values.email,
                    age: formik.values.age,
                    phoneNumber: formik.values.cell,
                    password: formik.values.password
                })
                if (result) {
                    dispatch({
                        type: 'AGENT', agentPayload: {
                            isLogin: true,
                            type: result.data.type,
                            id: result.data._id,
                            name: result.data.name,
                            email: result.data.email
                        }
                    });
                    navigate('/');
                } else {
                    setErr("email is already in use")
                }
            }
            signin()

        },
    });
    return (
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
                    <div className='col-sm-12 col-md-6 col-lg-4 '>
                        <div className='shadow rounded bg-light p-3'>
                            <h2>
                                Sign In Here
                            </h2>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='row'>
                                    <div className="col-sm-6">
                                        <div className="mb-1">
                                            <label htmlFor="name" className="form-label">First Name</label>
                                            <input
                                                type="text"
                                                name='fname'
                                                className="form-control"
                                                aria-describedby="emailHelp"
                                                onChange={formik.handleChange}
                                                value={formik.values.fname || ""}
                                            />
                                            {formik.touched.fname && formik.errors.fname ? (
                                                <small className='text-danger fw-bolder'>*{formik.errors.fname}</small>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="mb-1">
                                            <label htmlFor="name" className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                name='lname'
                                                className="form-control"
                                                aria-describedby="emailHelp"
                                                onChange={formik.handleChange}
                                                value={formik.values.lname || ""}
                                            />
                                            {formik.touched.lname && formik.errors.lname ? (
                                                <small className='text-danger fw-bolder'>*{formik.errors.lname}</small>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-1">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        placeholder='e,g abc@gmail.com'
                                        name='email'
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        onChange={formik.handleChange}
                                        value={formik.values.email || ""}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <small className='text-danger fw-bolder'>*{formik.errors.email}</small>
                                    ) : null}
                                    <div id="emailHelp" className="form-text text-danger">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="age" className="form-label">Age</label>
                                    <input
                                        type="number"
                                        name='age'
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        onChange={formik.handleChange}
                                        value={formik.values.age || ""}
                                    />
                                    {formik.touched.age && formik.errors.age ? (
                                        <small className='text-danger fw-bolder'>*{formik.errors.age}</small>
                                    ) : null}
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="cell" className="form-label">Cell No</label>
                                    <div className=' input-group'>
                                        <div className="input-group-text">+91</div>
                                        <input
                                            type="text"
                                            name='cell'
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            onChange={formik.handleChange}
                                            value={formik.values.cell || ""}
                                        />
                                    </div>
                                    {formik.touched.cell && formik.errors.cell ? (
                                        <small className='text-danger fw-bolder'>*{formik.errors.cell}</small>
                                    ) : null}
                                </div>

                                <div className="mb-1">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name='password'
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <small className='text-danger fw-bolder'>*{formik.errors.password}</small>
                                    ) : null}
                                </div>

                                <button type="submit" className="btn btn-primary">Enter</button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserSignin