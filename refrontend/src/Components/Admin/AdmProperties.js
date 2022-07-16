import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UploadedBy from './UploadedBy';

const AdmProperties = () => {

  // @set prop id
  const [propId, setPropId] = useState('');

  // @page number
  let [pageNo, setPageNumber] = useState(1)

  // @page limit
  let [pageLimit, setPageLimit] = useState(0)

  // @set properties
  const [properties, setProperties] = useState([])

  // @Rerender the component
  const [render, setRender] = useState(0);

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
        const result = await axios.get(`/getprops/6/${pageNo}`);
        setProperties(result.data);
      } catch (error) {
        // console.log("error")
      }
    }

    getProps();

  }, [render]);

  // @next page
  const next = () => {
    setPageNumber(pageNo + 1);
    console.log(pageNo)
    setRender(render + 1)
  }

  // @previous page
  const pre = () => {
    setPageNumber(pageNo - 1);
    setRender(render - 1)
  }

  // @set property id to update 
  const setId = (id) => {
    setPropId(id)
  }

  // @delete property
  const delete_prop = (id) => {

    const delete_ = async () => {
      const del = await axios.delete(`/deleteProperty/${id}`);
      console.log(del);
      setRender(render + 1)
    }
    delete_()

  }

  return (
    <div className='container'>
      <h3 className=' text-primary fw-light p-1'>Uploaded Properties </h3>
      <div className="table-responsive ">
        <table className="table table-hover table-borderless" >
          <thead>
            <tr className='text-primary'>
              <th scope="col">S.No</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Address</th>
              <th scope="col">Uploaded On</th>
              <th scope="col" className=' text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((e, i) => {
              return <tr key={e._id}>
                <td>{i + 1}</td>
                <td><img src={`http://localhost:5000/public/${e.image}`} className="shadow table-image" alt="" /> </td>
                <td >₹{e.price}</td>
                <td>{e.address}</td>
                <td>{e.date.split("T")[0]}</td>
                <td className='text-center'>
                  <button className=' btn btn-primary btn-sm mx-2' onClick={() => delete_prop(e._id)}>Delete</button>
                  <button className=' btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#uploadedModal" onClick={() => setId(e.agentId)} >uploaded by</button>
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
                </> : pageLimit === 6 ? <td></td> : <td>
                  <button className='btn btn-sm btn-primary' onClick={pre}>pre</button>
                </td>
              }
            </tr>
          </tfoot>

        </table>
        <UploadedBy data={propId} />
      </div>
    </div>
  )
}

export default AdmProperties