import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import {
  UserRequest,
  UserPassword,
  UserResponse,
} from "../../../models/UserInterfaces";
import "./AccountManagement.css";
import { UserService } from "../../../services/user/userService";
import { store } from "../../../store/store";
import { showMessage } from "../../../store/actions/messageAction";
import UserPaper from "../../UserPaper/UserPaper";

const AccountManagement = () => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userId = user ? user.id : 0;

  const [userInfo, setUserInfo] = useState<UserRequest>({
    username: "",
    email: "",
    role: "",
    detailId: 0,
    name: "",
    surname: "",
    age: 0,
    city: "",
  });
  const [validationMessages, setValidationMessages] = useState<any>({
    oldPassword: "",
    newPassword: "",
  });

  const [password, setPassword] = useState<UserPassword>({
    oldPassword: "",
    newPassword: "",
  });

  const userService = new UserService();

  const validatePassword = () => {
    return Boolean(
      password.oldPassword.length < 2 || password.newPassword.length < 2
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

  const onPasswordChange = (event: any) => {
    checkTextFields(event);

    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  const createUser = (data: UserResponse) => {
    return {
      username: data?.username || "",
      email: data?.email || "",
      role: data?.role || "",
      detailId: data?.userDetails.id || 0,
      name: data?.userDetails.name || "",
      surname: data?.userDetails.surname || "",
      age: data?.userDetails.age || 0,
      city: data?.userDetails.city || "",
    };
  };

  const fetchUser = () => {
    userService.getUserById(userId).then((response) => {
      if (response) {
        let newUser = createUser(response);
        setUserInfo(newUser);
      }
    });
  };

  const deleteUser = () => {
    userService.deleteUserById(userId).then(() => {
      localStorage.clear();
      window.location.pathname = "/";
    });
  };

  const changePassword = () => {
    if (!validatePassword()) {
      userService.changePassword(password, userId).then((response) => {
        let newPassword = {
          oldPassword: "",
          newPassword: "",
        };
        setPassword(newPassword);
        store.dispatch(
          showMessage({
            message: "User password changed successfully",
            type: "success",
          })
        );
      });
    } else {
      store.dispatch(
        showMessage({ message: "Invalid password", type: "warning" })
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <UserPaper userData={userInfo} userId={userId} drawer={false} />
      <Paper className="management-paper">
        <Typography variant="h5" component="div">
          Change user password
        </Typography>
        <Grid container rowGap={2}>
          <Grid item xs={5} style={{ marginRight: "50px" }}>
            <TextField
              type="password"
              variant="standard"
              fullWidth
              label="Old password"
              name="oldPassword"
              value={password.oldPassword}
              helperText={validationMessages.oldPassword}
              onChange={(event) => onPasswordChange(event)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="password"
              variant="standard"
              fullWidth
              label="New password"
              name="newPassword"
              value={password.newPassword}
              helperText={validationMessages.newPassword}
              onChange={(event) => onPasswordChange(event)}
            />
          </Grid>
        </Grid>
        <Button
          className="button-password"
          variant="contained"
          onClick={changePassword}
        >
          Change password
        </Button>

        <Typography variant="h5" component="div">
          Delete account
        </Typography>
        <Button
          className="button-management"
          variant="contained"
          onClick={deleteUser}
        >
          Delete
        </Button>
      </Paper>
    </>
  );
};

export default AccountManagement;
