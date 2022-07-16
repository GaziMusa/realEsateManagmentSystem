import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import Model from './Model'
import UserNav from './UserNav';
import { userContext } from '../../App';

const Properties = () => {

    const { state } = useContext(userContext);

    // @page limit
    let [pageLimit, setPageLimit] = useState(0);

    // @set msg
    const [msg, setMsg] = useState("");

    //@page no
    let [pageNo, setPageNumber] = useState(1)

    // @set properties
    const [properties, setProperties] = useState([])

    // @get page Limit
    useEffect(() => {

        const getLimit = async () => {
            // @get no of props
            const prop = await axios.get('/getNoprops');
            setPageLimit(prop.data);
        }

        getLimit();
    }, [])

    useEffect(() => {

        const getProps = async () => {
            try {
                const result = await axios.get(`/properties/6/${pageNo}`);
                setProperties(result.data);
            } catch (error) {
                // console.log("error")
            }
        }

        getProps();

    }, [pageNo]);

    // @nextPage
    const next = () => {
        setPageNumber(pageNo + 1);
    }

    // @previous page
    const pre = () => {
        setPageNumber(pageNo - 1);
    }

    // @book now 
    const bookNow = (pid) => {

        const bookProp = async () => {
            try {
                const result = await axios.put(`/bookproperties/${pid}/${state.id}`);
                setMsg(result.data)
                console.log(result.data)
            } catch (error) {
                setMsg("Try again");
            }
        }

        bookProp();
    }

    return (
        <div className='container-div' >
            <UserNav />
            <div className="container">
                <div className='row mt-3 gy-2 gx-4 p-2 mb-2'>
                    {properties.map((e) => {
                        return <div className="col-sm-12 col-md-6 col-lg-4 " key={e._id}>
                            <div className="card shadow border-white">
                                <img src={`http://localhost:5000/public/${e.image}`} className="card-img-prop" alt="..." />
                                <div className="card-body text-black-50">
                                    <div className='row'>
                                        <div className="col-sm-6">
                                            <h5 className="card-title">{e.type}</h5>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="card-text"> ₹ {e.price}</p>
                                        </div>
                                    </div>

                                    <p className="card-text"> {e.address}</p>
                                    <p className="card-text"> {e.city}</p>

                                    <p className="card-text"><small className="text-muted">{`uploaded on ${e.date.split("T")[0]}`}</small></p>
                                    <button className="btn btn-sm shadow btn-dark text-white" onClick={() => bookNow(e._id)} data-bs-toggle="modal" data-bs-target="#booked">BookNow</button>

                                </div>
                            </div>

                        </div>
                    })
                    }
                </div>
                <div className=' d-flex justify-content-around mb-3 p-3' >
                    {
                        pageNo === 1 & pageLimit / pageNo > 6 ?
                            <button className='btn btn-sm shadow btn-primary' onClick={next}>next</button>
                            : pageLimit / pageNo > 6 ? <>
                                <button className='btn btn-sm shadow btn-primary' onClick={pre}>pre</button>
                                <button className='btn btn-sm shadow btn-primary' onClick={next}>next</button>

                            </> : pageLimit === 6 ? null  :
                                <button className='btn btn-sm shadow btn-primary' onClick={pre}>pre</button>
                    }
                </div>
                <Model des={msg} />
            </div>
        </div >
    )
}

export default Properties