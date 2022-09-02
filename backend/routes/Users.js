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

router.get("/GetEmployees", async (req, res) => { //Get all employees
  const ref = collection(db, "Employees");
  const snap = await getDocs(ref);
  let tempDocs = [];
  snap.forEach((doc) => {
    tempDocs.push(doc.data());
  });

  res.send(tempDocs);
});

router.post("/Delete", async (req, res) => { //Delete Employee route
  const empNum = req.body.empNum; // empNum of the employee we must delete

  const ref = doc(db, "Employees", empNum);
  const emp = await getDoc(ref); // Current employee, the one we have to delete

  if (emp.exists()) {
    if (emp.data().children.length > 0) {
      for (let i = 0; i < emp.data().children.length; i++) {
        const curr = emp.data().children[i]; // empNum of the current child
        const childRef = doc(db, "Employees", curr);
        const child = await getDoc(childRef); // Get the child
        if (child.exists()) {
          //Set the manager of the child to the manager on the parent
          await updateDoc(childRef, { manager: emp.data().manager });
        }
      }
      // add the children of the currEmp to the children of the parent
      // also remove the currEmp from the children of the parent

      const parentRef = doc(db, "Employees", emp.data().manager);
      const parent = await getDoc(parentRef);

      if (parent.exists()) {
        const oldChildren = parent
          .data()
          .children.filter((child) => child !== emp.data().empNum); // remove the currEmp
        await updateDoc(parentRef, {
          children: [...oldChildren, ...emp.data().children],
        }); // add the children of the current child
      }

      await deleteDoc(ref);
    } else {
      const parentRef = doc(db, "Employees", emp.data().manager);
      const parent = await getDoc(parentRef);

      if (parent.exists()) {
        const oldChildren = parent
          .data()
          .children.filter((child) => child !== emp.data().empNum); // remove the currEmp
        await updateDoc(parentRef, { children: oldChildren });
      }
      await deleteDoc(ref);
    }
    res.send("Deleted");
  } else {
    //if that emp is not the in db.
    res.send("NotDeleted");
  }
});

router.post("/", async (req, res) => {
  //This route is for both the adding a new emp and editing emp info
  //If the emp is in the db, the we edit the info
  //If the emp is not in the db, then it's a new emp

  const empNum = req.body.empNum;
  const DOB = req.body.DOB;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const manager = req.body.manager;
  const salary = req.body.salary;
  const position = req.body.position;

  const ref = doc(db, "Employees", empNum);

  const snap = await getDoc(ref); //employee

  if (snap.exists()) {
    // edit
    let data = {
      first_name: firstName,
      last_name: lastName,
      email,
      salary,
      DOB,
      position,
      manager,
      empNum,
    };
    await updateDoc(ref, data);

    res.send(data); //send back the data sent to us.
  } else {
    //New
    const newEmpNum = uid(10); // Generate new empNup  using uid that in 10 characters long
    let data = {
      first_name: firstName,
      last_name: lastName,
      email,
      salary,
      DOB,
      position,
      children: [], // a new emp has no children
      empNum: newEmpNum,
      manager,
    };
    await setDoc(doc(db, "Employees", newEmpNum), data); //Add the new emp

	const managerRef = doc(db, "Employees", manager);
    const managerDoc = await getDoc(managerRef);
    await updateDoc(managerRef, {
      children: [...managerDoc.data().children, newEmpNum], // add the new emp to the list of children on the namanger
    });

    const newEmp = await getDoc(doc(db, "Employees", newEmpNum));

    res.send(newEmp.data()); // send back the data they sent with the empNum
  }
});

export default router;
