import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../App';
const BookedProperties = () => {

    const [msg, setmsg] = useState('');

    const [data, setData] = useState([]);
    const { state } = useContext(userContext);


    // @Rerender the component
    const [render, setRender] = useState(0);

    useEffect(() => {

        const get_result = async () => {
            const result = await axios.get(`/bookedProperties/${state.id}`);
            setData(result.data);
        }
        get_result();
    }, [render]);

    // @cencel deal
    const cencelDeal = (_id) => {
        const cencel_Deal = async () => {
            const { data } = await axios.get(`/cancelDeal/${_id}`);
            if (data) setmsg("Ur deal is canceled");
        }
        cencel_Deal();
        setRender(render + 1);
    }

    // @deal done
    const doneDeal = (_id) => {
        const done_Deal = async () => {
            const { data } = await axios.get(`/dealDone/${_id}`);
            if (data) setmsg("Ur deal is done with the client");
        }
        done_Deal();
        setRender(render - 1);
    }
    return (
        <div className='container'>
            <div className="card shadow  bg-opacity-75 mt-2 ">
                {data.length === 0 ? <h3 className='text-center text-black-50 p-2'>Not found ur booked properties</h3> :
                    data.map((e) => {
                        return (<div className="card-body m-1 text-black-50">
                            {e.dec}
                            <div className='m-1 float-end'>
                                <button className='btn shadow btn-sm btn-outline-danger' onClick={() => cencelDeal(e.prop_id)}>Cencel Deal</button>
                                <button className='btn shadow mx-1 btn-sm btn-outline-success' onClick={() => doneDeal(e.prop_id)}>Done Deal</button>
                            </div>
                        </div>)
                    })
                }
                {msg ? <div><p className=' text-black-50 p-1'>{msg}</p></div> : ""}
            </div>
        </div>
    )
}

export default BookedProperties