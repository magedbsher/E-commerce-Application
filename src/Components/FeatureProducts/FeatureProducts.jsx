import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./FeatureProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function FeatureProducts() {


  let { createCart,setnumOfCartItem } = useContext(CartContext);

  const [allProducts, setAllProducts] = useState([]);

  async function getProducts() {
    let { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/products"
    );

    //console.log(data.data);
    setAllProducts(data.data);
  }

  async function generateCart(productId) {
    let response = await createCart(productId);
    console.log(response, "from feature");
    if (response.data.status == "success") {
      toast.success(response.data.message, { // to let the user know the product added successfully
        position: "bottom-right",
        className: "text-center border-success border-2 box-shadow",
      })
      setnumOfCartItem(response.data.numOfCartItems)
    }else{
      toast.error(response.data.message,{
        position:"bottom-right",
        className:"text-center border-success border-2 box-shadow"
      })

    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row g-2">
          {allProducts.map((product) => (
            <div key={product.id} className="col-md-2">
              <div className="product px-2 py-3">
                
                
                <Link to={"/product-details/"+product.id} className="text-decoration-none">
                <img src={product.imageCover} className="w-100" alt="" />
                <p className="text-success">{product.category.name}</p>
                <h3 className="h6 text-dark">  
                  {product.title.split(" ").splice(0, 2).join(" ")}
                </h3>
                  <div className="d-flex justify-content-between">
                    <p className=" text-decoration-none">{product.price}  EGP</p>
                    <div>
                      <i className="fa fa-star text-warning "></i>
                      {product.ratingsAverage}
                    </div>
                  </div>
                </Link>
                <div >
                <button
                  onClick={() => generateCart(product._id)}
                  className="btn btn-success text-white w-100"
                >
                  + ADD
                </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
