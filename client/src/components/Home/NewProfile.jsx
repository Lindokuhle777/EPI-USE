import {
  Button,
  DialogContent,
  Typography,
  TextField,
  Stack,
  InputAdornment,
} from "@mui/material";
import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as YUP from "yup";
import { MainContext } from "../../MainContext";

const fieldStyles = {
  marginTop: "5px",
};

function NewProfile({mode,currProfile,onSubmit}) {
  const { user } = useContext(MainContext);
  

  const validation = YUP.object().shape({
    fistName: YUP.string().required("Required"),
    lastName: YUP.string().required("Required"),
    email: YUP.string().email("Enter valid email").required("Required"),
    position: YUP.string().required("Required"),
    DOB: YUP.string().required("Required"),
    salary: YUP.string().required("Required"),
  });

  const initialValues = {
    firstName:mode==="edit"?currProfile.firstName:"",
    lastName: mode==="edit"?currProfile.lastName:"",
    position: mode==="edit"?currProfile.position:"",
    DOB: mode==="edit"?currProfile.DOB:"",
    salary: mode==="edit"?currProfile.salary:"",
    email: mode==="edit"?currProfile.email:"",
  };

  return (
    <DialogContent>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Image</div>
          <Button size="small">upload image</Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography gutterBottom>New Profile</Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validation={validation}
          >
            {(props) => (
              <Form>
                <Stack spacing={1}>
                  <Field
                    as={TextField}
                    label="First Name"
                    name="firstName"
                    type="text"
                    size="small"
                    required
                    style={fieldStyles}
                    helperText={<ErrorMessage name="firstName" />}
                  />
                  <Field
                    as={TextField}
                    label="Last Name"
                    name="lastName"
                    type="text"
                    required
                    size="small"
                    style={fieldStyles}
                    helperText={<ErrorMessage name="lastName" />}
                  />
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    type="email"
                    required
                    size="small"
                    style={fieldStyles}
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    label="Birth Date"
                    name="DOB"
                    type="text"
                    size="small"
                    required
                    style={fieldStyles}
                    helperText={<ErrorMessage name="DOB" />}
                  />
                  <Field
                    as={TextField}
                    label="Position"
                    name="position"
                    type="text"
                    size="small"
                    required
                    style={fieldStyles}
                    helperText={<ErrorMessage name="position" />}
                  />
                  <Field
                    as={TextField}
                    label="Salary"
                    name="salary"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">kg</InputAdornment>
                      ),
                    }}
                    size="small"
                    style={fieldStyles}
                    helperText={<ErrorMessage name="salary" />}
                   
                  />
                   <Button type="submit" id="submitBtn" style={{ display: "none"}}>Submit</Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </DialogContent>
  );
}

export default NewProfile;
