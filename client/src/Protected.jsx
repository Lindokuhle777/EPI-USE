import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MainContext } from "./MainContext";

function Protected({ children }) {
  const { user } = useContext(MainContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default Protected;
