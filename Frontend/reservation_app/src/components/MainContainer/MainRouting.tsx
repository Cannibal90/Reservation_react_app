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
import ReservationManagementPage from "../Pages/ReservationManagementPage/ReservationManagementPage";
import LaboratoryManagementPage from "../Pages/LaboratoryManagementPage/LaboratoryManagementPage";
import { UnautorizedPage } from "../Pages/UnauthorizedPage/UnauthorizedPage";

const MainRouting = () => {
  const isLogged = localStorage.getItem("isLogged") === "true" ? true : false;
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userRole = user ? user.role : "";

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
        {isLogged ? <DeskMap /> : <UnautorizedPage />}
      </Route>
      <Route path="/classroom">
        {isLogged ? <LaboratoryRoomMap /> : <UnautorizedPage />}
      </Route>
      <Route path="/reserve/station/:id/:startDate?/:endDate?">
        {isLogged ? <ReservationPage /> : <UnautorizedPage />}
      </Route>
      <Route path="/account/reservations">
        {isLogged ? <UserReservationsPage /> : <UnautorizedPage />}
      </Route>
      <Route path="/account/management">
        {isLogged ? <AccountManagement /> : <UnautorizedPage />}
      </Route>
      <Route path="/management/users">
        {userRole && userRole === "ROLE_ADMIN" ? (
          <UserManagementPage />
        ) : (
          <UnautorizedPage />
        )}
      </Route>
      <Route path="/management/reservations">
        {userRole && userRole === "ROLE_ADMIN" ? (
          <ReservationManagementPage />
        ) : (
          <UnautorizedPage />
        )}
      </Route>
      <Route path="/management/laboratory">
        {userRole && userRole === "ROLE_ADMIN" ? (
          <LaboratoryManagementPage />
        ) : (
          <UnautorizedPage />
        )}
      </Route>
      <Route path="/management">
        {userRole && userRole === "ROLE_ADMIN" ? (
          <ManagementPage />
        ) : (
          <UnautorizedPage />
        )}
      </Route>
      <Redirect from="/*" to="/startpage" />
    </Switch>
  );
};

export default MainRouting;
