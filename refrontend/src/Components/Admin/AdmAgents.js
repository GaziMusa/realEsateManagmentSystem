import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdmAgents = () => {

  // @page number
  let [pageNo, setPageNumber] = useState(1)

  // @page limit
  let [pageLimit, setPageLimit] = useState(0)

  // @set agents
  const [agents, setagents] = useState([])

  // @Rerender the component
  const [render, setRender] = useState(0);

  // @get page Limit
  useEffect(() => {

    const getLimit = async () => {
      // @get no of props
      const prop = await axios.get('/getNoagents');
      setPageLimit(prop.data);
    }

    getLimit();
  }, [])

  useEffect(() => {

    const getProps = async () => {
      try {
        const result = await axios.get(`/getAgents/6/${pageNo}`);
        setagents(result.data);
      } catch (error) {
        // console.log("error")
      }
    }
    getProps();
  }, [render]);

  // @next page
  const next = () => {
    setPageNumber(pageNo + 1);
    setRender(render + 1)
  }

  // @previous page
  const pre = () => {
    setPageNumber(pageNo - 1);
    setRender(render - 1)
  }


  // @delete property
  const delete_prop = (id) => {

    const delete_ = async () => {
      const del = await axios.delete(`/deleteAgent/${id}`);
      console.log(del);
      setRender(render + 1)
    }
    delete_()

  }

  // console.log(pageLimit % 6 )

  return (
    <div className='container'>
      <h3 className=' text-primary fw-light p-1'>Agents</h3>
      <div className="table-responsive ">
        <table className="table table-hover table-borderless" >
          <thead>
            <tr className='text-primary'>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Cell No</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((e, i) => {
              return <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{`${e.fname} ${e.lname}`}</td>
                <td >{e.email}</td>
                <td>{e.age || "NA"}</td>
                <td>{e.phoneNumber}</td>
                <td>
                  <button className=' btn btn-primary btn-sm' onClick={() => delete_prop(e._id)}>Delete</button>
                
                </td>
              </tr>
            })
            }
          </tbody>
          <tfoot>
            <tr>
              {
                pageNo === 1 & pageLimit / pageNo > 6 ? <td>
                  <button className='btn btn-sm btn-primary' onClick={next}>next</button>
                </td> : pageLimit / pageNo > 6 ? <>
                  <td>
                    <button className='btn btn-sm btn-primary' onClick={pre}>pre</button>
                  </td>
                  <td>
                    <button className='btn btn-sm btn-primary' onClick={next}>next</button>
                  </td>
                </> : pageLimit <= 6 ? null : <td>
                  <button className='btn btn-sm btn-danger' onClick={pre}>pre</button>
                </td>
              }
            </tr>
          </tfoot>

        </table>
      </div>
    </div >
  )
}

export default AdmAgents