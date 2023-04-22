import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
export default function Navbar({ userData, logOut }) {

let {numOfCartItems} =useContext(CartContext)

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" href="#">
          <i className="fa-solid fa-cart-shopping text-white" ></i>  Freshchart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>

                
              </ul>
            )}

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="mx-2">
                <i className="fa-brands fa-facebook-f text-white"></i>
              </li>
              <li className="mx-2">
                <i className="fa-brands fa-twitter text-white"></i>
              </li>
              <li className="mx-2">
                <i className="fa-brands fa-instagram text-white"></i>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData ? (<> 
              <li className="nav-item position-relative ">
                  <Link className="nav-link" to="cart">
                    <i className="fa fa-shopping-cart fa-lg"></i>
                    <div className="badge bg-success position-absolute top-0 end-0 ">{numOfCartItems}</div>
                  </Link>
                </li>
                


                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logOut}>
                    LogOut
                  </span>
                </li>
                </>) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="Login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
