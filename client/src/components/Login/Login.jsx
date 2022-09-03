import {
  Button,
  CssBaseline,
  Divider,
  Paper,
  TextField,
  Typography,
  Snackbar
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../../MainContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as YUP from "yup";
import { useNavigate } from "react-router-dom";
import NewAccount from "./NewAccount";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';

//Login Page

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const btnStyle = {
  marginLeft: "10%",
  marginRight: "10%",
  marginTop: "5%",
};

const fieldStyles = {
  marginTop: "3%",
  marginLeft: "5%",
  marginRight: "5%",
};


const paperStyle = {
  width: "30%",
  margin: "0",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "30px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

const mainDiv = {
  position: "absolute",
  width: "100%",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.1)",

};

function Login() {

  const { googleSignIn,setUser } = useContext(MainContext);
  const [messageType, setMessageType] = useState(null);


  const [signUp, setSignUp] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const OpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const CloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, props) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    await axios.post("Users/Login", data).then((res) => {
      if (res.data.message === "correct") {
        // all good, move to the next page

        setUser({ email: data.email, displayName: res.data.name});
        setMessageType({message: "Logged in",type:"success"});
        window.localStorage.setItem("user",JSON.stringify({ email: data.email, displayName: res.data.name}));
        OpenSnackbar();
        navigate("/");
        props.resetForm();
      } else {
        // no account
        setMessageType({message: "Incorrect credentials",type:"error"});
        OpenSnackbar();
        setOpenSnackbar(true);
        props.resetForm();  
      }
    });

  };

  const validation = YUP.object().shape({
    email: YUP.string().email("Enter valid email").required(),
    password: YUP.string().required("Required"),
  });

  const handleNewAccount = (event) => {
    event.preventDefault();
    setSignUp(!signUp);
  };


  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      await googleSignIn();
    } catch (err) {

    }
  };

  return (
    <div style={mainDiv}>

      {signUp ? (
        <NewAccount handleNewAccount={handleNewAccount} OpenSnackbar={OpenSnackbar} setMessageType={setMessageType} />
      ) : (
        <Paper elevation={15} style={paperStyle}>
          <CssBaseline />
          <Typography
            variant="h4"
            style={{
              marginTop: "5%",
              color: "#115571",
            }}
          >
            LOGIN
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validation={validation}
          >
            {(props) => (
              <Form style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  type="email"
                  size="small"
                  style={fieldStyles}
                  helperText={<ErrorMessage name="email" />}
                />

                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  size="small"
                  style={fieldStyles}
                  helperText={<ErrorMessage name="password" />}
                />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#31AFB4",
                    width: "50%",
                    margin: "3% auto",
                  }}
                  variant="contained"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <div>
            <Typography variant="overline">Don't have an account?</Typography>
            <Button
              variant="text"
              style={{ color: "#115571" }}
              size="small"
              onClick={handleNewAccount}
            >
              Sign in
            </Button>
          </div>
          <Divider>OR</Divider>
          <Button
            style={{ ...btnStyle, backgroundColor: "#31AFB4", color: "white" }}
            onClick={handleGoogleSignIn}
            variant="outlined"
          >
            sign in with Google
          </Button>

        </Paper>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={CloseSnackbar}>
        <Alert onClose={CloseSnackbar} severity={messageType?.type} sx={{ width: '100%' }}>
          {messageType?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
