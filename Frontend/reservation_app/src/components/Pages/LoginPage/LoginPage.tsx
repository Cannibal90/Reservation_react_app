import { LockOpenOutlined } from "@mui/icons-material";
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
import { UserLogin } from "../../../models/UserInterfaces";
import "./LoginPage.css";

const LoginPage = () => {
  const [userCredentials, setUserCredentials] = useState<UserLogin>({
    username: "",
    password: "",
  });

  const onCredentialChange = (event: any) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
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
          <Button type="submit" fullWidth className="sign-button">
            Sign in
          </Button>
          <Typography className="signup">
            Don't have account?
            <Link href="/register">Sign up</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
