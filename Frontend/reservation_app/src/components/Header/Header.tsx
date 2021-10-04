import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { AccountCircle } from "@mui/icons-material";
import { Container, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [el, setEl] = useState(false);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
    setEl(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEl(false);
  };

  const logOut = () => {
    setAnchorEl(null);
    setEl(false);
    localStorage.clear();
    window.location.pathname = "/";
  };

  const menuItems = [
    {
      name: "Register",
      link: "/register",
      logged: false,
      function: handleClose,
    },
    {
      name: "Login",
      link: "/login",
      logged: false,
      function: handleClose,
    },
    {
      name: "Account",
      link: "/myaccount",
      logged: true,
      function: handleClose,
    },
    {
      name: "Log out",
      link: "/startpage",
      logged: true,
      function: logOut,
    },
  ];
  const isLogged = localStorage.getItem("isLogged") === "true" ? true : false;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Container sx={{ flexGrow: 1 }} className="toolbar-container">
            {" "}
            <Button
              size="large"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Link className="link" to="/reservations">
                Moje rezerwacje
              </Link>
            </Button>
            <Button
              size="large"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Link className="link" to="/classroom">
                Zarezerwuj
              </Link>
            </Button>
            <Button
              size="large"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Link className="link" to="/management">
                Zarzadzanie
              </Link>
            </Button>{" "}
          </Container>

          <IconButton
            className="icon-container"
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            className="menu"
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={el}
            onClose={handleClose}
          >
            {menuItems
              .filter((i) => i.logged === isLogged)
              .map((item) => {
                return (
                  <Link to={item.link}>
                    <MenuItem className="menu-item" onClick={item.function}>
                      {item.name}
                    </MenuItem>
                  </Link>
                );
              })}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
