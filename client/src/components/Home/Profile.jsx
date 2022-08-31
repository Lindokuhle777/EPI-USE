import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextField, Stack,Box } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, Paper, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Slide from "@mui/material/Slide";
import Gravatar from "react-gravatar";
import { MainContext } from "../../MainContext";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Employee from "./Employee";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile({ open, handleClose, currProfile,setCurrProfile }) {
  const { employees,setEmployees } = useContext(MainContext);
  const [manager, setManager] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    currProfile &&
      setManager(
        employees.filter(
          (employee) => employee.empNum === currProfile.manager
        )[0]
      );
  }, [currProfile]);
  const handleEdit = async () => {
    setEdit(!edit);
    if (edit) {
      setLoading(true);
      //Check if any of the field were edited
      let data = {};
      let flag = false;


      if(document.getElementById("firstName").value !== currProfile.firstName){
        data.first_name = document.getElementById("firstName").value;
        flag=true;
      }
      if(document.getElementById("lastName").value !== currProfile.lastName){
        data.last_name = document.getElementById("lastName").value;
        flag = true;
      }
      if(document.getElementById("email").value !== currProfile.email){
        data.email = document.getElementById("email").value;
        flag = true;
      }
      if(document.getElementById("salary").value !== currProfile.salary){
        data.salary = document.getElementById("salary").value;
        flag = true;
      }

      
      if(flag){
        
       
        await axios.post("http://localhost:5000/Users/EditEmployee",{empNum:currProfile.empNum,data}).then(res=>{
          const newEmp = res.data;
          // console.log(newEmp);
          const first = employees.filter(employee => employee.empNum !== currProfile.empNum)
          setEmployees([...first,newEmp]);
          setCurrProfile(new Employee(newEmp));
          setLoading(false);
        }).catch(err=>{
          console.log(err)
        })
        
      }
      setLoading(false);

    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
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
              {edit ? (
                <>
                  <Stack
                    component="form"
                    spacing={1}
                    noValidate
                    autoComplete="off"
                  >
                    <Typography variant="h6">Edit Profile</Typography>
                    <TextField
                      id="firstName"
                      size="small"
                      placeholder="First Name"
                      variant="standard"
                      defaultValue={currProfile?.firstName}
                    />
                    <TextField
                      id="lastName"
                      size="small"
                      placeholder="Last Name"
                      variant="standard"
                      defaultValue={currProfile?.lastName}
                    />
                    <TextField
                      id="DOB"
                      size="small"
                      type="date"
                      placeholder="Date Of Birth"
                      variant="standard"
                      defaultValue={currProfile?.DOB}
                    />
                    <TextField
                      id="email"
                      size="small"
                      placeholder="Email"
                      variant="standard"
                      defaultValue={currProfile?.email}
                    />
                    <TextField
                      id="salary"
                      size="small"
                      placeholder="salary"
                      variant="standard"
                      defaultValue={currProfile?.salary}
                    />
                  </Stack>
                </>
              ) : (
                <>
                  <Typography variant="h5">
                    {currProfile?.firstName + " " + currProfile?.lastName}
                  </Typography>

                  <Typography variant="h5">
                    {currProfile?.DOB}
                  </Typography>

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
                </>
              )}
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
            {loading? <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>:<Button onClick={handleEdit}>{edit ? "Save" : "Edit"}</Button>}
          
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
