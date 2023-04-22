import { useFormik,Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();


//registeration function 

  async function register(values) {
    console.log("hey", values);
    setIsLoading(true);   //turning off the loading 
    setErrorMessage(null);   //hide tje red tab



// sending the registeration data to the backend

    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)     //sending the values of the inputs to the backend
      .catch((err) => {          // cathching the response error
        console.log(err);
        setIsLoading(false);           //turning off the loading 

        setErrorMessage(err.response.data.errors.msg); //printing the error in the ui 
      });
    console.log(data);

    if (data.message === "success") {            //check the response 
      setIsLoading(false);              //turning off the loading 
      navigate("/login");              // redirect the user to the log in page 
    }
  }




//validation function




  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "at least 3 char")
      .max(15, "maximum 15 characters"),
    email: Yup.string().email("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")  // matching the password with a certain regex 
      .required("password is required"),
    rePassword: Yup.string()
      .required("password is required")
      .oneOf([Yup.ref("password")], "rePassword must be matches "),    // comparing between the password and the re-password
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "invalid phone"),  // matching the phone number with a egyptian numbers 
  });









  let formik = useFormik({     // to handle the whole form together 
    initialValues: {   // the shape of the values as the backend demand 
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,     // the validation of the Yup at submitting 
    onSubmit: (values) => register(values),        // when submitting call register function with values as parameter
  });

  console.log(formik);

  return (
    <>
      <div className="container my-5">
        <h3>Register Now:</h3>

        {errorMessage ? (     // printing the errors which is sent from backend 
          <div className="alert alert-danger">{errorMessage}</div>
        ) : (
          ""
        )}

        <div className="w-75 mx-auto py-5">
          <form onSubmit={formik.handleSubmit}>



            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control mb-2"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}     // handling the change in the input  
              onBlur={formik.handleBlur}   // handling when the user get out from the inputs 
            />

            {formik.errors.name && formik.touched.name ? (  // printing the errors when existed (and) touching the inputs
              <div className="alert alert-danger">{formik.errors.name}</div>
            ) : (
              ""
            )}




            <label htmlFor="email">email:</label>
            <input
              type="email"
              className="form-control mb-2"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}

            <label htmlFor="password">password:</label>
            <input
              type="password"
              className="form-control mb-2"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}

            <label htmlFor="rePassword">rePassword:</label>
            <input
              type="password"
              className="form-control mb-2"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger">
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="phone">phone:</label>
            <input
              type="tel"
              className="form-control mb-2"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger">{formik.errors.phone}</div>
            ) : (
              ""
            )}
            {isLoading ? (    // if the loading true print spinner else print the button
              <button className="btn btn-success ">
                <i className="fa fa-spin fa-spinner "></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                className="btn btn-success "
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
