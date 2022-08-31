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
import { uid } from "uid";

const router = express.Router();

router.post("/NewUser", async (req, res) => {
  // console.log(req.body)
  const manEmpNum = req.body.manEmpNum;
  const position = req.body.position;
  const data = req.body.data;

  let empNums = [];

  for (let i = 0; i < data.length; i++) {
    const curr = data[i];

    const ref = doc(db, "Employees", curr.empNum);
    empNums.push(curr.empNum);

    await setDoc(ref, { ...curr, position, children: [] });
  }

  if (manEmpNum !== "") {
    const ref = doc(db, "Employees", manEmpNum);
    await updateDoc(ref, { children: empNums });
  }

  //   [
  //     "61-187-8491",
  //     "15-835-6612",
  //     "59-252-9308"
  // ]

  res.send(empNums);
});

router.get("/GetEmployees", async (req, res) => {
  const ref = collection(db, "Employees");
  const snap = await getDocs(ref);
  let tempDocs = [];
  snap.forEach((doc) => {
    tempDocs.push(doc.data());
  });

  res.send(tempDocs);
});

router.post("/EditEmployee", async (req, res) => {
  const empNum = req.body.empNum;
  const data = req.body.data;

  await updateDoc(doc(db, "Employees", empNum), data);

  const ref = doc(db, "Employees", empNum);
  const snap = await getDoc(ref);

  res.send(snap.data());
});

export default router;
