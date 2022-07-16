import { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App';
import axios from 'axios';
import ProfileUpdate from './ProfileUpdate';
const AgentProfile = () => {
    const { state } = useContext(userContext);
    const [agent, setAgent] = useState([]);

    useEffect(() => {
        // @get the agent
        try {
            const getAgent = async () => {
                const agent = await axios.get(`/getAgent/${state.id}`);
                setAgent(agent.data);
            }
            getAgent()
        } catch (error) {
            console.log(error)
        }
    }, [state.id]);

    return (
        <div className='container'>
            <div className="row">
                <div className='col-sm-12 col-md-6 col-lg-4'>
                    <div className="shadow p-3 rounded">
                        <h4>Your Profile</h4>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="name" className="form-control" value={agent.fname + " " + agent.lname || ""} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={agent.email || ""} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Cell No</label>
                            <input type="email" className="form-control" value={agent.phoneNumber || ""} readOnly />
                        </div>
                        <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#profileUpdate">Update</button>
                    </div>
                </div>
            </div>
            <ProfileUpdate data={agent} />
        </div>
    )
}

export default AgentProfile