import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextField, Stack, Box } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, Paper, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Slide from "@mui/material/Slide";
import Gravatar from "react-gravatar";
import { MainContext } from "../../MainContext";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Employee from "./Employee";
import NewProfile from "./NewProfile";
import ShowChildren from "./ShowChildren";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile({
  open,
  handleClose,
  currProfile,
  setCurrProfile,
  forceUpdate,
}) {
  const { employees, setEmployees } = useContext(MainContext);
  const [manager, setManager] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProfile, setNewProfile] = useState(false);
  const [mode, setMode] = useState(null);
  // the mode can be either newEmp,edit,showChildren or null

  const getChildren = (childrenArr) => {
    //Given the children array on empNums
    // return Employee objects

    let output = [];
    childrenArr.map((empNums) => {
      let child = employees.filter((item) => item.empNum === empNums)[0]; // Current child
      // console.log(child);
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
      .post("http://localhost:5000/Users/Delete", {
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
    if (mode === "edit") {
      values.manager = manager.empNum;
      values.empNum = currProfile.empNum;
    } else if (mode === "newEmp") {
      values.manager = currProfile.empNum;
      values.empNum = "null";
    }

    console.log(values);
    setLoading(true);
    await axios
      .post("http://localhost:5000/Users/", values)
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
    // document.getElementById("dummyBtn").click();
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
        <Button
          id="dummyBtn"
          onClick={forceUpdate}
          style={{ display: "none" }}
        >
          dummy
        </Button>
        {mode === null && (
          <DialogContent>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Gravatar
                email={currProfile?.email}
                size={150}
                style={{ borderRadius: "50%", margin: 0 }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "15px",
                }}
              >
                <Typography variant="h5">
                  {currProfile?.firstName + " " + currProfile?.lastName}
                </Typography>

                <Typography variant="h5">{currProfile?.DOB}</Typography>

                <Typography variant="subtitle1">
                  {currProfile?.position}
                </Typography>

                <Typography variant="subtitle1">
                  {currProfile?.email}
                </Typography>
                <Typography variant="subtitle1">
                  {currProfile?.salary}
                </Typography>
                {manager && (
                  <Typography variant="subtitle1">
                    {"Managed by " +
                      manager?.first_name +
                      " " +
                      manager?.last_name}
                  </Typography>
                )}
              </div>
            </div>
          </DialogContent>
        )}

        {mode === "edit" && 
          <NewProfile
            mode={mode}
            currProfile={currProfile}
            handleSave={handleSave}
            onSubmit={onSubmit}
          />
        }

        {mode === "newEmp" && 
          <NewProfile
            mode={mode}
            currProfile={currProfile}
            handleSave={handleSave}
            onSubmit={onSubmit}
          />
        }

        {mode === "showChildren" && (
          <ShowChildren childrenArr={getChildren(currProfile.children)} />
        )}
        <Divider />

        <DialogActions>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {mode !== null && <Button onClick={()=>setMode(null)} >Profile</Button>}
              {mode === null && (
                <>
                
                  <Button onClick={() => handleMode("edit")}>Edit</Button>
                  <Button onClick={() => handleMode("newEmp")}>
                    New Employee
                  </Button>
                  <Button onClick={handleDelete}>Delete</Button>
                  <Button onClick={() => handleMode("showChildren")}>
                    Children
                  </Button>
                </>
              )}

              {mode === "edit" && <Button onClick={handleSave}>Save</Button>}
              {mode === "newEmp" && <Button onClick={handleSave}>Save</Button>}
              


              <Button onClick={handleClose2}>close</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
