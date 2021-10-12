import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Startpage.css";

const StartPage = () => {
  const isLogged = localStorage.getItem("isLogged") === "true" ? true : false;
  return (
    <>
      <div className="title-container">
        <h2 className="main-title">Reserve your computer station today!</h2>
      </div>
      <div className="button-container">
        <Link to={isLogged ? "/classroom" : "/login"}>
          <Button
            className="main-button"
            variant="contained"
            size="large"
            component="div"
          >
            Choose computer station
          </Button>
        </Link>
      </div>
    </>
  );
};

export default StartPage;
