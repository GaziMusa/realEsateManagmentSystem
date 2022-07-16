import React from 'react'
import { Link } from "react-router-dom";
import HomeNav from './HomeNav';

const Home = () => {
  return (
    <>
      <div className="container-userHome">
       <HomeNav/>
        <div className="container  h-50 d-flex justify-content-center  align-items-center ">
          <div className='mt-5 text-center'>
            <h1 className=' mt-5 text-center text-black-50 display-3 fw-bold '>
              Wellcome to our <span className='text-danger' >Real</span><span className='text-success'> Estate <br />
              </span>  Managment system...!
            </h1>
            <p className='text-center  mt-2 fw-bold text-black-50'  >We r providing best services</p>
            <Link className='btn btn-dark' to="/selectPage" >Get Started</Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home