import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";



export let CartContext = createContext(0); // context used to make shared data available with many components



export default function CartContextProvider(props) {

const[numOfCartItems,setnumOfCartItem] = useState(0)
const[cartId,setCartId] = useState(null)




  useEffect(() => {
    getInitialValues()
  }, [])


async function getInitialValues(){
  let {data}= await getCart()
  if(data.status == "success"){
   setnumOfCartItem (data.numOfCartItems);
   setCartId(data.data._id);
   console.log(data.numOfCartItems,"from context",data.data._id);

  }

  }

let headers = {token: localStorage.getItem("userToken"),
}



// Creating Cart


  function createCart(x) {
    return axios //to be returning the error or response to deal with them 
      .post(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        { productId: x },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }


// Getting Cart


  function getCart() {
    return axios
      .get(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }



// Updating Cart



  function updateCart(id,count) {
    return axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{count},
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);


     
  
  }


// Removing from  Cart


  function removeCartItem(id) {
    return axios
      .delete(
        `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }


  function generateOnlinePayment(cartId,shippingAddress){


    return axios
    .post(
      `https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {shippingAddress},
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);


  }



  const [cart,setCart] = useState(0);

  return (
    <CartContext.Provider value={{setnumOfCartItem, numOfCartItems ,cartId,cart, createCart, getCart,updateCart,removeCartItem,generateOnlinePayment }}>
      {props.children}
    </CartContext.Provider>
  );
}
