import React, { useState, useEffect } from "react";
import { ReservationResponse } from "../../../models/ReservationInterfaces";
import { ReservationService } from "../../../services/reservation/reservationService";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import "./UserReservationPage.css";

const UserReservationsPage = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const id = user ? user.id : 0;

  const reservationService = new ReservationService();

  const fetchAllReservationsForUser = () => {
    reservationService.getReservationForUser(id).then((response) => {
      setReservations(response);
    });
  };

  const onReservationDelete = (value: any) => {
    reservationService.deleteReservation(value).then(() => {
      fetchAllReservationsForUser();
    });
  };

  useEffect(() => {
    fetchAllReservationsForUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ width: "80%", margin: "20px auto" }}
      >
        <Typography variant="h3" component="div" className="title">
          All reservations
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header border">Id</TableCell>
              <TableCell className="header border">Start Date</TableCell>
              <TableCell className="header border">End Date</TableCell>
              <TableCell className="header border">Station Id</TableCell>

              <TableCell className="header border"></TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reservations &&
              reservations.map((reservation) => (
                <TableRow key={reservation.id} className="row">
                  <TableCell className="cell_item">{reservation.id}</TableCell>
                  <TableCell className="cell_item">
                    {new Date(
                      reservation.durration.beginning
                    ).toLocaleDateString() +
                      " " +
                      new Date(
                        reservation.durration.beginning
                      ).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="cell_item">
                    {new Date(reservation.durration.end).toLocaleDateString() +
                      " " +
                      new Date(reservation.durration.end).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="cell_item">
                    {reservation.stationId}
                  </TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      onClick={() => onReservationDelete(reservation.id)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link
                      to={`/reserve/station/${reservation.stationId}/${reservation.durration.beginning}/${reservation.durration.end}`}
                    >
                      <EditIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserReservationsPage;
