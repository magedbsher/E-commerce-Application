import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Offline, Online } from "react-detect-offline";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";






export default function Cart() {

  
  const [cartDetails, setCartDetails] = useState({});
  let { getCart, updateCart, removeCartItem } = useContext(CartContext);

  async function getCartDetails() {
    let res = await getCart();
    //console.log(res);
    setCartDetails(res.data);
     
    
  }

  async function updateCartHandler(id,count) {  
    let res = await updateCart(id, count);
    //console.log(res.data);
   

    setCartDetails(res.data);



  }

  async function deleteCartHandler(id) {
    let res = await removeCartItem(id);
    //console.log(res);
    setCartDetails(res.data);
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <> 
    
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shop Cart</title>
      </Helmet>

      {/* <Online><span className="position-fixed bottom-50 right-50 text-danger bg-light">Only shown when you're online</span></Online> */}
      <Offline>
        <div className="Network ">
        <span className=" text-white p-5 bg-danger">
          Only shown offline (surprise!)
        </span>
        </div>
       
      </Offline>

      {cartDetails && cartDetails.data && (
        <div className=" Cart-Back container py-5 my-5">
          <h3 className="  text-primary">Cart Details</h3>
          <h4>Total Price:{cartDetails.data.totalCartPrice}</h4>
          {cartDetails.data.products.map((product) => (
            <div
              key={product.product._id}
              className="row border-bottom border-bottom-danger p-2"
            >
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  className="w-100 h-100"
                  alt=""
                />
              </div>
              <div className="col-md-11 d-flex justify-content-between">
                <div className="">
                  <h4>{product.product.title}</h4>
                  <p className="text-success">{product.price}EGP</p>
                  <button
                    onClick={() => deleteCartHandler(product.product._id)}
                    className="ps-0 btn text-danger"
                  >
                    <i className="fa fa-trash"></i>Remove
                  </button>
                  </div>
                  

                  <div className="d-flex  align-items-center text-white">
                    <button
                      onClick={() =>
                        updateCartHandler(
                          product.product._id,
                          product.count+1
                        )
                      }
                      className="btn btn-success cursor-pointer"
                    >
                      +
                    </button>
                    <p className="mx-3 mb-0 text-dark">{product.count}</p>
                    <button
                      onClick={() =>updateCartHandler(product.product._id,product.count-1)
                      }
                      className="btn btn-danger cursor-pointer text-white"
                    >
                      -
                    </button>



                  </div>
                
              </div>



            </div>
          ))}
          <Link to={"/checkout"} className="btn btn-success text-white my-5">Procced To payment</Link>

        </div>
      )}
    </>
  );
}
