import { Button } from "@mui/material";
import React from "react";
import "./Startpage.css";

const StartPage = () => {
  return (
    <>
      <div className="title-container">
        <h2 className="main-title">Zarezerwuj swoje stanowisko juz teraz! </h2>
      </div>
      <div className="button-container">
        <Button
          className="main-button"
          variant="contained"
          size="large"
          component="div"
        >
          Wybierz stanowisko
        </Button>
      </div>
    </>
  );
};

export default StartPage;
