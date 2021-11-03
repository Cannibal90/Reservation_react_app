import React, { useState, useEffect } from "react";
import {
  Modal,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import AppointmentFormLayer from "../../AppointmentFormLayer/AppointmentFormLayer";
import { ReservationResponse } from "../../../models/ReservationInterfaces";
import { ReservationService } from "../../../services/reservation/reservationService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./ReservationManagementPage.css";

const ReservationManagementPage = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [reservationStartDate, setReservationStartDate] = useState<Date>(
    new Date()
  );
  const [reservationEndDate, setReservationEndDate] = useState<Date>(
    new Date()
  );
  const [reservationId, setReservationId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [stationId, setStationId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const reservationService = new ReservationService();

  const closeDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };
  const openDrawer = () => {
    setOpen(true);
  };

  const onEditReservation = (reservation: any) => {
    setReservationStartDate(reservation.durration.beginning);
    setReservationEndDate(reservation.durration.end);
    setReservationId(reservation.id);
    setUserId(reservation.userId);
    setStationId(reservation.stationId);
    //parametry i ustawienie useStaee
    openDrawer();
  };

  const fetchAllReservations = () => {
    reservationService.getAllReservations().then((response) => {
      setReservations(response);
    });
  };

  const onReservationDelete = (value: any) => {
    reservationService.deleteReservation(value).then(() => {
      fetchAllReservations();
    });
  };

  useEffect(() => {
    fetchAllReservations();
  }, [loading]); //eslint-disable-line react-hooks/exhaustive-deps

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
              <TableCell className="header border">User Id</TableCell>

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
                  <TableCell className="cell_item">
                    {reservation.userId}
                  </TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      onClick={() => onReservationDelete(reservation.id)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon onClick={() => onEditReservation(reservation)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={closeDrawer}>
        <Paper className="pop-up">
          <AppointmentFormLayer
            startDate={reservationStartDate}
            endDate={reservationEndDate}
            reservationId={reservationId}
            stationId={stationId}
            userId={userId}
            closeModal={setOpen}
            loading={() => setLoading(!loading)}
            reloadParams={() => console.log("RELOAD")}
          />
        </Paper>
      </Modal>
    </>
  );
};

export default ReservationManagementPage;
