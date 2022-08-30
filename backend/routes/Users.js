import express from "express";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "../firebase.js";

const router = express.Router();

router.post("/NewUser",(req, res) => {
    const manEmpNum = req.body.manEmpNum;
    const NewEmp = req.body.NewEmp;

    res.send("sure")
});

export default router;