import React from 'react'
import HomeNav from './HomeNav'
import aboutUsimg from '../Images/aboutUs.jpg'

const AboutUs = () => {
    return (
        <div className="container-userHome">
            <HomeNav />
            <div className="container ">
                <div class="row align-items-center mt-5 ">
                    <div class="col-sm-12 col-md-6 mt-5">
                        <div className=' bg-white p-3 shadow mt-5 rounded-1'>
                            <h2 className=' display-4'>About Us</h2>
                            <p className=' text-black-50 ' > Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, optio voluptatibus. Eos,
                                sint saepe ad recusandae labore officia repellendus tenetur enim,
                                perferendis corrupti libero eligendi animi incidunt sequi quam autem?
                            </p>
                            <p className=' text-black-50'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, sunt? Atque dolorem suscipit
                                voluptas sed enim impedit maiores consequuntur, harum similique tempore ut corporis doloribus
                                molestiae totam perspiciatis quas ducimus?
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mt-5">
                      <div className='rounde-1 p-1 mt-5 p-3'>
                        <img src={aboutUsimg} alt="" className=' shadow aboutUsimg' />
                      </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AboutUs