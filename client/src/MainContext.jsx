import React,{createContext,useContext,useState,useEffect} from 'react';
import {auth} from './firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const MainContext = createContext();

const tempData = [
  {
    id: 1,
    firstName: "sabelo",
    position: "CEO",
    empNum: 1230002,
    manager: "565",
    children: [123, 132, 4242],
  },
  {
    id: 2,
    firstName: "lindo",
    position: "pos2",
    empNum: 123,
    manager: 1230002,
    children: [987, 165],
  },
  {
    id: 3,
    firstName: "Ntokozo",
    position: "pos3",
    empNum: 132,
    manager: 1230002,
    children: [2356],
  },
  {
    id: 4,
    firstName: "Zanele",
    position: "pos4",
    empNum: 4242,
    manager: 1230002,
    children: [],
  },
  {
    id: 5,
    firstName: "Natasha",
    position: "pos5",
    empNum: 987,
    manager: 123,
    children: [],
  },
  {
    id: 6,
    firstName: "Mandla",
    position: "pos5",
    empNum: 165,
    manager: 123,
    children: [],
  },
  {
    id: 7,
    firstName: "Lungisa",
    position: "pos7",
    empNum: 2356,
    manager: 132,
    children: [6599],
  },
  {
    id: 8,
    firstName: "Luyanda",
    position: "pos8",
    empNum: 6599,
    manager: 2356,
    children: [],
  },
];

export const MainContextProvider = ({children})=>{
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [employees,setEmployees] = useState([]);



    const googleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
    };
  
    const logOut = async () => {
      await signOut(auth);
      const localStorage = window.localStorage;
      localStorage.getItem("user")!==null && localStorage.removeItem("user");
      setUser(null);
    };

    const getData = async () => {
      await axios.get("Employees/GetEmployees").then((response) => {
        setEmployees(response.data)
      })
    }

    useEffect(() => {
      
      getData();
    },[])

    useEffect(() => {
      const tempUser = window.localStorage.getItem("User");
      if(tempUser!==null) {
        const temp = JSON.parse(tempUser);
        setUser(temp);
        navigate("/");
      }
    },[])

  
    useEffect(() => {
      const subscribe = onAuthStateChanged(auth, async(currUser) => {
        setUser(currUser);
        if(currUser){
          navigate("/");
        }
      });
      return () => {
        subscribe();
      };
    }, []);
  

    return (
        <MainContext.Provider value={{logOut, user,setUser,logOut,googleSignIn,employees,setEmployees }}>
          {children}
        </MainContext.Provider>
      );
}