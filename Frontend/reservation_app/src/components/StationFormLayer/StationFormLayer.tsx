import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import "./StationFormLayer.css";
import { useState } from "react";
import { LaboratoryService } from "../../services/laboratory/LaboratoryService";
import { ComputerStationRequest } from "../../models/StationInterfaces";

const StationFormLayer = (props: {
  station: any;
  stationId: any;
  loading: any;
  closeModal: any;
}) => {
  const [station, setStation] = useState<ComputerStationRequest>(props.station);

  const laboratoryService = new LaboratoryService();

  const onStationChange = (event: any) => {
    setStation({
      ...station,
      [event.target.name]: event.target.value,
    });
  };

  const onStationSave = () => {
    console.log(station);
    if (!props.stationId) {
      laboratoryService.createStation(station).then(() => {
        props.closeModal(false);
        props.loading();
      });
    } else {
      laboratoryService.updateStation(station, props.stationId).then(() => {
        props.closeModal(false);
        props.loading();
      });
    }
  };

  return (
    <>
      <Grid container direction="column">
        <TextField
          className="pop-up-title"
          defaultValue="Desk details"
          InputProps={{
            readOnly: true,
          }}
        />
        <Grid container direction="row">
          <Grid item xs={6}>
            <List>
              <ListItem>
                <TextField
                  label="Monitors"
                  name="monitors"
                  value={station.monitors}
                  onChange={(event: any) => {
                    onStationChange(event);
                  }}
                />
              </ListItem>
              <ListItem>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Headphones</FormLabel>
                  <RadioGroup
                    name="headphones"
                    value={station.headphones}
                    onChange={(event: any) => {
                      onStationChange(event);
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Microphone</FormLabel>
                  <RadioGroup
                    name="microphone"
                    value={station.microphone}
                    onChange={(event: any) => {
                      onStationChange(event);
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </ListItem>
              <ListItem>
                <TextField
                  label="Operating system"
                  name="operatingSystem"
                  value={station.operatingSystem}
                  onChange={(event: any) => {
                    onStationChange(event);
                  }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <TextField
                  label="Graphic card"
                  name="graphicCard"
                  value={station.graphicCard}
                  onChange={(event: any) => {
                    onStationChange(event);
                  }}
                />
              </ListItem>
              <ListItem style={{ marginTop: "16px" }}>
                <TextField
                  label="CPU"
                  name="cpu"
                  value={station.cpu}
                  onChange={(event: any) => {
                    onStationChange(event);
                  }}
                />
              </ListItem>
              <ListItem style={{ marginTop: "16px" }}>
                <TextField
                  label="RAM"
                  name="ram"
                  value={station.ram}
                  onChange={(event: any) => {
                    onStationChange(event);
                  }}
                />
              </ListItem>
              <ListItem style={{ marginTop: "16px" }}>
                <TextField
                  label="Drive"
                  name="drive"
                  value={station.drive}
                  onChange={(event: any) => {
                    onStationChange(event);
                  }}
                />
              </ListItem>
              <ListItem>
                <FormControl fullWidth style={{ marginTop: "20px" }}>
                  <InputLabel>Network type</InputLabel>
                  <Select
                    name="networkType"
                    label="networkType"
                    value={station.networkType}
                    onChange={(event) => onStationChange(event)}
                  >
                    <MenuItem value="WIFI">WIFI</MenuItem>
                    <MenuItem value="LAN">LAN</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Button
          className="button-color"
          variant="contained"
          onClick={onStationSave}
        >
          {!props.stationId
            ? "Create computer station"
            : "Change computer station"}
        </Button>
      </Grid>
    </>
  );
};

export default StationFormLayer;
