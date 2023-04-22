import React from "react";
import styles from "./ProtectRoutes.module.css";
import { Navigate } from "react-router-dom";


export default function ProtectRoutes(props) {
  //console.log(props);
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
