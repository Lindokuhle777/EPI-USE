import {
  Button,
  DialogContent,
  Stack,
  InputAdornment,
  DialogTitle,
  Avatar,
} from "@mui/material";
import React, { useEffect } from "react";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as YUP from "yup";
import Gravatar from "react-gravatar";
import CssTextField from "../CssTextField";

const fieldStyles = {
  marginTop: "5px",
};

// This component is for showing the user infomation form
// Handle's both editing employee information and adding a new used

function NewProfile({ mode, currProfile, onSubmit, setSelectedImage }) {


  const validation = YUP.object().shape({
    fistName: YUP.string().required("Required"),
    lastName: YUP.string().required("Required"),
    email: YUP.string().email("Enter valid email").required("Required"),
    position: YUP.string().required("Required"),
    DOB: YUP.string().required("Required"),
    salary: YUP.string().required("Required"),
  });

 

  const initialValues = {
    firstName: mode === "edit" ? currProfile.firstName : "",
    lastName: mode === "edit" ? currProfile.lastName : "",
    position: mode === "edit" ? currProfile.position : "",
    DOB: mode === "edit" ? new Date(currProfile.DOB) : "",
    salary: mode === "edit" ? currProfile.salary : "",
    email: mode === "edit" ? currProfile.email : "",
  };

  const handleImage = (event) => {
    currProfile.imageUrl = URL.createObjectURL(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
  };
  
  return (
    <>
      <DialogTitle
        style={{
          textAlign: "center",
          fontSize: "30px",
          backgroundColor: "rgba(0,0,0,0.06)",
        }}
      >
        {mode === "edit" ? "Edit profile" : "New Profile"}
      </DialogTitle>
      <DialogContent style={{ backgroundColor: "rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <div style={{ marginRight: "20px" }}>
              {mode === "edit" && (
                <div style={{ margin: 0 }}>
                  {currProfile.imageUrl === null && (
                    <Gravatar
                      email={currProfile.email}
                      size={200}
                      style={{
                        borderRadius: "50%",
                        margin: "auto auto",
                        display: "block",
                      }}
                    />
                  )}
                  {currProfile.imageUrl !== null && (
                    <img
                      alt="not fount"
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        margin: "auto auto",
                        display: "block",
                      }}
                      src={currProfile.imageUrl}
                    />
                  )}
                </div>
              )}
              {mode === "newEmp" && (
                <div>
                  {currProfile.imageUrl === null && (
                    <div
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        margin: "auto auto",
                        display: "block",
                      }}
                    >
                      <Avatar sx={{ width: 200, height: 200 }} />
                    </div>
                  )}

                  {currProfile.imageUrl !== null && (
                    <img
                      alt="not fount"
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        margin: "auto auto",
                        display: "block",
                      }}
                      src={currProfile.imageUrl}
                    />
                  )}
                </div>
              )}
            </div>
            <input
              type="file"
              name="myImage"
              onChange={handleImage}
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 3 }}
          >
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validation={validation}
            >
              {(props) => (
                <Form>
                  <Stack spacing={1}>
                    <Field
                      as={CssTextField}
                      label="First Name"
                      name="firstName"
                      type="text"
                      size="small"
                      required
                      style={fieldStyles}
                      helperText={<ErrorMessage name="firstName" />}
                    />
                    <Field
                      as={CssTextField}
                      label="Last Name"
                      name="lastName"
                      type="text"
                      required
                      size="small"
                      style={fieldStyles}
                      helperText={<ErrorMessage name="lastName" />}
                    />
                    <Field
                      as={CssTextField}
                      label="Email"
                      name="email"
                      type="email"
                      required
                      size="small"
                      style={fieldStyles}
                      helperText={<ErrorMessage name="email" />}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker
                      disableFuture
                      label="Date of birth"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      onChange={(value) => props.setFieldValue("DOB", value, true)}
                      value={props.values.DOB}

                      renderInput={(params) => <CssTextField size="small" name="DOB" {...params} />}
                    /></LocalizationProvider>

                    
                    
                    <Field
                       as={CssTextField}
                      label="Position"
                      name="position"
                      type="text"
                      size="small"
                      required
                      style={{...fieldStyles,marginTop:"8px"}}
                      helperText={<ErrorMessage name="position" />}
                    />
                    <Field
                      as={CssTextField}
                      label="Salary"
                      name="salary"
                      required
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R</InputAdornment>
                        ),
                      }}
                      size="small"
                      style={fieldStyles}
                      helperText={<ErrorMessage name="salary" />}
                    />
                    <Button
                      type="submit"
                      id="submitBtn"
                      style={{ display: "none" }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </>
  );
}

export default NewProfile;
