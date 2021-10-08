import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LaboratoryRoomMap from "../Pages/Laboratory/LaboratoryRoomMap";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import StartPage from "../Pages/Startpage/Startpage";
import DeskMap from "../Pages/DeskMap/DeskMap";

const MainRouting = () => {
  return (
    <Switch>
      <Route path="/startpage">
        <StartPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/classroom/:id">
        <DeskMap />
      </Route>
      <Route path="/classroom">
        <LaboratoryRoomMap />
      </Route>
      <Redirect from="/*" to="/startpage" />
    </Switch>
  );
};

export default MainRouting;
