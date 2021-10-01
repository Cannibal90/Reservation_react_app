import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { UserRegister } from "../../../models/UserInterfaces";
import { UserService } from "../../../services/user/userService";
import { showMessage } from "../../../store/actions/messageAction";
import { store } from "../../../store/store";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [userCredentials, setUserCredentials] = useState<UserRegister>({
    username: "",
    password: "",
    email: "",
    name: "",
    surname: "",
    age: 0,
    city: "",
  });
  const [validationMessages, setValidationMessages] = useState<any>({
    username: "",
    password: "",
    email: "",
    name: "",
    surname: "",
    age: "",
    city: "",
  });

  const userService = new UserService();

  const validateFields = () => {
    return Boolean(
      userCredentials.username.length < 2 ||
        userCredentials.password.length < 2 ||
        userCredentials.email.length < 2 ||
        userCredentials.name.length < 2 ||
        userCredentials.surname.length < 2 ||
        userCredentials.city.length < 2 ||
        userCredentials.age < 1
    );
  };

  const checkTextFields = (event: any) => {
    if (event.target.value.length < 2) {
      setValidationMessages({
        ...validationMessages,
        [event.target.name]: "Tekst musi zawierac minimum 2 znaki.",
      });
    } else {
      setValidationMessages({
        ...validationMessages,
        [event.target.name]: "",
      });
    }
  };

  const checkNumberFields = (event: any) => {
    if (event.target.value < 1) {
      setValidationMessages({
        ...validationMessages,
        [event.target.name]: "Wartosc musi byc wieksza od 0.",
      });
    } else {
      setValidationMessages({
        ...validationMessages,
        [event.target.name]: "",
      });
    }
  };

  const onRegister = () => {
    if (!validateFields()) {
      userService.register(userCredentials);
    } else {
      store.dispatch(
        showMessage({ message: "Invalid credentials", type: "warning" })
      );
    }
  };

  const onCredentialChange = (event: any) => {
    if (event.target.name === "age") {
      checkNumberFields(event);
    } else {
      checkTextFields(event);
    }

    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleNumber = (value: any) => {
    return value === 0 ? "" : String(value);
  };

  return (
    <Grid>
      <Paper elevation={10} className="signup-paper">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar className="avatar-color">
            <LockOutlined />
          </Avatar>
          <h2>Sign up</h2>
        </Grid>
        <Grid container rowGap={2}>
          <TextField
            variant="standard"
            fullWidth
            label="Username"
            name="username"
            placeholder="Enter username"
            value={userCredentials.username}
            helperText={validationMessages.username}
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Password"
            name="password"
            placeholder="Enter password"
            value={userCredentials.password}
            helperText={validationMessages.password}
            onChange={(event) => onCredentialChange(event)}
            type="password"
          />
          <TextField
            variant="standard"
            fullWidth
            label="Email"
            name="email"
            placeholder="Enter email"
            value={userCredentials.email}
            helperText={validationMessages.email}
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Name"
            name="name"
            placeholder="Enter name"
            value={userCredentials.name}
            helperText={validationMessages.name}
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Surname"
            name="surname"
            placeholder="Enter surname"
            value={userCredentials.surname}
            helperText={validationMessages.surname}
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Age"
            name="age"
            placeholder="Enter age"
            value={handleNumber(userCredentials.age)}
            helperText={validationMessages.age}
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="City"
            name="city"
            placeholder="Enter city"
            value={userCredentials.city}
            helperText={validationMessages.city}
            onChange={(event) => onCredentialChange(event)}
          />
          <Button
            type="submit"
            fullWidth
            className="sign-button"
            onClick={onRegister}
          >
            Sign up
          </Button>
          <Typography className="signin">
            You already have account?
            <Link to="/login" className="link-color">
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RegisterPage;
