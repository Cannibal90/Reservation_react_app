import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { UserRegister } from "../../../models/UserInterfaces";
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

  const onCredentialChange = (event: any) => {
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
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Password"
            name="password"
            placeholder="Enter password"
            value={userCredentials.password}
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
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Name"
            name="name"
            placeholder="Enter name"
            value={userCredentials.name}
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Surname"
            name="surname"
            placeholder="Enter surname"
            value={userCredentials.surname}
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Age"
            name="age"
            placeholder="Enter age"
            value={handleNumber(userCredentials.age)}
            onChange={(event) => onCredentialChange(event)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="City"
            name="city"
            placeholder="Enter city"
            value={userCredentials.city}
            onChange={(event) => onCredentialChange(event)}
          />
          <Button type="submit" fullWidth className="sign-button">
            Sign up
          </Button>
          <Typography className="signin">
            You already have account?
            <Link href="/login">Sign in</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RegisterPage;
