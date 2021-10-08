import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Startpage.css";

const StartPage = () => {
  const isLogged = localStorage.getItem("isLogged") === "true" ? true : false;
  return (
    <>
      <div className="title-container">
        <h2 className="main-title">Zarezerwuj swoje stanowisko juz teraz! </h2>
      </div>
      <div className="button-container">
        <Link to={isLogged ? "/classroom" : "/login"}>
          <Button
            className="main-button"
            variant="contained"
            size="large"
            component="div"
          >
            Wybierz stanowisko
          </Button>
        </Link>
      </div>
    </>
  );
};

export default StartPage;
