import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import UserNav from './UserNav';
import Model from './Model';
import { userContext } from '../../App';

const UserHomePage = () => {
    const { state } = useContext(userContext);

    //@ error massage
    const [err, setErr] = useState('');

    // @set msg
    const [msg, setMsg] = useState("");

    // @set date
    const [pdate, setDate] = useState('');

    //@ properties collection
    const [properties, setProps] = useState(null);

    //@ another state for component RErender
    const [render, setrender] = useState(0)

    // @ store data from inputs
    const [data, setdata] = useState([{
        address: "",
        type: ""
    }]);

    // @get the property
    useEffect(() => {
        const getProp = async () => {
            try {
                const result = await axios.get(`/searchProperty/${data.address}/${data.type}`);
                if (result.data) {
                    setDate(result.data[0].date);
                    setProps(result.data[0]);
                }
                else if (!result.data) {
                    setProps(null);
                    setErr("Property doesn't exists at this address or enter valid address");
                }
                setrender(0)
            } catch (error) {
                setErr("Search");
            }

        }
        getProp();
    }, [render]);

    // get data from inputs
    const handleData = (e) => {
        const { name, value } = e.target;
        setdata(prev => ({ ...prev, [name]: value }))
    }

    // @handle search
    const formHandle = () => {
        setrender(1);
    }


    // @book now 
    const bookNow = (_id) => {

        const bookProp = async () => {
            const result = await axios.put(`/bookproperties/${_id}/${state.id}`);
            setMsg(result.data)
        }

        bookProp();
    }


    return (
        <div className='container-userHome'>
            <UserNav />
            <div className='container mt-5 p-3'>
                <h1 className='text-center mt-5 display-3 text-black-50 fw-bold '>
                    Find Your Dream Places
                </h1>
                <p className=' text-center  mt-2 fw-bold text-black-50'>Find Your Dream Home Easily And Quickly</p>
                <div className="card mt-5 bg-transparent shadow">
                    <div className="row gx-3 gy-2 align-items-center justify-content-center p-3">
                        <div className="col-sm-6 col-md-3">
                            <input type="text" name='address' required className="form-control" value={data.address || ""} id="specificSizeInputName" placeholder="Address" onChange={handleData} />
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <select className="form-select" name='type' onChange={handleData} >
                                <option value="" disabled  >Select Your Property Type</option>
                                <option value="House">House</option>
                                <option value="Land">Land</option>
                                <option value="Building">Building</option>
                            </select>
                        </div>
                        <div className="col-auto ">
                            <button type="submit" className="btn btn-dark" onClick={formHandle}>search</button>
                        </div>
                    </div>
                </div>
                <div className=' d-flex justify-content-center align-items-center'>
                    {!properties ? err ? <h3 className=' text-center text-black-50  p-1 mt-5 ' >{err}</h3> : null :
                        <div className="card mb-3 mt-4 shadow" style={{ maxWidth: "600px" }}>
                            <div className="row g-0">
                                <div className="col-md-6">
                                    <img src={`http://localhost:5000/public/${properties.image}`} className="searchCard rounded-start" alt="..." />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className="col-sm-6">
                                                <h5 className="card-title">{properties.type}</h5>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="card-text"> ₹ {properties.price}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-sm-6">
                                                <p className="card-text"> {properties.address}</p>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="card-text"> {properties.city}</p>
                                            </div>
                                        </div>
                                        <p className="card-text"><small className="text-muted">{`uploaded on ${pdate.split("T")[0]}`}</small></p>
                                        <button className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#booked" onClick={() => bookNow(properties._id)}>Book now</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    }

                </div>
                <Model des={msg} />
            </div>

        </div >
    )
}

export default UserHomePage