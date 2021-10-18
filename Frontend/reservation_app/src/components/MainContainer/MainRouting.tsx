import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LaboratoryRoomMap from "../Pages/Laboratory/LaboratoryRoomMap";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import StartPage from "../Pages/Startpage/Startpage";
import DeskMap from "../Pages/DeskMap/DeskMap";
import ReservationPage from "../Pages/ReservationPage/ReservationPage";
import UserReservationsPage from "../Pages/UserReservationsPage/UserReservationsPage";
import AccountManagement from "../Pages/AccountManagementPage/AccountManagement";
import ManagementPage from "../Pages/ManagementPage/ManagementPage";
import UserManagementPage from "../Pages/UserManagementPage/UserManagementPage";

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
      <Route path="/reserve/station/:id/:startDate?/:endDate?">
        <ReservationPage />
      </Route>
      <Route path="/account/reservations">
        <UserReservationsPage />
      </Route>
      <Route path="/account/management">
        <AccountManagement />
      </Route>
      <Route path="/management/users">
        <UserManagementPage />
      </Route>
      <Route path="/management/reservations">
        <UserManagementPage />
      </Route>
      <Route path="/management/laboratory">
        <ManagementPage />
      </Route>
      <Route path="/management">
        <ManagementPage />
      </Route>
      <Redirect from="/*" to="/startpage" />
    </Switch>
  );
};

export default MainRouting;
