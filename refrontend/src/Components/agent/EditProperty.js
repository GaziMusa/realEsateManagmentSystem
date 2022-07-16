import axios from 'axios'
import { useEffect, useState } from 'react'

const EditProperty = (props) => {

    const propsid = props.data;
    const [image, setimage] = useState('');
    const [pro, setPro] = useState({
        id: "",
        address: "",
        area: "",
        price: "",
        image: ""
    });

    const handledata = (e) => {
        // console.log('hi');
        const { name, value } = e.target;
        setPro(pre => ({ ...pre, [name]: value }))
    }

    const handleImage = (e) => {
        const image = e.target.files[0];
        setimage(image)
    }

    console.log(image)

    useEffect(() => {

        const getOneProperty = async () => {
            try {
                const result = await axios.get(`/getOneProperites/${propsid}`);
                const data = result.data[0];
                setPro({
                    id: data._id,
                    address: data.address,
                    area: data.area,
                    price: data.price,
                    image: data.image
                })
            } catch (error) {

            }

        }
        getOneProperty();
    }, [propsid]);

    const updateProp = (e) => {
        e.preventDefault();
        //Now make a put request in axios we can also make a await function
        let property;
        if (image === '') {
            property = {
                address: pro.address,
                area: pro.area,
                price: pro.price,
            }
        } else {
            property = {
                address: pro.address,
                area: pro.area,
                price: pro.price,
                image:image
            }
        }
        axios.put(`/editProperty/${pro.id}`, property,
            { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
                console.log(res.data)
            })
        window.location.reload();
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">update your property</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="inputAddress" className="form-label">Address</label>
                                    <input type="text" name='address' className="form-control" id="inputAddress" value={pro.address || ""} onChange={handledata} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="area" className="form-label">Area</label>
                                    <input type="text" name='area' className="form-control" value={pro.area || ""} onChange={handledata} />
                                    <small>sqm format</small>
                                </div>
                                <div className="col-md-6 ">
                                    <label htmlFor="price" className='form-label'>Price</label>
                                    <label className="visually-hidden" htmlFor="autoSizingInputGroup">Price</label>
                                    <div className="input-group">
                                        <div className="input-group-text">₹</div>
                                        <input type="text" name='price' className="form-control" id="autoSizingInputGroup" value={pro.price || ""} onChange={handledata} />
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor='image' className="form-label">upload Image</label><br />
                                    <img src={pro.image ? `http://localhost:5000/public/${pro.image}` : ""} alt="" className='prop-img'  />
                                    <input type="file" name='image' className="form-control" id="inputGroupFile01" onChange={handleImage}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={updateProp} data-bs-dismiss="modal" >Update</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProperty