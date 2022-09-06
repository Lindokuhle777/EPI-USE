import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MainContext } from "./MainContext";

//If the used if null then navigate to the login page

function Protected({ children }) {
  const { user } = useContext(MainContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default Protected;
