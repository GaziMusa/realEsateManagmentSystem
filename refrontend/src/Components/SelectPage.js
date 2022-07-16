import React from 'react'
import { Link } from "react-router-dom"
import HomeNav from './HomeNav'
const SelectPage = () => {
    return (
        <>
            <div className="container-div">
               <HomeNav />
                <div className="container justify-content-center w-100 h-75 mt-5">
                    <div className="row justify-content-center align-items-center ">
                        <div className='col-sm-12 col-md-6 col-lg-4 mt-5'>
                            <div className='shadow rounded bg-light p-4'>
                                <h1>
                                    Sell And Buy your Property at best prices
                                </h1>
                                <p className='mt-3 fw-bold text-danger'>
                                    Continue as Agent
                                </p>
                                <Link className='btn btn-outline-success' to="/agentSignin">SignIn</Link>
                                <Link className='btn btn-outline-primary mx-5' to="/agentLogin" >Login</Link>
                                <p className='mt-3 fw-bold text-danger'>
                                    Continue as User
                                </p>
                                <Link className='btn btn-outline-success' to="/userSignin">SignIn</Link>
                                <Link className='btn btn-outline-primary mx-5' to="/userLogin" >Login</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectPage