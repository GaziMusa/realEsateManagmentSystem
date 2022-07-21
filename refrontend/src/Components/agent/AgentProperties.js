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
            <div className="table-responsive ">
                <table className="table table-hover table-borderless" >
                    <thead>
                        <tr className='text-primary'>
                            <th scope="col">S.No</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Address</th>
                            <th scope="col">Area</th>
                            <th scope="col">Uploaded On</th>
                            <th scope="col" className=' text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {properties.length === 0 ? <h4 className=' text-center text-black-50'>Properties doesn't exists</h4> :
                            properties.map((e, i) => {
                                return (<tr key={e._id}>
                                    <td>{i + 1}</td>
                                    <td><img src={`http://localhost:5000/public/${e.image}`} className="shadow img-prop" alt="..." /></td>
                                    <td>{e.type} ₹{e.price}</td>
                                    <td> {e.address}</td>
                                    <td>{e.area}</td>
                                    <td>{e.date.split("T")[0]}</td>
                                    <td> <button type="button" className="btn shadow btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setId(e._id)}>
                                        edit
                                    </button>
                                        <button className='btn btn-sm shadow btn-danger m-1' onClick={() => deleteprop(e._id)} >Delete</button>
                                    </td>
                                </tr>
                                )
                            })
                        }</tbody>
                </table>
            </div>
            <EditProperty data={propId} />
        </div >
    )
}

export default Properties
