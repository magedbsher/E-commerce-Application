import React from "react";
import { useFormik,Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();

  async function login(values) {  // login function 
    console.log("hey from login", values);
    setIsLoading(true);
    setErrorMessage(null);   // clean  the error message
    let {data}   = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)    // sending the values of the login inputs to the backend  
   .catch((err) => {              //catching the error response
    console.log("after api")


        setIsLoading(false);    //turning off the loading 
        console.log(data);

        setErrorMessage(err.response.data.message);  // catch error message
        
      });



    if (data.message === "success") {
      setIsLoading(false);  // turn off loading 
      localStorage.setItem("userToken", data.token);
      saveUser();
      //console.log("bteee5");
      navigate("/home"); // navigate to home page
    }
  }

  let mySchema = Yup.object({   // validation by Yup
    email: Yup.string()
      .email("email is required")
      .required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema, // check the validation before submit
    onSubmit: (values) => login(values),  // submit form with input values
  });

  return (
    <>
      <div className="container my-5">
        <h3>Login Now</h3>

        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : (
          ""
        )}

        <div className="w-75 mx-auto py-5">
          <form onSubmit={formik.handleSubmit}>
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

            {isLoading ? (
              <button className="btn btn-success " type="submit">
                <i className="fa fa-spin fa-spinner "></i>
              </button>
            ) : (
              <button type="submit" className="btn btn-success ">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
