import { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import axios from 'axios';
import EditProperty from './EditProperty';
const Properties = () => {

    const [propId, setPropId] = useState('');
    const [properties, setProps] = useState([]);
    const { state } = useContext(userContext);

    // @Rerender the component
    const [render, setRender] = useState(0);

    useEffect(() => {
        const getProperties = async () => {
            try {
                const { data } = await axios.get(`/agentsProperites/${state.id}`);
                setProps(data);
            } catch (error) {
                // console.log(error)
            }
        }
        getProperties();

    }, [render]);

    // @set property id to update 
    const setId = (id) => {
        setPropId(id)
    }

    // @delete property
    const deleteprop = (id) => {
        // console.log(id);
        const delete_ = async () => {
            const result = await axios.delete(`/deleteProperty/${id}`);
            console.log(result.data)
        }
        delete_();
        setRender(render + 1)
    }


    return (
        <div className="container">
            <div className='row mt-3 gx-3 gy-2 bg-light p-2 mb-2'>

                {properties.length === 0 ? <h4 className=' text-center text-black-50'>Properties doesn't exists</h4> :
                    properties.map((e) => {
                        return (<div className="col-sm-12 col-md-6 col-lg-3 " key={e._id}>
                            <div className="card shadow">
                                <img src={`http://localhost:5000/public/${e.image}`} className=" img-prop" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{e.address}</h5>
                                    <p>{e.type} ₹{e.price}</p>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setId(e._id)}>
                                        edit
                                    </button>
                                    <button className='btn btn-danger m-1' onClick={() => deleteprop(e._id)} >Delete</button>
                                </div>
                            </div></div>
                        )
                    })
                }
                <EditProperty data={propId} />
            </div>
        </div>
    )
}

export default Properties