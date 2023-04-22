import React, { useEffect, useState } from "react";
import "./App.css";

import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Notfound from "./Components/Notfound/Notfound";
import jwtDecode from "jwt-decode";
import ProtectRoutes from "./Components/ProtectRoutes/ProtectRoutes";
import CartContextProvider from "./Context/CartContext";
import CounterContextProvider from "./Context/CounterContext"
import  { Toaster } from 'react-hot-toast';
import CheckOut from "./Components/ChekOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";






export default function App() {



  const [userData, setUserData] = useState(null);



  function saveUser() {     // to make sure that user is logged in 
    let encodedToken = localStorage.getItem("userToken");     // getting token from local storage
    let decoded = jwtDecode(encodedToken);       // decode token
    //console.log(decoded);
    setUserData(decoded);      // catching the decoded token to use it 
  }
  



  useEffect(() => {
    if (localStorage.getItem("userToken")) {        // when running the app check if the user logged in to make him logged in despite the refresh 
      saveUser();
    }
  }, []);






  const routes = createHashRouter([  // routing between components
    {
      path: "",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoutes>
              {" "}
              <Home />{" "}
            </ProtectRoutes>
          ),
        },
        {  // </ProtectRoutes> ==> protect component to make the user log in first
          path: "home",
          element: (
            <ProtectRoutes>  
              <Home />{" "}
            </ProtectRoutes>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveUser={saveUser}  /> },
        {
          path: "cart",
          element: (
            <ProtectRoutes>
              {" "}
              <Cart />
            </ProtectRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectRoutes>
              {" "}
              <Products />{" "}
            </ProtectRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectRoutes>
              {" "}
              <CheckOut />{" "}
            </ProtectRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectRoutes>
              {" "}
              <AllOrders />{" "}
            </ProtectRoutes>
          ),
        },
        {
          path: "product-details/:id",   // :id its a parameter contains so it wouldn't be static or string in url 
          element: (
            <ProtectRoutes>
             
              <ProductDetails/>
            </ProtectRoutes>
          ),
        },

        { path: "*", element: <Notfound /> },
      ],
    },
  ]);






  
  return (
    <>
    
    <CartContextProvider>
    <Toaster></Toaster>
    <RouterProvider router={routes}></RouterProvider>
    </CartContextProvider>
    </>
   
      
    
  );
}
