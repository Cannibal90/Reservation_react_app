import { Container } from "@mui/material";
import React from "react";
import StartPage from "../Pages/startpage/Startpage";
import "./MainContainer.css";

const MainContainer = () => {
  return (
    <div className="background-container ">
      <div className="main-container">
        <StartPage />
      </div>
    </div>
  );
};

export default MainContainer;
