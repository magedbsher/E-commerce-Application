import React, { useContext } from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import Slider from 'react-slick';
import styles from'./ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import { Helmet } from "react-helmet";



export default function ProductDetails() {
  let {createCart}= useContext(CartContext)
  let {id}=useParams()  // hook used for catch any thing from url
  //console.log(id);

  const [productDetails, setProductDetails] = useState({});

  async function getProductDetails() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );

   //console.log(data.data);
   setProductDetails(data.data);
  };



  useEffect(() => {
    getProductDetails();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
  };




  return (
    <>


<Helmet>
        <meta charSet="utf-8" />
        <title>Product Details</title>
      </Helmet>


      <div className='container py-5'>
        <div className='row align-items-center py-5'>
          <div className='col-md-4'>

          <Slider {...settings}>
         
        {productDetails?.images?.map((img) => (
          <div key={productDetails.id}>
            <img  className='w-100' src={img} alt="" />
          </div>
        ))}
      </Slider>
          </div>
          <div className='col-md-8'>
            <h1>{productDetails.title}</h1>
            <p>{productDetails.description}</p>
            <div className="d-flex justify-content-between">
                  <p>{productDetails.price} EGP</p>
                  <div>
                    <i className="fa fa-star text-warning"></i> {productDetails.ratingsAverage}
                  </div>
                </div>
                <button onClick={()=>createCart(productDetails._id)} className="btn btn-success text-white w-100">
                  + ADD
                </button>
          </div>
        </div>
      </div>
    </>
  )
}
