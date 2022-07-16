import axios from 'axios';
import React,{useState,useEffect } from 'react'

const UploadedBy = (props) => {

    const propsid = props.data;
    const [agent, setAgent] = useState([]);

    useEffect(() => {
        // @get the agent
        try {
            const getAgent = async () => {
                const agent = await axios.get(`/getAgent/${propsid}`);
                setAgent(agent.data);
            }
            getAgent()
        } catch (error) {
            console.log(error)
        }
    }, [propsid]);

    return (
        <div className="modal fade" id="uploadedModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-black-50" id="exampleModalLabel">Agent's information</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="modal-body">
                            <div className="mb-3">
                                <div className='row'>
                                    <div className="col-sm-6">
                                        <label htmlFor="fname" className="form-label">First Name</label>
                                        <input type="fname"
                                            name="fname"
                                            value={agent.fname}
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="lname" className="form-label">Last Name</label>
                                        <input type="lname"
                                            name="lname"
                                            value={agent.lname}
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    name='email'
                                    value={agent.email}
                                    className="form-control"
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Cell No</label>
                                <input type="text"
                                    name='cell'
                                    value={agent.phoneNumber}
                                    className=' form-control'
                                    readOnly
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadedBy