import React from 'react'
import { Link } from "react-router-dom";
const HomeNav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light  ">
            <div className="container">
                <h3 className="navbar-brand text-black-50 ">RealEstate</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <div className="stick"></div>
                    <div className="stick"></div>
                    <div className="stick"></div>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav text-center mx-auto mb-2 ">
                        <li className="nav-item">
                            <Link className="nav-link  text-black " to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link  text-black" to="/aboutUs">About Us</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default HomeNav