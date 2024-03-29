import { Button, Grid, List, ListItem, TextField } from "@mui/material";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "./AppointmentFormLayer.css";
import { useState } from "react";
import { ReservationService } from "../../services/reservation/reservationService";
import { ReservationRequest } from "../../models/ReservationInterfaces";
import { useParams } from "react-router";

const AppointmentFormLayer = (props: {
  startDate: any;
  endDate: any;
  reservationId: any;
  stationId: any;
  userId: any;
  closeModal: any;
  loading: any;
  reloadParams: any;
}) => {
  const params = useParams() as any;
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);

  const reservationService = new ReservationService();

  const reserveStation = () => {
    let newStart = new Date(startDate);
    let newEnd = new Date(endDate);
    newStart.setHours(newStart.getHours() + 2);
    newEnd.setHours(newEnd.getHours() + 2);

    let newRequest = {
      userId: props.userId,
      stationId: parseInt(props.stationId),
      beginning: newStart,
      end: newEnd,
    } as ReservationRequest;

    if (!props.reservationId) {
      reservationService.reserveStation(newRequest).then((response) => {
        props.closeModal(false);
        props.loading();
      });
    } else {
      reservationService
        .updateReservation(newRequest, props.reservationId)
        .then(() => {
          props.closeModal(false);
          if (params.startDate && params.endDate) {
            window.history.replaceState(
              null,
              "",
              "/reserve/station/" + parseInt(props.stationId)
            );
            props.reloadParams();
          }

          props.loading();
        });
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container direction="column">
          <TextField
            className="pop-up-title"
            defaultValue="Reservation details"
            InputProps={{
              readOnly: true,
            }}
          />
          <List>
            <ListItem>
              <DateTimePicker
                label="Pick start date"
                inputVariant="outlined"
                value={startDate}
                onChange={(val: any) => {
                  setStartDate(val);
                }}
              />
            </ListItem>

            <ListItem>
              <DateTimePicker
                label="Pick end date"
                inputVariant="outlined"
                value={endDate}
                onChange={(val: any) => {
                  setEndDate(val);
                }}
              />
            </ListItem>
          </List>
          <Button
            className="button-color"
            variant="contained"
            onClick={reserveStation}
          >
            {!props.reservationId ? "Book station" : "Change booking"}
          </Button>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default AppointmentFormLayer;
