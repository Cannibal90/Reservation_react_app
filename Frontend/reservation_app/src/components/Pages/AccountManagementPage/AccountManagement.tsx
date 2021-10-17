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
    username: "",
    email: "",
    role: "",
    name: "",
    surname: "",
    age: "",
    city: "",
    oldPassword: "",
    newPassword: "",
  });

  const [password, setPassword] = useState<UserPassword>({
    oldPassword: "",
    newPassword: "",
  });

  const userService = new UserService();

  const validateFields = () => {
    return Boolean(
      userInfo.username.length < 2 ||
        userInfo.email.length < 2 ||
        !userInfo.role.length ||
        !userInfo.detailId ||
        userInfo.name.length < 2 ||
        userInfo.surname.length < 2 ||
        userInfo.city.length < 2 ||
        userInfo.age < 1
    );
  };

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

  const onUserInfoChange = (event: any) => {
    if (event.target.name === "age") {
      checkNumberFields(event);
    } else {
      checkTextFields(event);
    }

    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
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
    //TODO message with agreement
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

  const updateUser = () => {
    if (!validateFields()) {
      userService.updateUser(userInfo, userId).then((response) => {
        if (response) {
          let newUser = createUser(response);
          setUserInfo(newUser);
          store.dispatch(
            showMessage({
              message: "User updated successfully",
              type: "success",
            })
          );
        }
      });
    } else {
      store.dispatch(
        showMessage({ message: "Invalid user info", type: "warning" })
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Paper className="management-paper">
        <Typography variant="h5" component="div">
          Change user credentials
        </Typography>
        <Grid container rowGap={2}>
          <Grid item xs={5} style={{ marginRight: "50px" }}>
            <TextField
              variant="standard"
              fullWidth
              label="Username"
              name="username"
              value={userInfo.username}
              helperText={validationMessages.username}
              onChange={(event) => onUserInfoChange(event)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Email"
              name="email"
              value={userInfo.email}
              helperText={validationMessages.email}
              onChange={(event) => onUserInfoChange(event)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Role"
              name="role"
              disabled={true}
              value={userInfo.role === "ROLE_ADMIN" ? "ADMIN" : "USER"}
              helperText={validationMessages.role}
              onChange={(event) => onUserInfoChange(event)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="City"
              name="city"
              value={userInfo.city}
              helperText={validationMessages.city}
              onChange={(event) => onUserInfoChange(event)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              variant="standard"
              fullWidth
              label="Name"
              name="name"
              value={userInfo.name}
              helperText={validationMessages.name}
              onChange={(event) => onUserInfoChange(event)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Surname"
              name="surname"
              value={userInfo.surname}
              helperText={validationMessages.surname}
              onChange={(event) => onUserInfoChange(event)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Age"
              name="age"
              value={userInfo.age}
              helperText={validationMessages.age}
              onChange={(event) => onUserInfoChange(event)}
            />
          </Grid>
        </Grid>
        <Button
          className="button-password"
          variant="contained"
          onClick={updateUser}
        >
          Save
        </Button>

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
