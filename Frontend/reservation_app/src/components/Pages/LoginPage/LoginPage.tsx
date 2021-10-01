import { LockOpenOutlined } from "@mui/icons-material";
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
import { UserLogin } from "../../../models/UserInterfaces";
import { UserService } from "../../../services/user/userService";
import { showMessage } from "../../../store/actions/messageAction";
import { store } from "../../../store/store";
import "./LoginPage.css";

const LoginPage = () => {
  const [userCredentials, setUserCredentials] = useState<UserLogin>({
    username: "",
    password: "",
  });
  const [validationMessages, setValidationMessages] = useState<any>({
    username: "",
    password: "",
  });

  const userService = new UserService();

  const validateFields = () => {
    return Boolean(
      userCredentials.username.length < 2 || userCredentials.password.length < 2
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

  const onCredentialChange = (event: any) => {
    checkTextFields(event);
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const onLogin = () => {
    if (!validateFields()) {
      userService.loginUser(userCredentials);
    } else {
      store.dispatch(
        showMessage({ message: "Invalid credentials", type: "warning" })
      );
    }
  };

  return (
    <Grid>
      <Paper elevation={10} className="signin-paper">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar className="avatar-color">
            <LockOpenOutlined />
          </Avatar>
          <h2>Sign in</h2>
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
          <Button
            type="submit"
            fullWidth
            className="sign-button"
            onClick={onLogin}
          >
            Sign in
          </Button>
          <Typography>
            Don't have account?
            <Link to="/register" className="link-color">
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
