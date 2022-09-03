import React, { useContext, useState, useEffect } from "react";
import {
  Divider,
  Box,
  Slide,
  Button,
  Dialog,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { MainContext } from "../../MainContext";
import axios from "axios";
import Employee from "./Employee";
import NewProfile from "./NewProfile";
import { storage } from "../../firebase.js";
import ShowChildren from "./ShowChildren";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import ShowProfile from "./ShowProfile";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const btnStyle = {
  color: "black",
  border: "2px solid black",
  zIndex: "3",
};

export default function Profile({
  open,
  handleClose,
  currProfile,
  setCurrProfile,
  forceUpdate,
}) {
  const { employees, setEmployees, user } = useContext(MainContext);
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // the mode can be either newEmp,edit,showChildren or null
  // newEmp and edit show the NewProfile component
  // null shows the profile

  const getChildren = (childrenArr) => {
    //Given the children array on empNums
    // return Employee objects

    let output = [];
    childrenArr.map((empNums) => {
      let child = employees.filter((item) => item.empNum === empNums)[0]; // Current child
      output.push(new Employee(child));
    });

    return output;
  };

  const handleMode = (mode) => {
    setMode(mode);
  };

  const handleSave = () => {
    document.getElementById("submitBtn").click();
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    setLoading(true);
    await axios
      .post("/Employees/Delete", {
        empNum: currProfile.empNum,
      })
      .then((res) => {
        if (res.data == "Deleted") {
          setLoading(false);
          forceUpdate();
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (values, props) => {
    // onSubmit for the profile form

    if (mode === "edit") {
      values.manager = manager.empNum;
      values.empNum = currProfile.empNum;
    } else if (mode === "newEmp") {
      values.manager = currProfile.empNum;
      values.empNum = "null";
    }

    // Save the image in farebase storage then get the download url and save it in the db
    setLoading(true);
    if (selectedImage !== null) {
      const storageRef = ref(storage, `/Pictures/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);
      let downloadUrl = await getDownloadURL(
        ref(storage, `/Pictures/${selectedImage.name}`)
      );
      values.imageUrl = downloadUrl;
    }

    await axios
      .post("/Employees/", values)
      .then((res) => {
        const newEmp = res.data;
        if (mode === "edit") {
          newEmp.children = currProfile.children;
        }
        const temp = employees.filter((item) => item.empNum !== newEmp.empNum);

        setLoading(false);
        setMode(null);
        setCurrProfile(new Employee(newEmp));
        setEmployees([...temp, newEmp]);
      })
      .catch((err) => console.error(err));
  };

  const handleClose2 = (e) => {
    e.preventDefault();
    handleClose();
    setMode(null);
  };

  useEffect(() => {
    currProfile &&
      setManager(
        employees.filter(
          (employee) => employee.empNum === currProfile.manager
        )[0]
      );
  }, [currProfile]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <Button id="dummyBtn" onClick={forceUpdate} style={{ display: "none" }}>
          dummy
        </Button>
        {mode === null && (
          <ShowProfile currProfile={currProfile} manager={manager} />
        )}

        {(mode === "edit" || mode === "newEmp") && (
          <NewProfile
            mode={mode}
            currProfile={currProfile}
            handleSave={handleSave}
            onSubmit={onSubmit}
            setSelectedImage={setSelectedImage}
          />
        )}

        {mode === "showChildren" && (
          <ShowChildren childrenArr={getChildren(currProfile.children)} />
        )}

        <Divider />

        {user?.email === currProfile?.email && (
          <DialogActions style={{ padding: "10px" }}>
            {loading ? (
              <Box sx={{ display: "flex", margin: "auto auto" }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {mode !== null && (
                  <Button style={btnStyle} onClick={() => setMode(null)}>
                    Profile
                  </Button>
                )}
                {mode === null && (
                  <>
                    <Button style={btnStyle} onClick={() => handleMode("edit")}>
                      Edit
                    </Button>
                    <Button
                      style={btnStyle}
                      onClick={() => handleMode("newEmp")}
                    >
                      New Employee
                    </Button>
                    <Button style={btnStyle} onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button
                      style={btnStyle}
                      onClick={() => handleMode("showChildren")}
                    >
                      Children
                    </Button>
                  </>
                )}

                {(mode === "edit" || mode === "newEmp") && (
                  <Button style={btnStyle} onClick={handleSave}>
                    Save
                  </Button>
                )}

                <Button style={btnStyle} id="closeBtn" onClick={handleClose2}>
                  close
                </Button>
              </>
            )}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
