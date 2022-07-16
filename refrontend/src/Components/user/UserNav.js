import axios from 'axios'
import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';


const UserNav = () => {

    const { state, dispatch } = useContext(userContext);

    const navigate = useNavigate();

    const logout = () => {
        const logout_ = async () => {
            const { data } = await axios.get('/userLogout');
            if (data) {
                dispatch({
                    type: 'USER', userPayload: {
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
        <nav className="navbar navbar-expand-lg bg-light sticky-top">
            <div className="container">
                <h3 className="navbar-brand ">RealEstate</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <div className="stick"></div>
                    <div className="stick"></div>
                    <div className="stick"></div>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto text-center mb-2 ">
                        <li className="nav-item">
                            <Link className="nav-link text-dark " to="/userHome">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark " to="/properties">Properties</Link>
                        </li>                       
                        <li className="nav-item">
                            <Link className="nav-link shadow btn-sm btn-primary text-white mx-1 text-center " to="#" onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default UserNav