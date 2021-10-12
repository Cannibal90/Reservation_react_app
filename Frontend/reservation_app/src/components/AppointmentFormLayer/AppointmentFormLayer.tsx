import { Button, Grid, List, ListItem, TextField } from "@mui/material";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Link } from "react-router-dom";
import "./AppointmentFormLayer.css";
import { useState } from "react";

const AppointmentFormLayer = (props: {
  startDate: any;
  endDate: any;
  id: any;
  onChange: any;
}) => {
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);

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
          <Button className="button-color" variant="contained">
            Book station
          </Button>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default AppointmentFormLayer;
