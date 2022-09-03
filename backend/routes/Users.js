import express from "express";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";


const router = express.Router();

router.post("/Login", async (req, res) => { 
  const {email,password} = req.body;
  const ref = doc(db,"Users",email);
  const user = await getDoc(ref);
  if(user.exists()){
    if(user.data().password === password){
      res.send({message:"correct",name:user.data().name});
    }else{
      res.send({message:"incorrect"});
    }
  }else{
    res.send({message:"incorrect"});
  }
});

router.post("/NewAccount", async (req, res) => { 
  const {email,password,name} = req.body;
  const ref = doc(db,"Users",email);
  const user = await getDoc(ref);

  if(user.exists()){
    res.send("AccountAreadyCreated");

  }else{
    await setDoc(ref,{email,password,name});
    res.send("AccountCreated");
  }


  
});


export default router;
