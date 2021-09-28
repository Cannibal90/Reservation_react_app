import React from "react";
import "./MainContainer.css";
import MainRouting from "./MainRouting";

const MainContainer = () => {
  return (
    <div className="background-container ">
      <div className="main-container">
        <MainRouting />
      </div>
    </div>
  );
};

export default MainContainer;
