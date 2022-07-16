import React from 'react';
import { useContext, useState } from 'react'
import { useFormik } from "formik"
import axios from 'axios';
import { userContext } from '../../App'
const validate = values => {

    const errors = {};

    if (!values.address) {
        errors.address = 'Required';
    } else if (values.address.length < 5) {
        errors.address = 'address must be like Rambag,srinagar';
    }

    if (!values.area) {
        errors.area = 'Required';
    } else if (values.area < 1) {
        errors.area = 'e,g 1000';
    } else if (!/^\d+$/.test(values.area)) {
        errors.area = 'only numbers r allowed';
    }

    if (!values.zip) {
        errors.zip = 'Required';
    } else if (!/^\d+$/.test(values.zip)) {
        errors.zip = 'only numbers r allowed';
    }

    if (!values.city) {
        errors.city = 'Required';
    } else if (values.address.length < 4) {
        errors.city = '';
    }


    if (!values.price) {
        errors.price = 'Required';
    } else if (values.price < 50000) {
        errors.price = 'e,g price must be greater than 50k'
    } else if (!/^\d+$/.test(values.price)) {
        errors.price = 'only numbers r allowed';
    }

    return errors;
};

const AddProperties = () => {
    const { state } = useContext(userContext);
    const [image, setimage] = useState('');
    const [rtext, setrtext] = useState('');
    const handleImage = (e) => {
        const image = e.target.files[0];
        setimage(image)
    }
    const formik = useFormik({
        initialValues: {
            type: '',
            address: '',
            area: '',
            price: '',
            city: '',
            zip: ''
        },
        validate,
        onSubmit: values => {
            const pro = {
                agentId: state.id,
                type: formik.values.type,
                address: formik.values.address,
                area: formik.values.area,
                price: formik.values.price,
                image: image
            };

            axios.post(`/addProperty/${state.id}`, pro, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => {
                if (res) { setrtext('Your Property is Added') }
            })

            formik.values.type = '';
            formik.values.address = '';
            formik.values.area = '';
            formik.values.price = '';
            formik.values.city = '';
            formik.values.zip = '';
            formik.values.image = '';
        }
    });
    return (
        <div className='container'>
            <div className="row">
                <div className='col-sm-12 col-md-12 col-lg-6'>
                    <div className="shadow p-3 rounded">
                        <h4>Add New Property</h4>
                        <form className="row g-3" onSubmit={formik.handleSubmit}>
                            <div className="col-md-12">
                                <label htmlFor="inputState" className="form-label">Property Type</label>
                                <select className="form-select" defaultValue={'DEFAULT'} name='type'  onChange={formik.handleChange} >
                                    <option value="DEFAULT" >Select Property Type</option>
                                    <option value="House">House</option>
                                    <option value="Land">Land</option>
                                    <option value="Building">Building</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Address</label>
                                <input type="text" name='address'
                                    className="form-control"
                                    placeholder="e,g Hyderpora,srinagar"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.address && formik.errors.address ? (
                                    <small className=' alert-danger alert'>*{formik.errors.address}</small>
                                ) : null}
                            </div>

                            <div className="col-md-6">  
                            <label htmlFor="area" className="form-label">Area</label>
                                <div className='input-group'>
                                    <input type="text"
                                        name='area'
                                        className="form-control"
                                        value={formik.values.area}
                                        onChange={formik.handleChange}
                                        aria-describedby="basic-addon2"
                                    />
                                    <span className="input-group-text" id="basic-addon2">sqm</span>
                                </div>
                                {formik.touched.area && formik.errors.area ? (
                                    <small className=' alert-danger alert'>*{formik.errors.area}</small>
                                ) : null}
                            </div>
                            <div className="col-md-6 ">
                                <label htmlFor="price" className='form-label'>Price</label>
                                <label className="visually-hidden" >Price</label>
                                <div className="input-group">
                                    <div className="input-group-text">₹</div>
                                    <input type="text"
                                        name='price'
                                        className="form-control"
                                        placeholder=""
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                    /> </div>
                                    {formik.touched.price && formik.errors.price ? (
                                        <small className=' alert-danger alert'>*{formik.errors.price}</small>
                                    ) : null}
                               
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text"
                                    name='city'
                                    className="form-control"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.city && formik.errors.city ? (
                                    <small className=' alert-danger alert'>*{formik.errors.city}</small>
                                ) : null}
                            </div>

                            <div className="col-md-5">
                                <label htmlFor="inputZip" className="form-label">Zip</label>
                                <input type="text"
                                    name='zip'
                                    className="form-control"
                                    value={formik.values.zip}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.zip && formik.errors.zip ? (
                                    <small className=' alert-danger alert'>*{formik.errors.zip}</small>
                                ) : null}
                            </div>

                            <div className=" mb-3">
                                <label htmlFor="file" className="form-label">upload Image</label>
                                <input type="file"
                                    name='image'
                                    className="form-control"
                                    required
                                    onChange={handleImage}
                                />
                            </div>
                            {rtext ? <span className=' alert-dark alert' >{rtext}</span> : ""}
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProperties