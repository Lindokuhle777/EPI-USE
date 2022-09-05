import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MainContext = createContext();
//Main Context
//handles google single sign on and provides the user to thr rest of the app
export const MainContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);



  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = async () => {
    await signOut(auth);
    const localStorage = window.localStorage;
    localStorage.getItem("user") !== null && localStorage.removeItem("user");
    setUser(null);
  };

  //getData. 
  // Fetches employee list from the backend
  const getData = async () => {
    if(employees.length===0){await axios.get("Employees/GetEmployees").then((response) => {
      setEmployees(response.data);
    })}
    
  }

  useEffect(() => {
    getData();
  }, [])


  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (currUser) => {
      const tempUser = window.localStorage.getItem("user");

      if (currUser) {
        setUser(currUser);
        navigate("/");
        
      } else if (tempUser) {
        const temp = JSON.parse(tempUser);
        setUser(temp);
        navigate("/");
       
      }else{
        setUser(null)
      }

    });
    return () => {
      subscribe();
    };
  }, []);


  return (
    <MainContext.Provider value={{  getData,logOut, user, setUser, logOut, googleSignIn, employees, setEmployees }}>
      {children}
    </MainContext.Provider>
  );
}