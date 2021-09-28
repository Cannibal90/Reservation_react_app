import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import StartPage from "../Pages/Startpage/Startpage";

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
      <Redirect from="/*" to="/startpage" />
    </Switch>
  );
};

export default MainRouting;
